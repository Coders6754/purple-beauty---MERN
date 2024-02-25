const http = require("http");
const express = require("express");
const app = express();
const httpServer = http.createServer(app);
const mongoose = require("mongoose");
const connect = require("./src/config/db");


require("dotenv").config();
const PORT = process.env.PORT || 8080;
mongoose.set("strictQuery", false);


app.use(express.json());


app.get("/", async (req, res) => {
  res.send("yahoo!!!");
});



httpServer.listen(PORT, async () => {
  try {
    await connect();
    console.log("connected to DB");
  } catch (e) {
    console.log({ message: e.message });
  }
  console.log(`Server is running at port ${PORT}`);
});
