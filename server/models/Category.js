const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
	userID: String,
  name: String
}, { collection: 'category'})

const category = module.exports = mongoose.model('category', categorySchema);
