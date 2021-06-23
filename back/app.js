const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwtMiddleware = require('./lib/jwtMiddleware');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const path = require('path');
const spawn = require('child_process').spawn;
const schedule = require('node-schedule');
const { Post } = require('./models/post');

dotenv.config({ path: 'back/.env' });
const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(jwtMiddleware);

const job = schedule.scheduleJob('0 0 * * *', async function () {
  const randomArtist = [
    '아이유',
    '이적',
    '장범준',
    '10cm',
    'bts',
    '김광석',
    '쏜애플',
  ];

  const artitst = randomArtist[Math.floor(Math.random() * randomArtist.length)];

  const result = spawn('python', ['./python/craw.py'], artitst);

  // 3. stdout의 'data'이벤트리스너로 실행결과를 받는다.
  result.stdout.on('data', function (data) {
    const textChunk = data.toString();
    const obj = JSON.parse(textChunk);

    try {
      if (obj) {
        obj.forEach(async (craw) => {
          await Post.remove({});
          const post = new Post({
            title: craw.title,
            link: craw.link,
            youtuber: craw.youtuber,
            thumbnail: craw.thumbnail,
            key: craw.key,
            youtuberImage: craw.youtuberImage,
          });
          await post.save();
        });
        console.log('저장 완료');
      }
    } catch (error) {
      console.error(error);
    }
  });

  // 4. 에러 발생 시, stderr의 'data'이벤트리스너로 실행결과를 받는다.
  result.stderr.on('data', function (data) {
    console.log(data.toString());
  });
});

app.get('/', (req, res) => res.send('Hello world!!!'));

app.use('/user', userRouter);
app.use('/post', postRouter);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static('front/build'));

  // index.html for all page routes    html or routing and naviagtion
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front', 'build', 'index.html'));
  });
}

const port = PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));
