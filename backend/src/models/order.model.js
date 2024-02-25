const mongoose = require("mongoose")
const { Schema, model } = require("mongoose");




const OrderModel = model("order", OrderSchema);

module.exports = OrderModel;