const PostModel = require('../../models/PostModel');

module.exports = (req, res, next) => {
  const newPost = new PostModel({
    user: req.user,
    deskripsi: req.body.deskripsi,
    urlGambar: req.body.urlGambar,
    lokasi: {
      coordinates: [req.body.lokasi.lng, req.body.lokasi.lat],
    },
    kategori: req.body.kategori,
    float: 0,
  });
  newPost.save()
    .then((data) => {
      if (data) {
        return res.status(201).json({ success: true, status: 201 });
      }
      throw new Error('Gagal membuat post');
    })
    .catch(err => next(err));
};

