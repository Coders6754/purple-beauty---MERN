const { Schema, model } = require("mongoose");


const ProdModel = model("product", ProductSchema);

module.exports = ProdModel;