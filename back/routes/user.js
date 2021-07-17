const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
const { User } = require('../models/user');

dotenv.config({ path: 'back/.env' });

const router = express.Router();

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
  params: {
    folder: 'userImage',
    public_id: (req, file) => {
      const ext = path.extname(file.originalname);
      return `${Date.now()}_${path.basename(file.originalname, ext)}`;
    },
    allowed_formats: ['jpeg', 'jpg', 'png'],
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

router.post('/image', upload.single('image'), async (req, res, next) => {
  try {
    const { username } = req.body;

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
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

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
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
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
});

router.get('/logout', (req, res) => {
  res.clearCookie('access_token').status(204).send();
});

router.post('/check', async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      // 로그인 중 아님
      next(error); // Unauthorized
      return;
    }

    const data = user.toJSON();
    delete data.hashedPassword;

    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/update/profile', async (req, res, next) => {
  try {
    const { username, profileData } = req.body;

    const user = await User.findOne({
      username: username,
    });

    if (!user) {
      // 로그인 중 아님
      next(error); // Unauthorized
      return;
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
});

router.post('/playlist/:postKey', async (req, res, next) => {
  try {
    const { userId, post } = req.body;

    const user = await User.findOne({
      _id: userId,
    });

    if (!user) {
      return res.status(403).send('아이디를 찾을 수 없습니다');
    }

    if (!post) {
      return res.status(403).send('영상을 찾을 수 없습니다');
    }

    user.post.forEach((play) => {
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
});

router.delete('/unplaylist/:postKey', async (req, res, next) => {
  try {
    const { userId, postKey } = req.body;

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
});

router.get('/postget', (req, res, next) => {
  try {
  } catch (error) {}
});

module.exports = router;
