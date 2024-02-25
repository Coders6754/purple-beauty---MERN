const { validate } = require('../middleware/validate.middleware');
const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const OrderModel = require("../models/order.model");
const app = express.Router();

app.get("/getall", validate, async (req, res) => {
    const { token } = req.headers;
    try {
      let delivered = await OrderModel.find().populate({
        path: "cartId",
        populate: { path: "products", populate: "productId" },
      });
      return res.status(201).send({ delivered, Message: "OK" });
    } catch (e) {
      return res.send({ "msg": "Some thing went wrong" });
    }
  });

  // Get all the order  list  of delivered item *************
app.get("/getdeliveredorder", async (req, res) => {
    let { token } = req.headers;
    try {
      let delivered = await OrderModel.find({ OrderDelivered: true }).populate({
        path: "cartId",
        populate: { path: "products", populate: "productId" },
      });
      return res.status(201).send({ delivered, Message: "OK" });
    } catch (e) {
      return res.send("Some thing went wrong");
    }
  });


module.exports = app;