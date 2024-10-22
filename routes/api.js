const express = require('express');
const mongodb = require('mongodb');
const keys = require('../config/keys');
const router = express.Router();
const dbURI = keys.mongoURI;
const dbName = 'Timer';


//Post user ID to DB
router.post('/user', async(req,res) => {
	// Get user collection from DB
	const db = await loadDB();
	const user = db.collection('User');
	// Check if user exists by email(ID)
	const searchRes = await user.findOne({_id: req.body.userID});
	let temp_list = [];
	// New user
	if (searchRes == null) {
		console.log("Result is null. Add new user");
		await user.insertOne({
			_id: req.body.userID,
			reward: 0
		});
		temp_list.push(0);
	}
	// Existing user
	else {
		console.log("Existing user. Go get category and reward");
		// Append reward to result list
		temp_list.push(searchRes.reward);
	}
	// load current user category
	const category = db.collection('Category');
	// Get categories from db based on query criteria
	let temp_res = await category.find({userID: req.body.userID}).toArray();
	// Parse result before sending back
	for (let element of temp_res) {
		// Append category names to result list
		temp_list.push(element.categName)
	}
	// Send back categories under current category and user reward
	res.send(temp_list)
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
});



//Get task from DB
router.get('/task', async(req,res) => {
  // Get category collection from DB
  const db = await loadDB();
  const task = db.collection('Task');
  // Get tasks from db based on query criteria
  let temp_res = await task.find({userID: req.query.userID, categName: req.query.categName}).toArray();
  // Parse result before sending back
  let temp_list = [];
  for (let element of temp_res) {
    temp_list.push(element.taskName)
  }
  // Send back tasks under current category
  res.send(temp_list)
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
		taskName: req.body.taskName,
		taskSpan: req.body.taskSpan,
		status: req.body.taskStatus
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
});


//Get task span from DB
router.get('/taskSpan', async(req,res) => {
	// Get category collection from DB
	const db = await loadDB();
	const task = db.collection('Task');
	console.log("In taskSpan get");
	console.log(req.query);
	res.send(await task.findOne({userID: req.query.userID, categName: req.query.categName, taskName: req.query.taskName}))
});


//Update task span from DB
router.post('/taskSpan', async(req,res) => {
	// Get category collection from DB
	const db = await loadDB();
	const task = db.collection('Task');
	console.log("In taskSpan post");
	console.log(req.body);
	// Subtract timePassed from taskSpan and update
	let result = await task.updateOne(
		{userID: req.body.userID, categName: req.body.categName, taskName: req.body.taskName},
		{
			$inc: {taskSpan: (-1)*req.body.subtraction}
		}
	);
	res.sendStatus(200)
});


//Update user reward in DB
router.post('/reward', async(req,res) => {
	// Get category collection from DB
	const db = await loadDB();
	const user = db.collection('User');
	console.log("In reward post");
	console.log(req.body);
	// Update reward
	let result = await user.findOneAndUpdate(
		{_id: req.body.userID},
		{
			$inc: {reward: 1}
		}
	);
	res.sendStatus(200)
});


//Update task status in DB
router.post('/status', async(req,res) => {
	// Get task collection from DB
	const db = await loadDB();
	const task = db.collection('Task');
	console.log("In status post");
	console.log(req.body);
	let result = await task.findOneAndUpdate(
		{userID: req.body.userID, categName: req.body.categName, taskName: req.body.taskName},
		{
			$set: {status: req.body.taskStatus}
		}
	);
	res.sendStatus(200)
});


// Utility function
async function loadDB() {
  const client = await mongodb.MongoClient.connect(
    dbURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true
    }
  );
  return client.db(dbName);
}

module.exports = router;
