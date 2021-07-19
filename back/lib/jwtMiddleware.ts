import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { User } from '../models/user';

const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token as string;
  if (!token) return next(); // 토큰 없음
  try {
    const decode = verify(token, process.env.JWT_SECRET) as JwtPayload;
    res.locals.user = {
      _id: decode._id as string,
      username: decode.username as string,
    };

    // 토큰의 남은 유효 기간이 3.5일 미만이면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (decode.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decode._id);
      const token = user.generateToken();
      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }

    return next();
  } catch (error) {
    return next();
  }
};

export default jwtMiddleware;
