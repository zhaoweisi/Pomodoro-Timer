const express = require('express');
const mongodb = require('mongodb');
const keys = require('../config/keys');
const router = express.Router();

//Post user ID to DB
router.post('/user', async(req,res) => {
	// Get user collection from DB
	const db = await loadDB();
	const user = db.collection('User');
	// Check if user exists by email(ID)
	const searchRes = await user.findOne({_id: req.body.userID});
	// New user
	if (searchRes == null) {
		console.log("Result is null. Add new user");
		await user.insertOne({
			// console.log(req.body);
			_id: req.body.userID
		});
	}
	// Existing user
	else {
		console.log("Existing user. Go get category");
	}
	// load current user category
	const category = db.collection('Category');
	// Get categories from db based on query criteria
	let temp_res = await category.find({userID: req.body.userID}).toArray();
	// Parse result before sending back
	let temp_list = [];
	for (let element of temp_res) {
		temp_list.push(element.categName)
	}
	// Send back categories under current category
	res.send(temp_list)
	// res.send(await category.find({userID: req.body.userID}).toArray());
});


//Post category to DB
router.post('/category', async(req,res) => {
	// Get category collection from DB
	const db = await loadDB();
	const category = db.collection('Category');
	// Insert category with userID (email)
	await category.insertOne({
		userID: req.body.userID,
		categName: req.body.categName
	});

	// Get categories from db based on query criteria
	let temp_res = await category.find({userID: req.body.userID}).toArray();
	// Parse result before sending back
	let temp_list = [];
	for (let element of temp_res) {
		temp_list.push(element.categName)
	}
	// Send back updated categories
	res.send(temp_list)
	// res.send(await category.find({userID: req.body.userID}).toArray());
});



//Get task from DB
router.get('/task', async(req,res) => {
	// Get category collection from DB
	const db = await loadDB();
	const task = db.collection('Task');
	// console.log(req.query);
	// Get tasks from db based on query criteria
	let temp_res = await task.find({userID: req.query.userID, categName: req.query.categName}).toArray();
	// Parse result before sending back
	let temp_list = [];
	for (let element of temp_res) {
		temp_list.push(element.taskName)
	}
	// Send back tasks under current category
	res.send(temp_list)
	// res.send(await task.find({userID: req.query.userID, categName: req.query.categName}).toArray());
});


//Post task to DB
router.post('/task', async(req,res) => {
	// Get category collection from DB
	const db = await loadDB();
	const task = db.collection('Task');
	// Insert task with userID (email) and category name
	await task.insertOne({
		userID: req.body.userID,
		categName: req.body.categName,
		taskName: req.body.taskName
	});

	// Get tasks from db based on query criteria
	let temp_res = await task.find({userID: req.body.userID, categName: req.body.categName}).toArray();
	// Parse result before sending back
	let temp_list = [];
	for (let element of temp_res) {
		temp_list.push(element.taskName)
	}
	// Send back updated tasks
	res.send(temp_list)
	// res.send(await task.find({userID: req.body.userID, categName: req.body.categName}).toArray());
});


// Utility function
async function loadDB() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://Chx:MongoDBChx@pomodorocluster.fvkty.mongodb.net/Timer?retryWrites=true&w=majority',
    {
      useNewUrlParser: true, useUnifiedTopology: true
    }
  );
	return client.db('Timer');
}

module.exports = router;

//Import data schema
// const mongoose = require('mongoose');
// const category = require('../models/category');
// const user = require('../models/user');

// try {
// 	const user = await loadUserCollection();
// 	console.log(user);
// 	user.insertOne({
// 		_id: req.body.userID
// 	});
// 	res.status(201).send();
// } catch(e) {
// 	console.log(e);
// };
