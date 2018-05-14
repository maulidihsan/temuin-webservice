const chat = require('express').Router();
const passport = require('passport');

chat.get('/', passport.authenticate('jwt', { session: false }), require('./get'));

module.exports = chat;
