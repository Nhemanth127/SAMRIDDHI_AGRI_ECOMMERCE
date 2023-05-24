const OrderMatch = require("../models/OrderMatchModel")
const Notifications = require("../models/NotificationsModel")
const Sale = require("../models/SaleModel")
const FinalOrder = require("../models/FinalorderModel")
// const OrderMatch = require("../models/Orders")
const ConfirmOrder = require("../models/ConfirmOrderModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// 1- placing final order by seller
// this is final order which reduces the stock and proceeds to the next phase of transport and delivery to the buyers..
exports.placeOrder = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id
    const notification = await Notifications.findById(id)
    notification.isSelected=true
    await notification.save()
    const oid = notification.order
    const order = await OrderMatch.findById(oid).populate("sale").populate("order")
    if (!order) {
        return next(new ErrorHandler("This ORDER doesn't exists!!"))
    }

    const sale = await Sale.findById(order.sale)
    if (sale.product.quantity <= 0) {
        return next(new ErrorHandler("This Sale is Over, Stock is Empty.."))
    }
    if (order.order.quantity > sale.product.quantity) {
        return next(new ErrorHandler("Order Requirement quantity is greater than available sale qunatity so can't place order!!"))
    }
    sale.product.quantity -= order.order.quantity
    await sale.save()
    const finalorder = new FinalOrder({ order: order._id })
    await finalorder.save()
    const finalOrder = await FinalOrder.findById(finalorder._id).populate("order")
    // console.log(ans);
    res.status(200).json({
        message: "Done Placing Final Order",
        finalOrder
    })
})

// 2- to get all final orders
exports.getAllFinalOrders = catchAsyncErrors(async (req, res, next) => {
    // console.log("in final orders");
    const ids = await FinalOrder.find({}, { order: 1 })
    // console.log(ids);
    let orders = []
    async function fun() {
        let counter = ids.length
        await new Promise(async (resolve, reject) => {
            (ids.forEach(async (element) => {
                // console.log(element.order);
                const order = await OrderMatch.findById(element.order).populate("order").populate("sale")
                // order.finalOrder = element._id
                // console.log(order.finalOrder);
                // console.log(order);
                orders.push(order)
                counter--
                if (counter == 0)
                    return resolve("sucess")
            }))
        })
    }

    await fun()
    // console.log(orders);
    res.status(200).json({
        orders
    })
    // console.log("out");
})