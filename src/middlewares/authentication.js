const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const CredsSchema = require('../models/CredsModel');
const { jwt: { secret: key } } = require('../../config.js').get(process.env.NODE_ENV || 'development');

/**
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
*/
passport.use('local', new LocalStrategy(
  { usernameField: 'usernameOrEmail', passwordField: 'password' },
  (user, password, done) => {
    let userData = null; // eslint-disable-line no-unused-vars
    CredsSchema.findOne({ $or: [{ username: user }, { email: user }] })
      .then((doc) => {
        if (doc.password) {
          userData = {
            id: doc.id,
            username: doc.username,
            email: doc.email,
          };
          return bcrypt.compare(password, doc.password);
        }
        throw new Error('tidak terdaftar');
      })
      .then((isMatched) => {
        if (isMatched) {
          return done(null, userData, { message: 'Logged In Successfully' });
        }
        throw new Error('tidak cocok');
      })
      .catch(err => done(err));
  },
));

passport.use('jwt', new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: key,
  },
  (jwtPayload, done) => {
    CredsSchema.findById(jwtPayload.id)
      .then((user) => {
        const userData = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        done(null, userData);
      })
      .catch(err => done(err));
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
