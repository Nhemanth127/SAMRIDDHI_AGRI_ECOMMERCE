const SellingCirlce = require("../models/SellingCircleModel")
const SellingCirlceMembers = require("../models/SellingCircleMembersModel")
const Notifications = require("../models/NotificationsModel")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler")
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const TransportNotificationsModel = require("../models/NotificationsModel");
const { log } = require("util");

// Register a Circle
exports.registerCirlce = catchAsyncErrors(async (req, res, next) => {
    console.log("in selling circle");
    console.log(req.body);
    const user = new SellingCirlce(
        req.body
    )
    console.log(user);

    await user.save()
    console.log("user is");
    console.log(user);
    sendToken(user, 201, res);

});

// Register a CircleMember
exports.registerCirlceMember = catchAsyncErrors(async (req, res, next) => {
    // const { circleemail, circlename } = req.body;
    // const circle = await SellingCirlce.findOne({ circleemail, circlename })
    // // console.log(circle);
    // if (!circle) {
    //     return next(new ErrorHandler("the given circle doesn't exist , wromg circle name or email", 401));
    // }
    // console.log("in..");
    // console.log(req.circle);
    // console.log(req.body);
    const user = new SellingCirlceMembers(
        req.body
    );
    // console.log(req.circle._id);
    // console.log(user);
    user.circle = req.circle._id
    user.circleemail = req.circle.circleemail
    user.circlename = req.circle.circlename
    await user.save();
    req.circle.members.push(user)
    await req.circle.save();
    // console.log("out2");
    // console.log(req.circle);

    res.status(200).json({
        message: "Added user to circle successfully",
        user
    })
    // sendToken(user, 201, res);

});

// Get all the members of a circle

exports.membersOfCircle = catchAsyncErrors(async (req, res, next) => {
    // console.log("in");
    const circleemail = req.circle.circleemail
    const circlename = req.circle.circlename
    const circle = await SellingCirlce.find({
        circleemail,
        circlename
    }).populate("members")
    // console.log(circle);
    if (!circle) {
        return next(new ErrorHandler("the given circle doesn't exist , wromg circle name or email", 401));
    }
    // console.log("circle is \n",circle.members);
    return res.status(200).json({ circle })

})

// Login as Admin
exports.adminLogin = catchAsyncErrors(async (req, res, next) => {
    const { circlename, circleemail, password } = req.body
    if (!circlename || !circleemail || !password) {
        return next(new ErrorHandler("Please Enter Name Email & Password", 400));
    }
    const circle = await SellingCirlce.findOne({
        circleemail,
        circlename
    })
    // console.log(circle);
    if (!circle) {
        return next(new ErrorHandler("The Circle doesn't exist, wrong circle email or name"))
    }
    const isPasswordMatched = await circle.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(circle, 200, res);
})

// Logout as Admin or user
exports.Logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
})

// Login as user
exports.Login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    const user = await SellingCirlceMembers.findOne({ email }).select("+password");
    // console.log(user);
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
})

// Forgot Password - sends reset password token

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    if (!req.body.email) {
        return next(new ErrorHandler("please enter email"))
    }
    const user = await SellingCirlceMembers.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/seller/password/reset/${resetToken}`;

    const message = `Dear User\nYour password reset token is :- \n\n ${resetPasswordUrl} \n\nKindly use this token before \n\n\nIf you have not requested this email then, please ignore it.`;

    try {
        // await sendEmail({
        // //     email: user.email,
        // //     subject: `Samriddhi Agri-Ecommerce Password Recovery`,
        // //     message,
        // });
        res.status(200).json({
            success: true,
            token: resetToken,
            url: resetPasswordUrl,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset Password using password reset token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    if (!req.body.password || !req.body.confirmPassword) {
        return next(new ErrorHandler("Please enter Password and Confirm password", 400));
    }
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await SellingCirlceMembers.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match with Confirm password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body
    if (!oldPassword || !newPassword || !confirmPassword) {
        return next(new ErrorHandler("please enter oldPassword,newPassword,confirmPassword "))
    }
    const user = await SellingCirlceMembers.findById(req.user.id);
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match with confirm password", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});


// Delete User --Admin
exports.deleteCircleMember = catchAsyncErrors(async (req, res, next) => {
    const user = await SellingCirlceMembers.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    await SellingCirlceMembers.findByIdAndDelete(req.params.id)
    await req.circle.members.pull(req.params.id)
    await req.circle.save()
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});

// get Details of User --Admin
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await SellingCirlceMembers.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    res.status(200).json({
        success: true,
        user
    });
});

// Get User Detail
exports.getMyDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await SellingCirlceMembers.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    // const newUserData = {
    //     name: req.body.name,
    //     email: req.body.email,
    // };


    const user = await SellingCirlceMembers.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    });
});

// getting all sales of a single user
exports.getMySales = catchAsyncErrors(async (req, res, next) => {
    // console.log("in controller");
    const ans = await SellingCirlceMembers.findById(req.user._id).populate("sales")
    // console.log(ans.sales);

    res.status(200).json({
        sales: ans.sales
    })
})

// getting all existing selling circles
exports.getAllSellingCircles = catchAsyncErrors(async (req, res, next) => {
    const circles = await SellingCirlce.find({}, { circlename: 1 })
    // console.log(circles);

    // circles.forEach(ele => {
    //     console.log(ele.circlename);
    // })

    res.status(200).json({
        circles
    })
})


// getting all the transport notifications of a seller
exports.transportNotifictaions = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.user);
    const notifications = await TransportNotificationsModel.find({ seller: req.user._id, isSelected: false, type: "transport" }).populate("order").populate("transporter")
    res.status(200).json({
        notifications
    })
})

// getting all the order notifications to confirm the order.
exports.getAllBuyingNotifications = catchAsyncErrors(async (req, res, next) => {
    const myNotifiactions = await Notifications.find({ seller: req.user._id, isSelected: false, type: "order" }).populate("saleId").populate("order")
    res.status(200).json({
        myNotifiactions
    })
})

// 