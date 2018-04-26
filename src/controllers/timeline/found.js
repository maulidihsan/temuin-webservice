const FoundModel = require('../../models/FoundModel');

module.exports = (req, res, next) => {
  FoundModel.find({})
    .then((posts) => {
      res.status(200).json({ status: 200, success: true, data: posts });
    })
    .catch(err => next(err));
};
