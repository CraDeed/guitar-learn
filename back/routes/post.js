const express = require('express');
const spawn = require('child_process').spawn;

const { Post } = require('../models/post');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/search', async (req, res, next) => {
  try {
    const { artist, music } = req.query;

    const result = spawn('python', ['back/python/craw.py', artist, music]);
    // const result = spawn('python', ['back/python/ex.py', '카레유', '20']);

    //TODO: undefined2 고치기

    // // 3. stdout의 'data'이벤트리스너로 실행결과를 받는다.
    // result.stdout.on('data', function (data) {
    //   const textChunk = data.toString();
    //   try {
    //     // console.log(textChunk);
    //     // console.log('type', typeof textChunk);
    //     const obj = JSON.parse(textChunk);
    //     // console.log(obj);
    //     res.status(200).send(obj);
    //   } catch (error) {
    //     console.log(error);
    //     res.status(201).send({});
    //   }
    // });

    let obj;

    result.stdout.on('data', (data) => {
      // var buff2 = Buffer.from('hellow word');
      // console.log(buff2);
      // console.log(buff2.toString());
      // console.log(data);
      // console.log(data.toString());
      // console.log(JSON.parse(data.toString()));
      // console.log(data);
      const dataToSend = data.toString();
      console.log(dataToSend);
      obj = JSON.parse(dataToSend);
    });

    result.on('close', (code) => {
      res.status(200).send(obj);
    });

    // 4. 에러 발생 시, stderr의 'data'이벤트리스너로 실행결과를 받는다.
    result.stderr.on('data', function (data) {
      console.log(data.toString());
      return res.status(500).send([]);
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
