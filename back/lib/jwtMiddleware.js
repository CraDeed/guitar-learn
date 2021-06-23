const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(); // 토큰 없음
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = {
      _id: decode._id,
      username: decode.username,
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

module.exports = jwtMiddleware;
