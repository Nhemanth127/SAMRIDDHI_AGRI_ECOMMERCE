const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const BuyingCircle = require("../models/BuyingCircleModel");
const TransportCircle = require("../models/TransportCircleModel");
const SellingCircle = require("../models/SellingCircleModel");
const BuyingCircleMembersModel = require("../models/BuyingCircleMembersModel");
const SellingCircleMembersModel = require("../models/SellingCircleMembersModel");
const TransportCircleMembersModel = require("../models/TransportCircleMembersModel");
const ConfirmOrder = require("../models/ConfirmOrderModel")

// is the user a selling circle member
exports.isSAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // console.log("in isSa");
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  user = await SellingCircleMembersModel.findById(decodedData.id);
  // console.log("out");
  req.user = user
  if (!user) {
    return next(new ErrorHander("you are not Authorized to use this service!"))
  }
  // console.log(user);
  req.circle = await SellingCircle.findById(user.circle)
  next()
});

// is the user a buying circle member
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // console.log("in iBSa");

  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await BuyingCircleMembersModel.findById(decodedData.id);
  if (!user) {
    return next(new ErrorHander("you are not Authorized to use this service!"))
  }
  req.user = user
  // console.log(req.user);
  req.circle = await BuyingCircle.findById(req.user.circle)
  // console.log(req.circle);
  next();
});

// is the user a Transport circle member
exports.isTAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // console.log("in");
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await TransportCircleMembersModel.findById(decodedData.id);
  // console.log(user);
  if (!user) {
    return next(new ErrorHander("you are not Authorized to use this service!"))
  }
  req.user = user
  // console.log(req.user);
  req.circle = await TransportCircle.findById(req.user.circle)
  // console.log(req.circle);
  // console.log("out");
  next();
});


// is Selling circle admin
exports.isSAdmin = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // const circle=await BuyingCircle.findById(decodedData.id);
  // console.log(circle);
  req.circle = await SellingCircle.findById(decodedData.id);
  if (!req.circle) {
    return next(new ErrorHander("You are not admin, To avail this service", 401));
  }

  // here some work need to be done clash bw adding circle member and getting detail and removing menber
  // if(req.circle.circlename!=req.body.circlename || req.circle.circleemail!=req.body.circleemail ){
  //     return next(new ErrorHander("You can only process your circle members data!!", 401));
  // }
  next();
});

// is buying circle admin
exports.isAdmin = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // const circle=await BuyingCircle.findById(decodedData.id);
  // console.log(circle);
  req.circle = await BuyingCircle.findById(decodedData.id);
  if (!req.circle) {
    return next(new ErrorHander("You are not admin, To avail this service", 401));
  }

  // here some work need to be done clash bw adding circle member and getting detail and removing menber
  //   if(req.circle.circlename!=req.body.circlename || req.circle.circleemail!=req.body.circleemail ){
  //     return next(new ErrorHander("You can only process your circle members data!!", 401));
  // }
  next();
});

// is tranport circle admin
exports.isTAdmin = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.circle = await TransportCircle.findById(decodedData.id);
  if (!req.circle) {
    return next(new ErrorHander("You are not admin, To avail this service", 401));
  }

  // here some work need to be done clash bw adding circle member and getting detail and removing menber
  //   if(req.circle.circlename!=req.body.circlename || req.circle.circleemail!=req.body.circleemail ){
  //     return next(new ErrorHander("You can only process your circle members data!!", 401));
  // }
  next();
});

exports.isSameUser = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHander("No product found! wrong id entered."))
  }
  // console.log("1- ", product.user);
  // console.log("2- ",req.user._id);
  // console.log(typeof(product.user));
  // console.log(product.user.equals(req.user._id));
  if (!product.user.equals(req.user._id)) {
    return next(new ErrorHander("you can't alter other seller's product!!"))
  }
  next();
})

// to check if the user is a part of this order or not
exports.isValiduser = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.user);
  // console.log("in valid");
  const id = req.params.id
  const order = await ConfirmOrder.findOne({ order: id }).populate("order")
  // console.log("order is");
  // console.log(order);
  if (!order) {
    // console.log("order");
    return next(new ErrorHander("This order doesn't exists, Invalid Order"))
  }
  // console.log(order);
  // console.log("user is");
  // console.log(req.user);
  req.order = order
  // console.log(order.order.users);
  if (!order.order.users.includes(req.user._id)) {
    return next(new ErrorHander("You are not part of this Order!!"))
  }
  next()
})

