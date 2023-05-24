const BuyOrdersAggregation = require("../models/BuyOrdersAggregationModel");
const Sale = require("../models/SaleModel")
const OrderMatch = require("../models/OrderMatchModel")
// const OrderMatch = require("../models/Orders")
const ConfirmOrder = require("../models/ConfirmOrderModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Notifications = require("../models/NotificationsModel")

// 1- Checking for order match of Aggregated order with sale for quantity and price match and place order and update sale cart qunatity
exports.orderMatch = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.body);
    const sale = await Sale.findById(req.body.sale)
    if (!sale) {
        return next(new ErrorHandler("There is no such sale exits!"))
    }
    const order = await BuyOrdersAggregation.findById(req.body.order)
    if (!order) {
        return next(new ErrorHandler("There is no such order exits!"))
    }
    // console.log(sale);
    // console.log(order);

    if (order.category != sale.product.category || order.product != sale.product.name) {
        return res.status(400).json({
            message: "Order Mis-Match ,between order request and sale, they are off differnt category and product!"
        })
    }


    if (order.quantity > sale.product.quantity) {
        return res.status(400).json({
            message: "Order Requirement quantity is greater than available sale qunatity so can't place order!!"
        })
    }

    if (order.quantity < sale.product.minorder || order.price < sale.product.minprice) {
        return res.status(400).json({
            message: "Order Mis-Match There is either No minimum order match or price match between sale and order.."
        })
    }
    const newOrder = new OrderMatch()

    newOrder.sale = sale._id
    newOrder.order = order._id
    // console.log(order.users.length);
    // await newOrder.save()

    // start
    newOrder.users.push(sale.sellerId)
    await newOrder.save()
    const notification = new Notifications()
    notification.type = "order"
    notification.seller = sale.sellerId
    notification.order = newOrder
    notification.saleId = sale._id
    await notification.save()
    async function fun() {
        let users = order.users
        let counter = users.length
        await new Promise(async (resolve, reject) => {
            (users.forEach(async (element) => {

                // console.log(element);
                newOrder.users.push(element.reference)
                const notification = new Notifications()
                notification.type = "order"
                notification.buyer = element.reference
                notification.seller = sale.sellerId
                notification.order = newOrder
                notification.buyorderId = element.buyorderid
                notification.saleId = sale._id
                // console.log(element.buyorderid);
                // console.log("sale is ", sale._id);
                await notification.save()
                counter--
                if (counter == 0) return resolve("success")
            })
            )
        }
        )
    }

    const order_confirm = new ConfirmOrder()
    fun().then(async () => {
        // await newOrder.save()
        order_confirm.noofbuyers = order.users.length
        order_confirm.noofsellers = 1
        order_confirm.noofusers = order.users.length + 1
        order_confirm.order = newOrder._id
        await order_confirm.save()
        await newOrder.save()
        newOrder.confirmorder = order_confirm._id
        await newOrder.save()

        res.status(201).json({
            "message": "order Matched successfully, Now users should confirm for confirmation",
            newOrder,
            order_confirm
        })

    }).catch((error) => {
        return next(new ErrorHandler(error))
    })
    // end




    // end2

    // sale.product.quantity -= order.quantity
    // await sale.save()

    // const order_confirm = new ConfirmOrder()
    // order_confirm.noofbuyers = order.users.length
    // order_confirm.noofsellers = 1
    // order_confirm.noofusers = order.users.length + 1
    // order_confirm.order = newOrder._id
    // await order_confirm.save()

    // newOrder.confirmorder = order_confirm._id


})

// 2- get all orders

exports.getMatchedOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await OrderMatch.find().populate("order").populate("sale")
    res.status(200).json({
        orders
    })
})

// 3- to confirm order match by a seller and all buyers (associated with the sale) for finalising the order
// and finally the order is confirmed by both buyers and sellers then proceed to next phase of placing final order
exports.buyerConfirmOrder = catchAsyncErrors(async (req, res, next) => {
    // console.log("in buyer cofirm order");
    const id = req.params.id
    const notification = await Notifications.findById(id)
    // console.log(notification);
    const cid = notification.order
    // const confirmorder = await ConfirmOrder.findById(cid)
    const confirmorder = await ConfirmOrder.findOne({ order: cid })
    // console.log(confirmorder);
    // console.log(req.user._id);
    // console.log(confirmorder.users.includes(req.user._id));

    const name = req.user.name
    if (!confirmorder.users.includes(req.user._id)) {
        confirmorder.users.push(req.user._id)
        confirmorder.counter += 1
        await confirmorder.save()
        notification.isSelected = true
        await notification.save()
        res.status(200).json({
            message: `Dear ${name} Order Confirmation from your side is sucessfully recorded`,
            success: true
        })
    } else {
        // console.log("done");
        res.status(200).json({
            message: `Dear ${name} You have already confirmed your order`
        })
    }
})
exports.sellerConfirmOrder = catchAsyncErrors(async (req, res, next) => {
    // console.log("confirm inorder");
    const id = req.params.id
    const confirmorder = await ConfirmOrder.findOne({ order: id })
    // console.log(req.user._id);
    // console.log(confirmorder.users.includes(req.user._id));

    const name = req.user.name
    if (!confirmorder.users.includes(req.user._id)) {
        confirmorder.users.push(req.user._id)
        confirmorder.counter += 1
        await confirmorder.save()
        const notification = await Notifications.findOne({ seller: req.user._id, type: "order", isSelected: false, order: id })
        notification.isSelected = true
        await notification.save()
        res.status(200).json({
            message: `Dear ${name} Order Confirmation from your side is sucessfully recorded`,
            success: true
        })
    } else {
        res.status(200).json({
            message: `Dear ${name} You have already confirmed your order`
        })
    }
})

// 4- to check if the order match is confirmes by all users i.e by both sellers and all buyers associated with that particular order
exports.isOrderConfirmed = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id
    const notification = await Notifications.findById(id)
    // const order = await ConfirmOrder.findOne({ order: id })
    // console.log(order);
    const cid = notification.order
    const order = await ConfirmOrder.findOne({ order: cid })

    if (order.counter + 1 == order.noofusers && order.users.length + 1 == order.noofusers) {
        res.status(200).json({
            message: "This order is Sucessfully confirmed by all Sellers and Buyers associated with this sale."
        })
    }
    else {
        res.status(400).json({
            message: `This order is not yet confirmed by all users and , number of confirmed users - ${order.counter} , number of users yet to confirm - ${order.noofusers - order.counter}`
        })
    }
})


exports.isOrderValidConfirmed = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id
    const notification = await Notifications.findById(id)
    const cid = notification.order
    const order = await ConfirmOrder.findOne({ order: cid })
    // const order = await ConfirmOrder.findOne({ order: id })
    // console.log(order);
    if (order.counter + 1 == order.noofusers && order.users.length + 1 == order.noofusers) {
        next()
    }
    else {
        return res.status(400).json({
            message: `This order is not yet confirmed by all users and , number of confirmed users - ${order.counter} , number of users yet to confirm - ${order.noofusers - order.counter}`
        })
    }
})

// to confirm transform orders by Sellers..
exports.confirmTransportOrder = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id
    const notification = await Notifications.findById(id)
    if (!notification) {
        return next(new ErrorHandler("No such transport order found wrong id given!"))
    }
    if (notification.isSelected == true) {
        res.status(200).json({
            message: `Dear ${req.user.name} you have already confirmed for this tranport order`
        })
    }
    else {
        const order = await OrderMatch.findById(notification.order)
        order.transporter = notification.transporter
        await order.save()
        notification.isSelected = true
        await notification.save()
        res.status(200).json({
            message: `Dear ${req.user.name} Confirmation for transport order from your side is recorded.`
        })
    }
})