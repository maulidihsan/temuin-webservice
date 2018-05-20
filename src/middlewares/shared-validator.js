/* eslint arrow-body-style: [2, "always"] */
/* eslint-env es6 */

const { check, validationResult } = require('express-validator/check');
const moment = require('moment');
const CredsModel = require('../models/CredsModel');

module.exports.registration = [
  check('nama')
    .not()
    .isEmpty()
    .withMessage('Field kosong'),
  check('jenisKelamin')
    .not()
    .isEmpty()
    .withMessage('Field kosong')
    .isIn(['Laki-Laki', 'Perempuan'])
    .withMessage('Field tidak valid'),
  check('username')
    .not()
    .isEmpty()
    .withMessage('Field kosong')
    .isAlphanumeric()
    .withMessage('Field harus alphanumeric')
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
    .withMessage('Field kosong')
    .isEmail()
    .withMessage('Format tidak valid')
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
    .withMessage('Field kosong')
    .custom((value) => { return moment(value).isValid(); })
    .withMessage('Invalid date format'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Field kosong'),
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
    .trim()
    .withMessage('Field kosong'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Field kosong'),
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
    .isEmpty()
    .withMessage('Field kosong'),
  check('refreshToken')
    .not()
    .isEmpty()
    .withMessage('Field kosong'),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (err) {
      res.status(422).json({ success: false, status: 422, errors: err.array() });
    }
  },
];

module.exports.newPost = [
  check('deskripsi')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Field kosong'),
  check('urlGambar')
    .not()
    .isEmpty()
    .withMessage('Field kosong'),
  check('namaLokasi')
    .trim(),
  check('lokasi')
    .not()
    .isEmpty()
    .withMessage('Field kosong'),
  check('lokasi.lat')
    .not()
    .isEmpty()
    .withMessage('Empty latitude')
    .isFloat(),
  check('lokasi.lng')
    .not()
    .isEmpty()
    .withMessage('Empty longitude')
    .isFloat(),
  check('kategori')
    .not()
    .isEmpty()
    .withMessage('Empty longitude')
    .isIn(['lost', 'found'])
    .withMessage('Invalid kategori'),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (err) {
      res.status(422).json({ success: false, status: 422, errors: err.array() });
    }
  },
];

module.exports.updateProfil = [
  check('data.username')
    .optional()
    .custom((value) => {
      return new Promise((resolve, reject) => {
        CredsModel.findOne({ username: value }, (err, user) => {
          if (err) {
            reject(new Error('Server Error'));
          }
          if (user) {
            reject(new Error('Username already in use'));
          }
          resolve(true);
        });
      });
    }),
  check('data.email')
    .optional()
    .custom((value) => {
      return new Promise((resolve, reject) => {
        if (!value) {
          resolve(true);
        }
        CredsModel.findOne({ email: value }, (err, user) => {
          if (err) {
            reject(new Error('Server Error'));
          }
          if (user) {
            reject(new Error('Email already in use'));
          }
          resolve(true);
        });
      });
    }),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (err) {
      res.status(422).json({ success: false, status: 422, errors: err.array() });
    }
  },
];

module.exports.saveToken = [
  check('token')
    .trim()
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
