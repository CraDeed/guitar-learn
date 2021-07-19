import { Router, Request, Response, NextFunction } from 'express';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as dotenv from 'dotenv';
import { User } from '../models/user';

interface UserDef {
  username: string;
  password: string;
}

interface PostDef {
  _id?: string;
  title: string;
  link: string;
  youtuber: string;
  thumbnail: string;
  key: string;
  youtuberImage: string;
}

interface ProfileDef {
  username: string;
  profileData: {
    guitarSkill: string;
    introduction: string;
  };
}

interface AddPlaylistDef {
  userId: string;
  post: PostDef;
}

interface RemovePlaylistDef {
  userId: string;
  postKey: string;
}

dotenv.config({ path: 'back/.env' });

const router = Router();

try {
  fs.accessSync('back/uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다');
  fs.mkdirSync('back/uploads');
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const ext = path.extname(file.originalname);
    return {
      folder: 'userImage',
      allowed_formats: ['jpeg', 'jpg', 'png'],
      public_id: `${Date.now()}_${path.basename(file.originalname, ext)}`,
    };
  },
});

const upload = multer({
  storage: storage,
});

// const upload = multer({
//   //TODO: 파일 저장경로 바구기
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       done(null, 'uploads');
//     },
//     filename(req, file, done) {
//       const ext = path.extname(file.originalname); // 확장자 추출(.png)
//       const basename = path.basename(file.originalname, ext); //
//       done(null, basename + '_' + new Date().getTime() + ext);
//     },
//   }),
//   limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
// });

router.post(
  '/image',
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const username = req.body.username as string;

      const user = await User.findOne({
        username: username,
      });

      user.image = req.file.path;
      await user.save();

      res.json(req.file.path);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password }: UserDef = req.body;

      const exUser = await User.findOne({
        username: username,
      });
      if (exUser) {
        return res.status(403).send('이미 사용중인 아이디입니다.');
      }

      const user = new User({
        username,
      });
      // TODO: 비밀번호 만드는 함수 넣기
      await user.setPassword(password);
      await user.save();

      const data = user.toJSON();
      delete data.hashedPassword;

      const token = user.generateToken();
      res
        .cookie('access_token', token, {
          maxAge: 100 * 60 * 60 * 24 * 7,
          httpOnly: true,
        })
        .status(200)
        .json(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: UserDef = req.body;
    try {
      const user = await User.findOne({
        username: username,
      });
      if (!user) {
        return res.status(401).json('아이디와 비밀번호를 확인하세요!');
      }
      //TODO: 비밀번호 처리 함수

      const valid = await user.checkPassword(password);
      if (!valid) {
        return res.status(401).json('아이디와 비밀번호를 확인하세요!');
      }

      const data = user.toJSON();
      delete data.hashedPassword;

      const token = user.generateToken();
      res
        .cookie('access_token', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        })
        .status(200)
        .json(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get('/logout', (req, res: Response) => {
  res.clearCookie('access_token').status(204).send();
});

router.post(
  '/check',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const username = req.body.username as string;

      const user = await User.findOne({ username: username });

      if (!user) {
        // 로그인 중 아님
        return res.status(401).send();
      }

      const data = user.toJSON();
      delete data.hashedPassword;

      res.status(200).send(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.patch(
  '/update/profile',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, profileData }: ProfileDef = req.body;

      const user = await User.findOne({
        username: username,
      });

      if (!user) {
        // 로그인 중 아님
        return res.status(401).send();
      }

      user.introduction = profileData.introduction;
      user.guitarSkill = profileData.guitarSkill;
      await user.save();

      const data = user.toJSON();
      delete data.hashedPassword;

      res.status(200).send(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  '/playlist/:postKey',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, post }: AddPlaylistDef = req.body;

      const user = await User.findOne({
        _id: userId,
      });

      if (!user) {
        return res.status(403).send('아이디를 찾을 수 없습니다');
      }

      if (!post) {
        return res.status(403).send('영상을 찾을 수 없습니다');
      }

      user.post.forEach((play: PostDef) => {
        if (play.key === post.key) {
          return res.status(403).send('이미 추가한 영상입니다.');
        }
      });

      user.post.push(post);
      await user.save();

      res.status(200).send(user.post);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  '/unplaylist/:postKey',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, postKey }: RemovePlaylistDef = req.body;

      await User.updateOne(
        {
          _id: userId,
        },
        {
          $pull: {
            post: {
              key: postKey,
            },
          },
        }
      );

      res.status(203).send({ postKey: req.params.postKey });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
