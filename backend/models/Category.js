const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  name :String,
  explain:String
}, { collection: 'categories'})

const categories = module.exports = mongoose.model('categories', categorySchema);
