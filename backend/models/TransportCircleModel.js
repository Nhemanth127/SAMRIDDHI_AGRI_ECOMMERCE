const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const TransportCircleSchema = new mongoose.Schema({
    circlename: {
        type: String,
        required: [true, "Please Enter Cirlce Name"],
        maxLength: [30, "Circle Name cannot exceed 30 characters"],
        minLength: [4, "Circle Name should have more than 4 characters"],
    },
    circleemail: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: [true, "Please Enter Unqiue Email"],
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    admin: {
        type: String,
        required: [true, "Please Enter Circle Admin name"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
        minLength: [6, "Picode should have atleast 6 characters"],
    },
    community: {
        type: String,
        // required: true
    },
    area: {
        type: String,
        required: true
    },
    members: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "TransportCircleMembers",
            required: true,
        }
    ]
}, { timestamps: true });

TransportCircleSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
TransportCircleSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare Password

TransportCircleSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
TransportCircleSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("TransportCirlce", TransportCircleSchema);
