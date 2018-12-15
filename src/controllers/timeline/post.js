const PostModel = require('../../models/PostModel');

module.exports = (req, res, next) => {
  if (req.query.lat && req.query.lng) {
    if (req.query.radius) {
      PostModel.find({
        lokasi: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
            },
            $maxDistance: Number(req.query.radius),
          },
        },
      })
        .then((posts) => {
          res.status(200).json({ status: 200, success: true, data: posts });
        })
        .catch(err => next(err));
    } else {
      PostModel.find({
        lokasi: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
            },
          },
        },
      })
        .then((posts) => {
          res.status(200).json({ status: 200, success: true, data: posts });
        })
        .catch(err => next(err));
    }
  } else {
    PostModel.find({})
      .then((posts) => {
        res.status(200).json({ status: 200, success: true, data: posts });
      })
      .catch(err => next(err));
  }
};
