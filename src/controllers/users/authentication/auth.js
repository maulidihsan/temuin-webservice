const localStrategy = require('../../../middlewares/authentication');

module.exports = (req, res, next) => {
  localStrategy.authenticate('local', { successRedirect: '/', failureRedirect: '/users/authentication', failureFlash: 'Invalid username or password.' })(req, res, next);
};
