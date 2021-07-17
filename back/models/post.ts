import { Schema, model } from 'mongoose';

interface PostType {
  title: string;
  link: string;
  youtuber: string;
  thumbnail: string;
  key: string;
  youtuberImage: string;
}

const postSchema = new Schema<PostType>(
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

const Post = model<PostType>('Post', postSchema);

export { Post, PostType, postSchema };
