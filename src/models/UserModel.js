const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    validate: value => validator.isEmail(value),
  },
  username: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  ttl: {
    type: Date,
    required: true,
  },
  jenisKelamin: {
    type: String,
    validate: value => validator.isIn(value, ['Laki-Laki', 'Perempuan']),
  },
});

UserSchema.pre('save', (next) => {
  if (!this.created) {
    this.created = new Date();
  } else {
    this.lastUpdate = new Date();
  }
  next();
});

module.exports = mongoose.model('User', UserSchema, 'users');
