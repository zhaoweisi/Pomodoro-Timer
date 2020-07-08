const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const router = express.Router();

//Import data schema
const Category = require('../models/Category');

//Get categories
router.get('/categories', async (req, res) => {
  const categories = await loadPostsCollection();
	console.log(categories);
  res.send(await categories.find({}).toArray());
});


//
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://Chx:MongoDBChx@pomodorocluster.fvkty.mongodb.net/Timer?retryWrites=true&w=majority',
    {
      useNewUrlParser: true, useUnifiedTopology: true
    }
  );

  return client.db('Timer').collection('Category');
}


// router.get("/category", (req, res) => {
// 	console.log("category requested");
//   Category.find({})
//     .sort({ update_at: -1 })
//     .then(cats => {
//       res.json(cats);
// 			console.log("In find");
//     })
//     .catch(err => {
//       console.log(2);
//       res.json(err);
//     });
// });


// Add Post
// router.post('/', async (req, res) => {
//   const posts = await loadPostsCollection();
//   await posts.insertOne({
//     text: req.body.text,
//     createdAt: new Date()
//   });
//   res.status(201).send();
// });
//

module.exports = router;
