const mongoose = require('mongoose');

const FoundSchema = new mongoose.Schema({
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
  kontak: {
    type: String,
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

FoundSchema.pre('save', function (next) {
  if (!this.created) {
    this.created = new Date();
  } else {
    this.lastUpdate = new Date();
  }
  next();
});
module.exports = mongoose.model('Found', FoundSchema, 'found');
