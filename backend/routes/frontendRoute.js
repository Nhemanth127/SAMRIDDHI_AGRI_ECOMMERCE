const express = require("express");
const Path = require("path")
const router = express.Router();


router.route("/").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "index.html")
    // console.log(path);
    res.sendFile(path)
    // console.log(path);
})

router.route("/selectCircles").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "selectCircles.html")
    res.sendFile(path)
})

router.route("/memberCircleSelection").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "memberCircleSelection.html")
    res.sendFile(path)
})


// Images Routing...

router.route("/background").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "img", "background.jpg")
    res.sendFile(path)
})
router.route("/login_background").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "img", "login_background.webp")
    res.sendFile(path)
})
router.route("/logo").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "img", "logo.png")
    res.sendFile(path)
})
router.route("/img_buyer").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "img", "buyer.jpg")
    res.sendFile(path)
})
router.route("/img_seller").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "img", "seller.png")
    res.sendFile(path)
})
router.route("/img_transport").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "img", "transport.png")
    res.sendFile(path)
})

// -------------------- Buying Circle admin ADMIN-------------------

router.route("/adminBuyerLogin").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Buyer", "login.html")
    res.sendFile(path)
})
router.route("/adminBuyerRegister").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Buyer", "Register.html")
    res.sendFile(path)
})

router.route("/adminBuyerDashboard").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Buyer", "BuyingCircleDashboard.html")
    res.sendFile(path)
})

// router.route("/BuyerAdminDashboardMembers").get((req, res) => {
//     let path = process.cwd()
//     path = Path.join(path, "frontend", "Admin", "Buyer", "Members.html")
//     res.sendFile(path)
// })
router.route("/BuyerAdminDashboardAddMember").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Buyer", "AddMember.html")
    res.sendFile(path)
})
router.route("/BuyerAdminDashboardBuyOrder").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Buyer", "BuyOrder.html")
    res.sendFile(path)
})
router.route("/BuyerAdminDashboardSales").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Buyer", "Sales.html")
    res.sendFile(path)
})
router.route("/BuyerAdminDashboardMatchedOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Buyer", "MatchedOrders.html")
    res.sendFile(path)
})
router.route("/BuyerAdminDashboardFinalOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Buyer", "FinalOrders.html")
    res.sendFile(path)
})
router.route("/BuyerAdminDashboardAggregatedOrders").get((req, res) => {

    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Buyer", "AggregatedOrders.html")
    res.sendFile(path)
})


// -------------------- Selling Circle admin ADMIN-------------------

router.route("/adminSellerLogin").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Seller", "login.html")
    res.sendFile(path)
})
router.route("/adminSellerRegister").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Seller", "Register.html")
    res.sendFile(path)
})

router.route("/adminSellerDashboard").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Seller", "SellingCircleDashboard.html")
    res.sendFile(path)
})

router.route("/SellingAdminDashboardAddMember").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Seller", "AddMember.html")
    res.sendFile(path)
})
router.route("/SellingAdminDashboardBuyOrder").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Seller", "BuyOrder.html")
    res.sendFile(path)
})
router.route("/SellingAdminDashboardSales").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Seller", "Sales.html")
    res.sendFile(path)
})
router.route("/SellingAdminDashboardMatchedOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Seller", "MatchedOrders.html")
    res.sendFile(path)
})
router.route("/SellingAdminDashboardFinalOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Seller", "FinalOrders.html")
    res.sendFile(path)
})
router.route("/SellingAdminDashboardAggregatedOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Seller", "AggregatedOrders.html")
    res.sendFile(path)
})




// This is for Transport Admin routing
router.route("/adminTransportLogin").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Transport", "login.html")
    res.sendFile(path)
})
router.route("/adminTransportRegister").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Transport", "Register.html")
    res.sendFile(path)
})

router.route("/adminTransportDashboard").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Transport", "TransportCircleDashboard.html")
    res.sendFile(path)
})

router.route("/TransportAdminDashboardAddMember").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Transport", "AddMember.html")
    res.sendFile(path)
})
router.route("/TransportAdminDashboardBuyOrder").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Transport", "BuyOrder.html")
    res.sendFile(path)
})
router.route("/TransportAdminDashboardSales").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Transport", "Sales.html")
    res.sendFile(path)
})
router.route("/TransportAdminDashboardMatchedOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Transport", "MatchedOrders.html")
    res.sendFile(path)
})
router.route("/TransportAdminDashboardFinalOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Transport", "FinalOrders.html")
    res.sendFile(path)
})
router.route("/TransportAdminDashboardAggregatedOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Transport", "AggregatedOrders.html")
    res.sendFile(path)
})




// ------------------MEMBERS-----------------

router.route("/memberBuyerLogin").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Buyer", "login.html")
    res.sendFile(path)
})
router.route("/memberSellerLogin").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "login.html")
    res.sendFile(path)
})
router.route("/memberTransportLogin").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Transport", "login.html")
    res.sendFile(path)
})

router.route("/BuyerDashboard").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Buyer", "BuyerDashboard.html")
    res.sendFile(path)
})
router.route("/SellerDashboard").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "SellerDashboard.html")
    res.sendFile(path)
})
router.route("/TransportDashboard").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Transport", "TransportDashboard.html")
    res.sendFile(path)
})


// Routing for Seller Dashboard pages:
router.route("/SellerDashboardAnnounceSales").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "AnnounceSales.html")
    res.sendFile(path)
})
router.route("/SellerDashboardMySales").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "MySales.html")
    res.sendFile(path)
})
router.route("/SellerDashboardAggregateBuyOrder").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "AggregateBuyOrder.html")
    res.sendFile(path)
})
router.route("/SellerDashboardCheckForOrderMatch").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "CheckForOrderMatch.html")
    res.sendFile(path)
})
router.route("/SellerDashboardOrderConfirmation").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "OrderConfirmation.html")
    res.sendFile(path)
})
router.route("/SellerDashboardBuyOrderNotifications").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "BuyOrderNotifications.html")
    res.sendFile(path)
})
router.route("/SellerDashboardTransportOrderNotifications").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "TransportOrderNotifications.html")
    res.sendFile(path)
})

router.route("/SellerDashboardBuyOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "BuyOrders.html")
    res.sendFile(path)
})
router.route("/SellerDashboardSales").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "Sales.html")
    res.sendFile(path)
})
router.route("/SellerDashboardAggregatedOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "AggregatedOrders.html")
    res.sendFile(path)
})
router.route("/SellerDashboardMatchedOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "MatchedOrders.html")
    res.sendFile(path)
})
router.route("/SellerDashboardFinalOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "FinalOrders.html")
    res.sendFile(path)
})

//Routing for Buyer Dashboard pages
router.route("/BuyerDashboardBuyOrder").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Buyer", "BuyOrder.html")
    res.sendFile(path)
})
router.route("/BuyerDashboardMyOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Buyer", "MyOrders.html")
    res.sendFile(path)
})
router.route("/BuyerDashboardNotifications").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Buyer", "Notifications.html")
    res.sendFile(path)
})

router.route("/BuyerDashboardViewBuyOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Buyer", "ViewBuyOrders.html")
    res.sendFile(path)
})
router.route("/BuyerDashboardSales").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Buyer", "Sales.html")
    res.sendFile(path)
})
router.route("/BuyerDashboardAggregatedOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Buyer", "AggregatedOrders.html")
    res.sendFile(path)
})
router.route("/BuyerDashboardMatchedOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Buyer", "MatchedOrders.html")
    res.sendFile(path)
})
router.route("/BuyerDashboardFinalOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Buyer", "FinalOrders.html")
    res.sendFile(path)
})
router.route("/BuyerDashboardOrderFulfillment").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Buyer", "OrderFulfillment.html")
    res.sendFile(path)
})


//Routing for Transporter Dashboard pages
router.route("/TransportDashboardFinalOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Transport", "FinalOrders.html")
    res.sendFile(path)
})
router.route("/TransportDashboardNotifications").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Transport", "Notifications.html")
    res.sendFile(path)
})
router.route("/TransportDashboardMatchedOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Transport", "MatchedOrders.html")
    res.sendFile(path)
})
router.route("/TransportDashboardRequestOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Transport", "RequestOrders.html")
    res.sendFile(path)
})
router.route("/TransportDashboardMyDeliveryOrders").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Transport", "MyDeliveryOrders.html")
    res.sendFile(path)
})
router.route("/TransportDashboardAcknowledgeDelivery").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Transport", "AcknowledgeDelivery.html")
    res.sendFile(path)
})














// router.route("/sales").get((req, res) => {
//     // console.log("in sales");

//     let path = process.cwd()
//     // console.log(path);
//     // res.send(path)
//     path = Path.join(path, "frontend", "static", "sales.html")
//     res.sendFile(path)
// })
// router.route("/orders").get((req, res) => {
//     // console.log("in orders");
//     let path = process.cwd()
//     // console.log(path);
//     // res.send(path)
//     path = Path.join(path, "frontend", "static", "orders.html")
//     res.sendFile(path)
// })
// router.route("/circles").get((req, res) => {
//     // console.log("in circles");

//     let path = process.cwd()
//     // console.log(path);
//     // res.send(path)
//     path = Path.join(path, "frontend", "static", "circles.html")
//     res.sendFile(path)
// })













module.exports = router;