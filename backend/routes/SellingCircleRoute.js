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
    getMySales,
    getAllSellingCircles,
    transportNotifictaions,
    getAllBuyingNotifications
} = require("../controllers/SellingCircleController");

const { isSAuthenticatedUser, isSAdmin, isSameUser, isValiduser } = require("../middleware/auth");
const { createSale, getSales } = require("../controllers/SaleController");
const { getAllOrders } = require("../controllers/BuyOrderController");
const { createAggregation, getAggregatedOrders } = require("../controllers/OrderAggregationController");
const { orderMatch, confirmOrder, isOrderConfirmed, getMatchedOrders, isOrderValidConfirmed, sellerConfirmOrder, confirmTransportOrder } = require("../controllers/OrderMatchController");
const { placeOrder, getAllFinalOrders } = require("../controllers/FinalOrderController");
const router = express.Router();

router.route("/circles").get(getAllSellingCircles)

router.route("/addcircle").post(registerCirlce)   //done
router.route("/addcirclemember").post(isSAdmin, registerCirlceMember)   //done
router.route("/getmembers").get(isSAdmin, membersOfCircle)
router.route("/getmembers").get(membersOfCircle)  //done
router.route("/adminlogin").post(adminLogin)
router.route("/adminlogout").get(Logout)
router.route("/admin/:id").get(isSAdmin, getUserDetails).delete(isSAdmin, deleteCircleMember);

router.route("/login").post(Login)  //member login using email(his/her) and password
router.route("/logout").get(Logout)
router.get("/me", isSAuthenticatedUser, getMyDetails);
router.get("/mysales", isSAuthenticatedUser, getMySales);
router.route("/me/update").put(isSAuthenticatedUser, updateProfile);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isSAuthenticatedUser, updatePassword);






// seller announcing sale..
router.route("/sales").post(isSAuthenticatedUser, createSale).get(getSales)
// to get all active buyOrders from buyers..
router.route("/buyorders").get(getAllOrders)

// Aggregation of a single type product, for multiple users.. i/p - array of buyOrders id..
// here there is aggregation happens only for one type of product at once
router.route("/buyordersAggregate").post(isSAuthenticatedUser, createAggregation).get(getAggregatedOrders)


// Checking for order match of Aggregated order with sale,,  for quantity and price match and place order and update sale cart qunatity
// Checking orderMatch and placing order.

router.route("/ordermatch").post(isSAuthenticatedUser, orderMatch)

// to get all Matched-orders
router.route("/matchedorders").get(getMatchedOrders)


// to confirm order match by a seller for finalising the order
// change it to post**
router.route("/confirmorder/:id").post(isSAuthenticatedUser, isValiduser, sellerConfirmOrder)

// to check if the order match is confirmes by all users i.e by both sellers and all buyers associated with that particular order
router.route("/isorderconfirmed/:id").get(isOrderConfirmed)

// placing final order by seller
// this is final order which reduces the stock and proceeds to the next phase of transport and delivery to the buyers..
// ** post request
router.route("/placeorder/:id").post(isSAuthenticatedUser, isOrderValidConfirmed, placeOrder)

//  to get all final orders
router.route("/orders").get(getAllFinalOrders)


// getting all the requested notifications from transporters for tranporting orders.
router.route("/mytransportnotifications").get(isSAuthenticatedUser, transportNotifictaions)

// getting all the order notifications to confirm the order.
router.route("/mynotifications").get(isSAuthenticatedUser, getAllBuyingNotifications)

router.route("/confirmtransportorder/:id").post(isSAuthenticatedUser, confirmTransportOrder)
module.exports = router;
