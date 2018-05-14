const ChatModel = require('../../models/ChatModel');

module.exports = (req, res, next) => {
  if (req.query.username) {
    ChatModel.findOne({ owner: req.user.username, sender: req.query.username })
      .then((chat) => {
        return res.status(200).json({ success: true, status: 200, data: chat });
      })
      .catch(err => next(err));
  } else {
    ChatModel.find({ owner: req.user.username })
      .then((chats) => {
        res.status(200).json({ success: true, status: 200, data: chats });
      })
      .catch(err => next(err));
  }
};
