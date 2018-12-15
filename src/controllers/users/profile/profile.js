const UserModel = require('../../../models/UserModel');

module.exports = (req, res, next) => {
  UserModel.findOne({ username: req.user.username })
    .then(user => res.status(200).json({ success: true, status: 200, data: user }))
    .catch(err => next(err));
};
