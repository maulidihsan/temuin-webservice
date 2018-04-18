const bcrypt = require('bcrypt-nodejs');
const CredsModel = require('../../../models/CredsModel');
const UserModel = require('../../../models/UserModel');

module.exports = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      if (hash) {
        const userCreds = new CredsModel({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        });
        return userCreds.save();
      }
      throw new Error('bcrypt hashing failed.');
    })
    .then((creds) => {
      if (creds) {
        const userData = new UserModel({
          nama: req.body.nama,
          email: creds.email,
          username: creds.username,
          ttl: new Date(req.body.ttl),
          jenisKelamin: req.body.jenisKelamin,
        });
        return userData.save();
      }
      throw new Error('cannot save credentials to database');
    })
    .then((saved) => {
      if (saved) {
        res.status(201).json({ success: true, status: 201 });
      }
    })
    .catch((err) => {
      console.log(err.stack);
      next(err.message);
    });
};
