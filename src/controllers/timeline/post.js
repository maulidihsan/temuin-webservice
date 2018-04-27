const PostModel = require('../../models/PostModel');

module.exports = (req, res, next) => {
  PostModel.find({})
    .then((posts) => {
      res.status(200).json({ status: 200, success: true, data: posts });
    })
    .catch(err => next(err));
};
