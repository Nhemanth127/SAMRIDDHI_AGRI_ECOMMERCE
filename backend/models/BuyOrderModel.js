const mongoose = require("mongoose");
const buyOrderSchema = new mongoose.Schema({
    circleId: {
        type: mongoose.Types.ObjectId,
        ref: "BuyingCircle"
    },
    circle: {
        type: String,
        required: true
    },
    circleemail: {
        type: String,
        required: true
    },
    buyerId: {
        type: mongoose.Types.ObjectId,
        ref: "BuyingCircleMembers",
    },
    buyer: {
        type: String,
        required: true
    },
    buyeremail: {
        type: String,
    },
    product:
    {
        name: {
            type: String,
            required: true,
        },
        minprice: {
            type: Number,
            required: true,
        },
        maxprice: {
            type: Number,
            required: true,
            default: 100
        },
        category: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
    },
    isSelected: {
        type: Boolean,
        default: false,
        required: true
    },
    isDelivered: {
        type: Boolean,
        default: false,
        required: true
    },
    isTDelivered: {
        type: Boolean,
        default: false,
        required: true
    },
    transporter: {
        type: mongoose.Schema.ObjectId,
        ref: "TransportCircleMembers"
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }

}, { timestamps: true })
module.exports = mongoose.model("BuyOrder", buyOrderSchema)