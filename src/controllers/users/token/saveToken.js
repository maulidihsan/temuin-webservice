const fcm = require('../../../middlewares/fcm');

module.exports = (req, res, next) => {
  fcm.addDeviceToken(req.user.username, req.body.token)
    .then((response) => {
      if (response) {
        res.status(201).json({ success: true, status: 201 });
      }
    })
    .catch(err => next(err));
};
