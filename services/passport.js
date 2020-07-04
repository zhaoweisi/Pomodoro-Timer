const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
			done(null, user)
	});
});


//create new instance of google passport strategy, and register with passport
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},  
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleID: profile.id })
				.then((existingUser) => {
					if  (existingUser){
						//already have a record with the given ID
						done(null, existingUser);
					}else{
						new User({ googleID: profile.id })
						.save()
						.then(user => done(null, user));

					}
				});
		}
	)
);
