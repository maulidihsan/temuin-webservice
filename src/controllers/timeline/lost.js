const LostModel = require('../../models/LostModel');

module.exports = (req, res, next) => {
  LostModel.find({})
    .then((posts) => {
      res.status(200).json({ status: 200, success: true, data: posts });
    })
    .catch(err => next(err));
};
