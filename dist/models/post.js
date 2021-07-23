"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = exports.Post = void 0;
var mongoose_1 = require("mongoose");
var postSchema = new mongoose_1.Schema({
    title: String,
    link: String,
    youtuber: String,
    thumbnail: String,
    key: String,
    youtuberImage: String,
}, { versionKey: false });
exports.postSchema = postSchema;
var Post = mongoose_1.model('Post', postSchema);
exports.Post = Post;
