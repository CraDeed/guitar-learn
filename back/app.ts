// const express = require('express');
import express from 'express';
import { Post, PostType } from './models/post';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { spawn } from 'child_process';
import { scheduleJob } from 'node-schedule';
import mongoURI from './config/key';
import jwtMiddleware from './lib/jwtMiddleware';
import userRouter from './routes/user';
import postRouter from './routes/post';

dotenv.config({ path: 'back/.env' });
const { PORT } = process.env;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e: Error) => {
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

const job = scheduleJob('0 0 * * *', async function () {
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

  const result = spawn('python', ['back/python/craw.py', artitst, '']);

  // 3. stdout의 'data'이벤트리스너로 실행결과를 받는다.
  result.stdout.on('data', function (data: Buffer) {
    const textChunk = data.toString();
    const obj: PostType[] = JSON.parse(textChunk);

    try {
      if (obj) {
        obj.forEach(async (craw: PostType) => {
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
  result.stderr.on('data', function (data: Buffer) {
    console.log(data.toString());
  });
});

// app.get('/', (req, res) => res.send('Hello world!!!'));

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

const port: number = Number(PORT) || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));
