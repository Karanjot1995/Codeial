// require('dotenv').config()
const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')
const User = require('../models/user')
const env = require('./environment')


//tell passport to use a new strategy for googlee login
passport.use(new googleStrategy({
  // clientID: `${process.env.CLIENT_ID}`,
  // clientSecret: `${process.env.CLIENT_SECRET}`,
  clientID: env.google_client_id,
  clientSecret: env.google_client_secret,
  callbackURL: env.google_callback_url
}, function (accessToken, refreshToken, profile, done) {

  User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
    if (err) {
      console.log('Error in google strategy passport', err)
      return
    }
    if (user) {
      //if found, set the user found in the DB as the google details
      return done(null, user)
    } else {
      //ifnot found create a new user in the DB using that google details
      User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: crypto.randomBytes(20).toString('hex')
      }, function (err, user) {
        if (err) {
          console.log('Error in creating user', err);
          return;
        }
        return done(null, user)
      })
    }
  })

}))


module.exports = passport
