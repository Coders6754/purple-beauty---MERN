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


  // Get list of Order Which is Not delivered
app.get("/getnotdelivered", async (req, res) => {
    let { token } = req.headers;
    try {
      let notDelivered = await OrderModel.find({
        OrderDelivered: false,
      }).populate({
        path: "cartId",
        populate: { path: "products", populate: "productId" },
      });
      return res.status(201).send({ notDelivered, Message: "OK" });
    } catch (e) {
      return res.send("Some thing went wrong");
    }
  });

  // Get Order details of particluar user with particular order Id

app.get("/getnotdeliveredofuser/", async (req, res) => {
    let { token } = req.headers;
  
    token = jwt.verify(token, process.env.token_password);
    let userId = token.id;
  
    try {
      let notDelivered = await OrderModel.find({
        //   OrderDelivered: false ,
        userId,
        //   _id: id,
      }).populate({
        path: "cartId",
        populate: { path: "products", populate: "productId" },
      });
  
      return res.status(201).send({ notDelivered, Message: "OK" });
    } catch (e) {
      return res.send("Some thing went wrong");
    }
  });

module.exports = app;