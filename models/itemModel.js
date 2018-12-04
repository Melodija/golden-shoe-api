const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const itemModel = new Schema({
    name: String,
    description: String
  });

module.exports = mongoose.model('Item', itemModel);
