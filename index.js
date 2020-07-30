// Modules required
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
// Enable Cross Origin Resource Sharing (CORS) in Node.
// CORS essentially means cross-domain requests
const cors = require('cors');

// Create express instance
const app = express();

// Handle Cors
// https://enable-cors.org/server_expressjs.html
app.options('*', cors());  // enable pre-flight
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connect to MongoDB
// mongoose.connect(keys.mongoURI);
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db){
	if (err) throw err;
	console.log('db connected');
	db.close();
});

// Middleware
app.use(
	cookieSession({
		maxAge: 20 * 24 * 60 * 60 * 1000,
		keys : [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());		// body parse for http post requests


const api = require('./routes/api');
app.use('/api', api);

require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') {

	app.use(express.static(__dirname + '/public/'));

	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}




// listen to environmetn port when delploy or 5000 if in development
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));

// app.listen(PORT);
