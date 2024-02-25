const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        name: String,
        email: { type: String, required: true, unquie: true },
        password: { type: String, required: true },
        address: { type: String },
        phone: Number
    },
);

const UserModel = model("user", UserSchema);

module.exports = UserModel;