const express = require("express");
const SignupRoute = express.Router();
const jwt = require("jsonwebtoken");
const Auth = require("../models/user.model");

SignupRoute.post("/", async (req, res) => {
    const { email, password, name, age, gender, address, phone } = req.body;
    const user = await Auth.findOne({ email });
    const token = req.headers["token"];
    if (email == "" && password == "") {
        return res.json({ status: "NO", message: "Please Fill Credentials" });
    }
});
module.exports = SignupRoute;