const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(
	cookieSession({
		maxAge: 20 * 24 * 60 * 60 * 1000,
		keys : [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);


// listen to environmetn port when delploy or 5000 if in development
const PORT = process.env.PORT || 5000;

app.listen(PORT);


