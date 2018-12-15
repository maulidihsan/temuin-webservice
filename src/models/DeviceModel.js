const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  devices: {
    type: [String],
  },
});

const DeviceModel = mongoose.model('Device', DeviceSchema);
DeviceSchema.pre('findOneAndUpdate', function (next) {
  const self = this;
  if (self._update.$push) { // eslint-disable-line
    const token = self._update.$push.devices; // eslint-disable-line
    DeviceModel.findOne({ username: self.getQuery().username, devices: { $elemMatch: token } })
      .then((hasil) => {
        if (!hasil) {
          next();
        } else {
          next(new Error('device sudah ada'));
        }
      })
      .catch(err => next(new Error(err)));
  }
});

module.exports = mongoose.model('Device', DeviceSchema, 'device');
