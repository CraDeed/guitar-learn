import { Schema, model } from 'mongoose';
import { postSchema, PostType } from './post';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface UserType {
  username: string;
  hashedPassword: string;
  image?: string;
  guitarSkill?: string;
  introduction?: string;
  post?: PostType[];
}

interface IUserDocument extends UserType, Document {
  setPassword: (password: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
  generateToken: () => Promise<string>;
}

const userSchema = new Schema<IUserDocument>(
  {
    username: String,
    hashedPassword: String,
    image: String,
    guitarSkill: String,
    introduction: String,
    post: [postSchema],
  },
  { versionKey: false }
);

userSchema.methods.setPassword = async function (password) {
  const hashed = await hash(password, 10);
  this.hashedPassword = hashed;
};

userSchema.methods.checkPassword = async function (password) {
  const result = await compare(password, this.hashedPassword);
  return result;
};

userSchema.methods.generateToken = function () {
  const token = sign(
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
  return token;
};

const User = model<IUserDocument>('User', userSchema);

export { User };
