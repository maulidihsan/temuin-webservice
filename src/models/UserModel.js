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
  urlFoto: {
    type: String,
  },
  ttl: {
    type: Date,
    required: true,
  },
  jenisKelamin: {
    type: String,
    validate: value => validator.isIn(value, ['Laki-Laki', 'Perempuan']),
  },
  lastLocation: {
    type: { type: String },
    coordinates: { type: [Number] },
  },
  created: {
    type: Date,
  },
  lastUpdate: {
    type: Date,
  },
});

UserSchema.index({ lastLocation: '2dsphere' });

UserSchema.pre('save', function (next) {
  this.created = new Date();
  if (this.lastLocation.coordinates.length === 0) {
    this.lastLocation.coordinates = undefined;
  }
  next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
  this.lastUpdate = new Date();
  next();
});

module.exports = mongoose.model('User', UserSchema, 'users');
