const timeline = require('express').Router();
const validator = require('../../middlewares/shared-validator');
const passport = require('passport');

timeline.get('/', passport.authenticate('jwt', { session: false }), require('./post'));
timeline.post('/new_post', passport.authenticate('jwt', { session: false }), validator.newPost, require('./newpost'));

module.exports = timeline;
