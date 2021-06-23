const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    title: String,
    link: String,
    youtuber: String,
    thumbnail: String,
    key: String,
    youtuberImage: String,
  },
  { versionKey: false }
);

const Post = mongoose.model('Post', postSchema);

module.exports = { Post, postSchema };
