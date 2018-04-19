const localStrategy = require('../../../middlewares/authentication');

module.exports = (req, res, next) => {
  localStrategy.authenticate('local', { successRedirect: '/', failureRedirect: '/users/authentication' })(req, res, next);
};
