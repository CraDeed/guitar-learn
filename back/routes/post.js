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

    let obj;

    // 3. stdout의 'data'이벤트리스너로 실행결과를 받는다.
    result.stdout.on('data', (data) => {
      const textChunk = data.toString();
      obj = JSON.parse(textChunk);
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
