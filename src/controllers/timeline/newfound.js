const FoundModel = require('../../models/FoundModel');

module.exports = (req, res, next) => {
  const newPost = new FoundModel({
    user: req.user,
    judul: req.body.judul,
    deskripsi: req.body.deskripsi,
    urlGambar: req.body.urlGambar,
    kontak: req.body.kontak,
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

