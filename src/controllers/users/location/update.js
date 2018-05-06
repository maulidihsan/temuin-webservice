const UserModel = require('../../../models/UserModel');

module.exports = (req, res, next) => {
  if (req.query.lat && req.query.lng) {
    UserModel.findOneAndUpdate(
      { username: req.user.username },
      { $set: { lastLocation: { type: 'Point', coordinates: [req.query.lng, req.query.lat] } } },
      { new: true },
    )
      .then(user => res.status(201).json({ success: true, status: 201, data: user }))
      .catch(err => next(err));
  } else {
    res.status(400).json({ success: false, status: 422, msg: 'Please insert Latitude and Longitude data' });
  }
};
