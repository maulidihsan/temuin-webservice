const mongoose = require('mongoose');

const LostSchema = new mongoose.Schema({
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
  created: {
    type: Date,
  },
  lastUpdate: {
    type: Date,
  },
});

LostSchema.pre('save', function (next) {
  if (!this.created) {
    this.created = new Date();
  } else {
    this.lastUpdate = new Date();
  }
  next();
});
module.exports = mongoose.model('Lost', LostSchema, 'lost');
