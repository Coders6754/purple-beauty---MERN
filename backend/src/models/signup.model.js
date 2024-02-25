const express = require("express");
const SignupRoute = express.Router();
const jwt = require("jsonwebtoken");
const Auth = require("../models/user.model");