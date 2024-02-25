const express = require("express");
const SignupRoute = express.Router();
const jwt = require("jsonwebtoken");
const Auth = require("../models/user.model");

SignupRoute.post("/", async (req, res) => {
    const { email, password, name, age, gender, address, phone } = req.body;
    const user = await Auth.findOne({ email });
});
module.exports = SignupRoute;