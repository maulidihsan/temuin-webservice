/* eslint arrow-body-style: [2, "always"] */
/* eslint-env es6 */

const { check, validationResult } = require('express-validator/check');
const moment = require('moment');
const CredsModel = require('../models/CredsModel');

module.exports.registration = [
  check('nama')
    .not()
    .isEmpty(),
  check('jenisKelamin')
    .not()
    .isEmpty()
    .isIn(['Laki-Laki', 'Perempuan']),
  check('username')
    .not()
    .isEmpty()
    .isAlphanumeric()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        CredsModel.findOne({ username: req.body.username }, (err, user) => {
          if (err) {
            reject(new Error('Server Error'));
          }
          if (user) {
            reject(new Error('Username already in use'));
          }
          resolve(true);
        });
      });
    })
    .trim(),
  check('email')
    .not()
    .isEmpty()
    .isEmail()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        CredsModel.findOne({ email: req.body.email }, (err, user) => {
          if (err) {
            reject(new Error('Server Error'));
          }
          if (user) {
            reject(new Error('E-mail already in use'));
          }
          resolve(true);
        });
      });
    }),
  check('ttl')
    .not()
    .isEmpty()
    .custom((value) => { return moment(value).isValid(); })
    .withMessage('Invalid date'),
  check('password')
    .not()
    .isEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (err) {
      res.status(422).json({ success: false, status: 422, errors: err.array() });
    }
  },
];

module.exports.auth = [
  check('usernameOrEmail')
    .not()
    .isEmpty()
    .trim(),
  check('password')
    .not()
    .isEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (err) {
      res.status(422).json({ success: false, status: 422, errors: err.array() });
    }
  },
];

module.exports.refreshTokenValidator = [
  check('usernameOrEmail')
    .not()
    .isEmpty(),
  check('refreshToken')
    .not()
    .isEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (err) {
      res.status(422).json({ success: false, status: 422, errors: err.array() });
    }
  },
];
