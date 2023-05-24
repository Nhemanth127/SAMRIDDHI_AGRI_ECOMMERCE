const mongoose = require("mongoose");
const orderMatchSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.ObjectId,
        ref: "BuyOrdersAggregation",
        required: true
    },
    sale: {
        type: mongoose.Schema.ObjectId,
        ref: "Sale",
        required: true
    },
    confirmorder: {
        type: mongoose.Schema.ObjectId,
        ref: "ConfirmOrder",
        // required:true,
    }, users: {
        type: []
    },
    transporter: {
        type: mongoose.Schema.ObjectId,
        ref: "TransportCircleMembers"
    },
    isDelivered: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })
module.exports = mongoose.model("OrderMatch", orderMatchSchema)