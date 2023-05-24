const BuyOrdersAggregation = require("../models/BuyOrdersAggregationModel");
const BuyOrders = require("../models/BuyOrderModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// 1- Aggregation of a single type product, for multiple users.. i/p - array of buyOrders id..
// here there is aggregation happens only for one type of product at once

exports.createAggregation = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.body);
    // req.body.price = 55;
    const Order = new BuyOrdersAggregation();
    const products = req.body.ids;
    // console.log(products);
    const order0 = await BuyOrders.findById(products[0]);
    // // console.log(order);
    // Order.circle = order0.circle;
    // Order.buyingcircle = order0.circleId;
    Order.product = order0.product.name;
    Order.category = order0.product.category;
    Order.price = req.body.price;
    let totalQuantity = 0;
    // console.log(Order);
    // console.log(products);

    async function fun() {
        let counter = products.length;
        await new Promise(async (resolve, reject) => {
            products.forEach(async (element) => {
                // console.log(element);
                const order = await BuyOrders.findById(element);
                if (
                    !order ||
                    order0.product.name != order.product.name ||
                    order0.product.category != order.product.category
                ) {
                    return reject(
                        "Error!!, All products should be off same catgeroy to aggregate!"
                    );
                }
                order.isSelected = true;
                await order.save();
                // console.log(order);
                // console.log(order0.product.name, order.product.name, order0.product.category , order.product.category);
                totalQuantity += order.product.quantity;
                const obj = {
                    name: order.buyer,
                    reference: order.buyerId,
                    price: req.body.price,
                    quantity: order.product.quantity,
                    totalprice: order.product.quantity * req.body.price,
                    buyorderid: element,
                    email: order.buyeremail,
                    circleId: order.circleId,
                    circle: order.circle,
                    address: order.address,
                    phone: order.phone
                };
                // console.log(obj);
                Order.users.push(obj);
                // console.log(obj);
                // console.log(Order.users);
                --counter;
                // condition to resolve promise i.e if all the user details are updated in user arrray only then resolve and save ORDER document
                if (counter == 0) return resolve("success");
            });
        });
    }
    // fun()

    // to synchronize the ORDER document properly..
    fun()
        .then(async () => {
            Order.quantity = totalQuantity;
            Order.totalprice = totalQuantity * req.body.price;
            // console.log(Order);
            await Order.save();
            // console.log("done saving");
            res.status(201).json({
                message: "Successfully aggregated",
                sucess: true,
                Order,
            });
        })
        .catch((error) => {
            // console.log(error);
            return next(new ErrorHandler(error));
        });
});

//  2- to get all aggregated Orders..
exports.getAggregatedOrders = catchAsyncErrors(async (req, res, next) => {
    const allOrders = await BuyOrdersAggregation.find()
    res.status(200).json({ "Orders": allOrders })
})

// getting an Aggregated Order by
exports.getAggregatedOrderById = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id
    const aggregatedOrder = await BuyOrdersAggregation.findById(id)
    res.status(200).json({ aggregatedOrder })
})
