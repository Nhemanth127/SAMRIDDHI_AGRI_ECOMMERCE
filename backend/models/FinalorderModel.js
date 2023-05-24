const mongoose = require("mongoose")
const finalOrderSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.ObjectId,
        ref: "OrderMatch"
    },
}, { timestamps: true })
module.exports = mongoose.model("FinalOrder", finalOrderSchema)
