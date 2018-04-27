const profile = require('express').Router();
const passport = require('passport');
const validator = require('../../../middlewares/shared-validator');

profile.get('/', passport.authenticate('jwt', { session: false }), require('./profile'));
profile.post('/update', passport.authenticate('jwt', { session: false }), validator.updateProfil, require('./update'));


module.exports = profile;
