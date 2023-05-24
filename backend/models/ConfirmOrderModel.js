const mongoose = require("mongoose");
const confirmOrderSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.ObjectId,
        ref: "OrderMatch",
        // required:true
    },
    noofusers: {
        type: Number,
        required: true
    },
    noofbuyers: {
        type: Number,
        required: true
    },
    noofsellers: {
        type: Number,
        required: true
    },
    counter: {
        type: Number,
        required: true,
        default: 0
    },
    users: {
        type: []
    }





}, { timestamps: true })
module.exports = mongoose.model("ConfirmOrder", confirmOrderSchema)