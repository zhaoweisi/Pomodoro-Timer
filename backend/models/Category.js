const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
	userID:String,
  name :String
}, { collection: 'categories'})

const categories = module.exports = mongoose.model('categories', categorySchema);
