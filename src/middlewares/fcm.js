const admin = require('firebase-admin');
const serviceAccount = require('../../config/temuin-firebase-adminsdk.json');
const DeviceModel = require('../models/DeviceModel');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://temuin-9f8ed.firebaseio.com',
});

module.exports = {
  sendToDevice: (uname, message, callback) => {
    DeviceModel.findOne({ username: uname })
      .then((device) => {
        const tokens = device.devices;
        const payload = {
          notification: {
            title: 'TemuIn',
            body: message,
            // click_action: '.MainActivity_notification',
          },
          data: {
            msg: message,
          },
        };
        const options = {
          priority: 'high',
        };
        return admin.messaging().sendToDevice(tokens, payload, options);
      })
      .then((response) => {
        console.log(response);
        callback(true);
      })
      .catch((error) => {
        console.log(error);
        callback(false);
      });
  },
  addDeviceToken: (uname, token, callback) => {
    DeviceModel.findOneAndUpdate(
      { username: uname },
      {
        $push: {
          devices: token,
        },
      },
      { upsert: true, new: true },
    )
      .then(() => {
        callback(true);
      })
      .catch(() => callback(false));
  },
  removeDevice: (uname, token, callback) => {
    DeviceModel.findOneAndUpdate(
      { username: uname },
      {
        $pop: {
          devices: token,
        },
      },
      { upsert: true, new: true },
    )
      .then(() => {
        callback(true);
      })
      .catch(() => callback(false));
  },
  broadcast: (topic, data, callback) => {
    const payload = {
      notification: {
        title: 'TemuIn',
        body: data,
        // click_action: '.MainActivity_notification'
      },
      data: {
        message: data,
      },
    };
    admin.messaging().sendToTopic(topic, payload)
      .then(() => callback(true))
      .catch(() => callback(false));
  },
};

