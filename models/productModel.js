const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockModel = new Schema(
  {
    size: Number,
    quantity: Number
  },
  { _id: false }
);

const ProductModel = new Schema({
  name: String,
  images: [String],
  price: Number,
  description: String,
  colour: String,
  stock: [StockModel]
});

module.exports = mongoose.model("Product", ProductModel);
