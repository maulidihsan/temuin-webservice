const jwt = require('jsonwebtoken');
const { jwt: { secret: key } } = require('../../../../config.js').get(process.env.NODE_ENV || 'development');
const CredsModel = require('../../../models/CredsModel');

module.exports = (req, res, next) => {
  CredsModel.findOne({ refreshToken: req.body.refreshToken })
    .then((data) => {
      if (!data) {
        return res.status(400).json({ success: false, status: 400, msg: 'Tidak ada refresh token' });
      }
      if (data.username === req.body.usernameOrEmail) {
        const UserData = {
          id: data.id,
          username: data.username,
          email: data.email,
        };
        const token = jwt.sign(UserData, key, { expiresIn: '1d' });
        return res.status(200).json({ success: true, status: 200, accessToken: token });
      } else if (data.email === req.body.usernameOrEmail) {
        const UserData = {
          id: data.id,
          username: data.username,
          email: data.email,
        };
        const token = jwt.sign(UserData, key, { expiresIn: '1d' });
        return res.status(200).json({ success: true, status: 200, accessToken: token });
      }
      throw new Error('data tidak valid');
    })
    .catch(err => next(err));
};
