const localStrategy = require('../../../middlewares/authentication');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const CredsModel = require('../../../models/CredsModel');
const { jwt: { secret: key } } = require('../../../../config.js').get(process.env.NODE_ENV || 'development');

module.exports = (req, res, next) => {
  localStrategy.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        success: false,
        status: 400,
        msg: 'Password Salah',
      });
    }
    return req.login(user, { session: false }, (error) => {
      if (error) {
        return res.status(400).json({
          success: false,
          status: 400,
          msg: 'Login failed',
        });
      }
      const token = jwt.sign(user, key, { expiresIn: '10h' });
      const refresh = randtoken.uid(256);
      return CredsModel.update({ username: user.username }, { refreshToken: refresh })
        .then((result) => {
          if (result.nModified === 1) {
            return res.status(200).json({
              success: true,
              status: 200,
              data: {
                user: user, // eslint-disable-line object-shorthand
                accessToken: token,
                refreshToken: refresh,
              },
            });
          }
          return Promise.reject('Gagal menyimpan refresh token'); // eslint-disable-line prefer-promise-reject-errors
        })
        .catch(gagal => next(gagal));
    });
  })(req, res, next);
};
