const mongoose = require('mongoose');
const validator = require('validator');

const PostSchema = new mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  judul: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  urlGambar: {
    type: String,
    required: true,
  },
  lokasi: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number] },
  },
  float: {
    type: Number,
  },
  kategori: {
    type: String,
    validate: value => validator.isIn(value, ['lost', 'found']), // eslint-disable-line
  },
  created: {
    type: Date,
  },
  lastUpdate: {
    type: Date,
  },
});

PostSchema.pre('save', function (next) {
  this.created = new Date();
  next();
});

PostSchema.pre('findOneAndUpdate', function (next) {
  this.lastUpdate = new Date();
  next();
});
module.exports = mongoose.model('Lost', PostSchema, 'lost');
