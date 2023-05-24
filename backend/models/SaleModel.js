const mongoose = require("mongoose");
const saleSchema = new mongoose.Schema({
    circleId: {
        type: mongoose.Types.ObjectId,
        ref: "SellingCircle"
    },
    circle: {
        type: String,
        required: true
    },
    circleemail: {
        type: String,
        required: true
    },
    sellerId: {
        type: mongoose.Types.ObjectId,
        ref: "SellingCircleMembers",
    },
    seller: {
        type: String,
        required: true
    },
    selleremail: {
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
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 100
        },
        minorder: {
            type: Number,
            required: true,
            default: 1
        },
    }

}, { timestamps: true })

module.exports = mongoose.model("Sale", saleSchema);