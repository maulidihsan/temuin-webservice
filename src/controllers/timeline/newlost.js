const LostModel = require('../../models/LostModel');

module.exports = (req, res, next) => {
  const newPost = new LostModel({
    user: req.user,
    judul: req.body.judul,
    deskripsi: req.body.deskripsi,
    urlGambar: req.body.urlGambar,
    lokasi: {
      coordinates: [req.body.lokasi.lng, req.body.lokasi.lat],
    },
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

