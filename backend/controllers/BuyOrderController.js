const BuyOrder = require("../models/BuyOrderModel");
const BuyingCircleMembers = require("../models/BuyingCircleMembersModel")
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// 1-creating a buyorder
exports.createBuyOrder = catchAsyncErrors(async (req, res, next) => {
    // console.log("in fun");
    // const user = await BuyingCircleMembers.findOne({ email: req.body.email })
    // console.log(req.user);
    if (!req.user) {
        return next(new ErrorHandler("No buyer found with this email-id!"))
    }

    // **Note -- this is old code for posting array of products
    // do not edit or remove this!
    // const products = req.body.products

    // async function fun() {
    //     let counter = products.length
    //     await new Promise(async (resolve, reject) => {
    //         (products.forEach(async (element) => {
    //             // console.log(element);
    //             const order = new BuyOrder()
    //             order.circleId = req.circle._id
    //             order.circle = req.circle.circlename
    //             order.circleemail = req.circle.circleemail
    //             order.buyerId = req.user._id
    //             order.buyer = req.user.name
    //             order.buyeremail = req.user.email
    //             order.product.name = element.name,
    //                 order.product.category = element.category,
    //                 order.product.minprice = element.minprice,
    //                 order.product.maxprice = element.maxprice,
    //                 order.product.quantity = element.quantity,
    //                 await order.save()
    //             req.user.orders.push(order._id)
    //             // console.log(req.user.orders);

    //             --counter;
    //             // condition to resolve the promise i.e if all products are added successfully..
    //             if (counter == 0)
    //                 return resolve("success")
    //         }))
    //     })
    // }
    // fun().then(async () => {
    //     console.log(req.user);
    //     await req.user.save()
    //     res.status(201).json({
    //         success: true,
    //     });
    // })
    //     .catch((err) => {
    //         return next(new ErrorHandler(err));
    //     })
    // console.log(req.body);
    // console.log(req.body);
    // console.log(req.user);
    // console.log(req.circle);
    const order = new BuyOrder()
    order.circleId = req.circle._id
    order.circle = req.circle.circlename
    order.circleemail = req.circle.circleemail
    order.buyerId = req.user._id
    order.buyer = req.user.name
    order.buyeremail = req.user.email
    order.product.name = req.body.name,
        order.product.category = req.body.category,
        order.product.minprice = req.body.minprice,
        order.product.maxprice = req.body.maxprice,
        order.product.quantity = req.body.quantity,
        order.address = req.user.address
    order.phone = req.user.phone
    await order.save()
    // console.log(order);
    // console.log(req.user);
    req.user.orders.push(order._id)
    await req.user.save()
    // console.log(req.user);
    res.status(201).json({
        "message": "added buyOrder Successfully",
        order
    })

})

// 2- getting all current active buyorders..
exports.getAllOrders = catchAsyncErrors(async (req, res) => {
    // const orders = await BuyOrder.find({ isSelected: false })
    const orders = await BuyOrder.find()
    res.status(200).json({
        success: true,
        orders
    })
})