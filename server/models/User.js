const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleID: String,
	fullName: String
});

mongoose.model('users', userSchema);

// const category = module.exports = mongoose.model('category', categorySchema);
