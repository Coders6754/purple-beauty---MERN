const { validate } = require('../middleware/validate.middleware');
const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const OrderModel = require("../models/order.model");
const app = express.Router();



module.exports = app;