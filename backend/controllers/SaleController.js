const Sale = require("../models/SaleModel");
const SellingCircleMembers = require("../models/SellingCircleMembersModel")
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// 1-Creating a sale by admin with seller Reference..
exports.createSale = catchAsyncErrors(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("No Seller found with this email-id!"))
    }
    // console.log(req.user);
    // console.log(req.circle);
    // const products = req.body.products

    // **Note -- this is old code for posting array of products
    // do not edit or remove this!
    // async function fun() {
    //     let counter = products.length
    //     await new Promise(async (resolve, reject) => {
    //         (products.forEach(async (element) => {
    //             const sale = new Sale()
    //             sale.circleId = req.circle._id
    //             sale.circle = req.circle.circlename
    //             sale.circleemail = req.circle.circleemail
    //             sale.sellerId = req.user._id
    //             sale.seller = req.user.name
    //             sale.selleremail = req.user.email
    //             sale.product.name = element.name,
    //                 sale.product.category = element.category,
    //                 sale.product.minprice = element.minprice,
    //                 sale.product.maxprice = element.maxprice,
    //                 sale.product.quantity = element.quantity,
    //                 sale.product.minorder = element.minorder
    //             await sale.save()
    //             req.user.sales.push(sale._id)
    //             --counter;
    //             // condition to resolve the promise i.e if all products are added successfully..
    //             if (counter == 0)
    //                 return resolve("success")
    //         }))
    //     })
    // }
    // fun().then(async () => {
    //     await req.user.save()
    //     res.status(201).json({
    //         success: true,
    //         // sale,
    //     });
    // }).catch((err) => {
    //     return next(new ErrorHandler(err));
    // })
    // console.log(req.body);
    const sale = new Sale()
    sale.circleId = req.circle._id
    sale.circle = req.circle.circlename
    sale.circleemail = req.circle.circleemail
    sale.sellerId = req.user._id
    sale.seller = req.user.name
    sale.selleremail = req.user.email
    sale.product.name = req.body.name,
        sale.product.category = req.body.category,
        sale.product.minprice = req.body.minprice,
        sale.product.maxprice = req.body.maxprice,
        sale.product.quantity = req.body.quantity,
        sale.product.minorder = req.body.minorder
    await sale.save()
    req.user.sales.push(sale._id)
    await req.user.save()
    res.status(201).json({
        "message": "added Sale Successfully",
        sale
    })
})

// 2-Getting all Current Active Sales..
exports.getSales = catchAsyncErrors(async (req, res, next) => {
    const sales = await Sale.find()
    res.status(200).json({
        success: true,
        sales
    })
})