const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
    mongoose.set('strictQuery', false);
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
};

module.exports = connect;
