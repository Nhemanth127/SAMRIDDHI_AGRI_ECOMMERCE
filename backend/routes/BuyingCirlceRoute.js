const express = require("express");
const { registerCirlce,
    registerCirlceMember,
    membersOfCircle,
    adminLogin,
    Logout,
    Login,
    forgotPassword,
    resetPassword,
    updatePassword,
    deleteCircleMember,
    getUserDetails,
    getMyDetails,
    updateProfile,
    getMyOrders,
    getAllBuyingCircles,
    getAllBuyingNotifications,
    myDeliveredOrders,
    myAcknowledgedOrders,
    acknowledgeDelivery
} = require("../controllers/BuyingCirlceController");
const { createBuyOrder, getAllOrders } = require("../controllers/BuyOrderController");
const { getSales } = require("../controllers/SaleController");
const { isAuthenticatedUser, isAdmin, isValiduser } = require("../middleware/auth");
const { createAggregation, getAggregatedOrders, getAggregatedOrderById } = require("../controllers/OrderAggregationController");
const { orderMatch, getOrders, confirmOrder, isOrderConfirmed, getMatchedOrders, buyerConfirmOrder } = require("../controllers/OrderMatchController");
const { getAllFinalOrders } = require("../controllers/FinalOrderController");
const router = express.Router();

router.route("/circles").get(getAllBuyingCircles)
router.route("/addcircle").post(registerCirlce)
router.route("/addcirclemember").post(isAdmin, registerCirlceMember)
router.route("/getmembers").get(isAdmin, membersOfCircle)
router.route("/adminlogin").post(adminLogin)
router.route("/adminlogout").get(Logout)
router.route("/admin/:id").get(isAdmin, getUserDetails).delete(isAdmin, deleteCircleMember);

router.route("/login").post(Login)
router.route("/logout").get(Logout)
router.get("/me", isAuthenticatedUser, getMyDetails);
router.get("/myorders", isAuthenticatedUser, getMyOrders);
router.route("/mydeliveredorders").get(isAuthenticatedUser, myDeliveredOrders)
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticatedUser, updatePassword);




// to get current active sales
router.route("/sales").get(getSales)

// to place an order by circle admin with buyer reference
router.route("/buyorders").post(isAuthenticatedUser, createBuyOrder).get(getAllOrders)


// Aggregation of a single type product, for multiple users.. i/p - array of buyOrders id..
// here there is aggregation happens only for one type of product at once
router.route("/buyordersAggregate").post(isAuthenticatedUser, createAggregation).get(getAggregatedOrders)


// getting a single aggregatedOrder by its id
router.route("/getaggregateorder/:id").get(getAggregatedOrderById)



// Checking for order match of Aggregated order with sale,,  for quantity and price match and place order and update sale cart qunatity
// Checking orderMatch and placing order.

router.route("/ordermatch").post(isAuthenticatedUser, orderMatch)

// to get all Matched-orders
router.route("/matchedorders").get(getMatchedOrders)

// to confirm order match by a buyer for finalising the order
// change it to post**

router.route("/confirmorder/:id").post(isAuthenticatedUser, buyerConfirmOrder)

// to check if the order match is confirmes by all users i.e by both sellers and all buyers associated with that particular order
router.route("/isorderconfirmed/:id").get(isOrderConfirmed)

//  to get all final orders
router.route("/orders").get(getAllFinalOrders)

// getting all the order notifications to confirm the order.
router.route("/mynotifications").get(isAuthenticatedUser, getAllBuyingNotifications)

// getting all order that should be acknoledged
router.route("/acknowledgeOrders").get(isAuthenticatedUser, myAcknowledgedOrders)

// acknowleding that the order is delivered
router.route("/acknowledge").post(isAuthenticatedUser,acknowledgeDelivery)
module.exports = router;
