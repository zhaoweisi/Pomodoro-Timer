const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
	userID:String,
    name :String
}, { collection: 'categories'})

mongoose.model('categories', categorySchema);
