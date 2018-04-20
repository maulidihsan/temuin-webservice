const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const CredsSchema = require('../models/CredsModel');
const UserSchema = require('../models/UserModel');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use('local', new LocalStrategy(
  { usernameField: 'usernameOrEmail', passwordField: 'password', passReqToCallback: true },
  (req, user, password, done) => {
    CredsSchema.findOne({ $or: [{ username: user }, { email: user }] })
      .then((doc) => {
        if (doc.password) {
          return bcrypt.compare(password, doc.password);
        }
        throw new Error('tidak terdaftar');
      })
      .then((isMatched) => {
        if (isMatched) {
          return UserSchema.findOne({ $or: [{ username: user }, { email: user }] });
        }
        throw new Error('tidak cocok');
      })
      .then((data) => {
        if (data) {
          return done(null, data);
        }
        throw new Error('data kosong');
      })
      .catch(err => done(null, false)); // eslint-disable-line no-unused-vars
  },
));

/**
passport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.NODE_ENV == 'production' ? process.env.GOOGLE_CALLBACK_URL : 'http://localhost:3000/auth/google/callback',
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    let email = profile.emails[0].value;
    User.CredentialsSchema.findOne({email: email})
    .then(doc => {
        if(doc){
            if(doc.googleId){
                return doc;
            }
            else{
        return User.CredentialsSchema.update({email: email}, { $set: { googleId: profile.id }})
            }
        }
        else{
            let doc = new User.CredentialsSchema({
                email: email,
                googleId: profile.id
            })
            return doc.save()
        }
    })
    .then(doc => {
        if(doc){
            return User.UserSchema.findOne({email: email})
        }
        else{
            throw new Error()
        }
    })
    .then(user => {
        if(user){
            return user
        }
        else{
            let userBaru = new User.UserSchema({
                nama: profile.displayName,
                email: email
            })
            return userBaru.save()
        }
    })
    .then(user => {
        if(user) {
            return done(null, user);
        }
        else{
            throw new Error()
        }
    })
    .catch(err => {console.log(err.stack); done(null, false)})
}));
*/

module.exports = passport;
