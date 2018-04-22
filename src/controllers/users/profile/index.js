const profile = require('express').Router();
const passport = require('passport');
const UserModel = require('../../../models/UserModel');
// const validation = require('../../../middlewares/shared-validator');

profile.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  UserModel.findOne({ username: req.user.username })
    .then(user => res.status(200).json({ success: true, status: 200, data: user }))
    .catch(err => next(err));
});
// profile.post('/', validation.auth, require('./profile'));


module.exports = profile;
