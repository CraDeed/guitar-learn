import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { spawn } from 'child_process';

import { Post, PostType } from '../models/post';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post(
  '/search',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artist = req.query.artist as string;
      const music = req.query.music as string;

      const result = spawn('python', ['back/python/craw.py', artist, music]);

      let obj: PostType[] | [];

      // 3. stdout의 'data'이벤트리스너로 실행결과를 받는다.
      result.stdout.on('data', (data: Buffer) => {
        const textChunk = data.toString();
        obj = JSON.parse(textChunk);
      });

      result.on('close', (code) => {
        res.status(200).send(obj);
      });

      // 4. 에러 발생 시, stderr의 'data'이벤트리스너로 실행결과를 받는다.
      result.stderr.on('data', function (data: Buffer) {
        console.log(data.toString());
        return res.status(500).send([]);
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
