"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var cloudinary_1 = require("cloudinary");
var multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
var dotenv_1 = __importDefault(require("dotenv"));
var user_1 = require("../models/user");
dotenv_1.default.config({ path: 'back/.env' });
var router = express_1.Router();
try {
    fs_1.default.accessSync('back/uploads');
}
catch (error) {
    console.log('uploads 폴더가 없으므로 생성합니다');
    fs_1.default.mkdirSync('back/uploads');
}
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
var storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: function (req, file) { return __awaiter(void 0, void 0, void 0, function () {
        var ext;
        return __generator(this, function (_a) {
            ext = path_1.default.extname(file.originalname);
            return [2 /*return*/, {
                    folder: 'userImage',
                    allowed_formats: ['jpeg', 'jpg', 'png'],
                    public_id: Date.now() + "_" + path_1.default.basename(file.originalname, ext),
                }];
        });
    }); },
});
var upload = multer_1.default({
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
router.post('/image', upload.single('image'), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                username = req.body.username;
                return [4 /*yield*/, user_1.User.findOne({
                        username: username,
                    })];
            case 1:
                user = _a.sent();
                user.image = req.file.path;
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                res.json(req.file.path);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/register', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, exUser, user, data, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, user_1.User.findOne({
                        username: username,
                    })];
            case 1:
                exUser = _b.sent();
                if (exUser) {
                    return [2 /*return*/, res.status(403).send('이미 사용중인 아이디입니다.')];
                }
                user = new user_1.User({
                    username: username,
                });
                // TODO: 비밀번호 만드는 함수 넣기
                return [4 /*yield*/, user.setPassword(password)];
            case 2:
                // TODO: 비밀번호 만드는 함수 넣기
                _b.sent();
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                data = user.toJSON();
                delete data.hashedPassword;
                token = user.generateToken();
                res
                    .cookie('access_token', token, {
                    maxAge: 100 * 60 * 60 * 24 * 7,
                    httpOnly: true,
                })
                    .status(200)
                    .json(data);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.error(error_2);
                next(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/login', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, valid, data, token, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_1.User.findOne({
                        username: username,
                    })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).json('아이디와 비밀번호를 확인하세요!')];
                }
                return [4 /*yield*/, user.checkPassword(password)];
            case 3:
                valid = _b.sent();
                if (!valid) {
                    return [2 /*return*/, res.status(401).json('아이디와 비밀번호를 확인하세요!')];
                }
                data = user.toJSON();
                delete data.hashedPassword;
                token = user.generateToken();
                res
                    .cookie('access_token', token, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    httpOnly: true,
                })
                    .status(200)
                    .json(data);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                console.error(error_3);
                next(error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get('/logout', function (req, res) {
    res.clearCookie('access_token').status(204).send();
});
router.post('/check', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user, data, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                username = req.body.username;
                return [4 /*yield*/, user_1.User.findOne({ username: username })];
            case 1:
                user = _a.sent();
                if (!user) {
                    // 로그인 중 아님
                    return [2 /*return*/, res.status(401).send()];
                }
                data = user.toJSON();
                delete data.hashedPassword;
                res.status(200).send(data);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.patch('/update/profile', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, profileData, user, data, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, username = _a.username, profileData = _a.profileData;
                return [4 /*yield*/, user_1.User.findOne({
                        username: username,
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    // 로그인 중 아님
                    return [2 /*return*/, res.status(401).send()];
                }
                user.introduction = profileData.introduction;
                user.guitarSkill = profileData.guitarSkill;
                return [4 /*yield*/, user.save()];
            case 2:
                _b.sent();
                data = user.toJSON();
                delete data.hashedPassword;
                res.status(200).send(data);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                console.error(error_5);
                next(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/playlist/:postKey', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, post_1, user, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, userId = _a.userId, post_1 = _a.post;
                return [4 /*yield*/, user_1.User.findOne({
                        _id: userId,
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(403).send('아이디를 찾을 수 없습니다')];
                }
                if (!post_1) {
                    return [2 /*return*/, res.status(403).send('영상을 찾을 수 없습니다')];
                }
                user.post.forEach(function (play) {
                    if (play.key === post_1.key) {
                        return res.status(403).send('이미 추가한 영상입니다.');
                    }
                });
                user.post.push(post_1);
                return [4 /*yield*/, user.save()];
            case 2:
                _b.sent();
                res.status(200).send(user.post);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                console.error(error_6);
                next(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.delete('/unplaylist/:postKey', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, postKey, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, userId = _a.userId, postKey = _a.postKey;
                return [4 /*yield*/, user_1.User.updateOne({
                        _id: userId,
                    }, {
                        $pull: {
                            post: {
                                key: postKey,
                            },
                        },
                    })];
            case 1:
                _b.sent();
                res.status(203).send({ postKey: req.params.postKey });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _b.sent();
                console.error(error_7);
                next(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
