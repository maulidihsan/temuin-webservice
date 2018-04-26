const timeline = require('express').Router();
const validator = require('../../middlewares/shared-validator');
const passport = require('passport');

timeline.get('/hilang', passport.authenticate('jwt', { session: false }), require('./lost'));
timeline.get('/ketemu', passport.authenticate('jwt', { session: false }), require('./found'));
timeline.post('/post_hilang', passport.authenticate('jwt', { session: false }), validator.newLost, require('./newlost'));
timeline.post('/post_ketemu', passport.authenticate('jwt', { session: false }), validator.newFound, require('./newfound'));

module.exports = timeline;
