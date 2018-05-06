const location = require('express').Router();
const passport = require('passport');

location.get('/', passport.authenticate('jwt', { session: false }), require('./update'));

module.exports = location;
