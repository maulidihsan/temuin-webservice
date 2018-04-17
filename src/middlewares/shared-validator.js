const { check, validationResult } = require('express-validator/check');
const moment = require('moment');

module.exports.registration = [
  check('nama')
    .exists()
    .not()
    .isEmpty(),
  check('jenisKelamin')
    .exists()
    .not()
    .isEmpty()
    .isIn(['Laki-Laki', 'Perempuan']),
  check('username')
    .exists()
    .not()
    .isEmpty()
    .isAlphanumeric(),
  check('email')
    .exists()
    .not()
    .isEmpty()
    .isEmail(),
  check('ttl')
    .exists()
    .not()
    .isEmpty()
    .custom(value => moment(value).isValid())
    .withMessage('Invalid date'),
  check('password')
    .exists()
    .not()
    .isEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      next();
    } catch (err) {
      res.status(422).json({ errors: err.mapped() });
    }
  },
];
