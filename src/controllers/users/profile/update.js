const UserModel = require('../../../models/UserModel');
const CredsModel = require('../../../models/CredsModel');

module.exports = (req, res, next) => {
  const dataBaru = req.body.data;
  const bannedField = ['created', '_id', '__v', 'username'];
  Object.keys(dataBaru).map((key, index) => { //eslint-disable-line
    if (bannedField.includes(key)) {
      delete dataBaru[key];
    }
  });
  if (dataBaru.username || dataBaru.email) {
    const credsData = {};
    if (dataBaru.username) {
      credsData.username = dataBaru.username;
    }
    if (dataBaru.email) {
      credsData.email = dataBaru.email;
    }
    CredsModel.findOneAndUpdate(
      { username: req.user.username },
      { $set: credsData },
      { new: true },
    )
      .then(() => UserModel.findOneAndUpdate(
        { username: req.user.username },
        { $set: dataBaru },
        { new: true },
      ))
      .then(user => res.status(200).json({ success: true, status: 200, data: user }))
      .catch(err => next(err));
  } else {
    UserModel.findOneAndUpdate(
      { username: req.user.username },
      { $set: dataBaru },
      { new: true },
    )
      .then(user => res.status(200).json({ success: true, status: 200, data: user }))
      .catch(err => next(err));
  }
};
