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
// const express = require('express');
var express_1 = __importDefault(require("express"));
var post_1 = require("./models/post");
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var node_schedule_1 = require("node-schedule");
var key_1 = __importDefault(require("./config/key"));
var jwtMiddleware_1 = __importDefault(require("./lib/jwtMiddleware"));
var user_1 = __importDefault(require("./routes/user"));
var post_2 = __importDefault(require("./routes/post"));
dotenv_1.default.config({ path: 'back/.env' });
var PORT = process.env.PORT;
mongoose_1.default
    .connect(key_1.default, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(function () {
    console.log('Connected to MongoDB');
})
    .catch(function (e) {
    console.error(e);
});
var app = express_1.default();
app.use(cors_1.default({
    origin: true,
    credentials: true,
}));
app.use('/', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use(jwtMiddleware_1.default);
var job = node_schedule_1.scheduleJob('0 0 * * *', function () {
    return __awaiter(this, void 0, void 0, function () {
        var randomArtist, artitst, result;
        return __generator(this, function (_a) {
            randomArtist = [
                '아이유',
                '이적',
                '장범준',
                '10cm',
                'bts',
                '김광석',
                '쏜애플',
            ];
            artitst = randomArtist[Math.floor(Math.random() * randomArtist.length)];
            result = child_process_1.spawn('python', ['back/python/craw.py', artitst, '']);
            // 3. stdout의 'data'이벤트리스너로 실행결과를 받는다.
            result.stdout.on('data', function (data) {
                var _this = this;
                var textChunk = data.toString();
                var obj = JSON.parse(textChunk);
                try {
                    if (obj) {
                        obj.forEach(function (craw) { return __awaiter(_this, void 0, void 0, function () {
                            var post;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, post_1.Post.remove({})];
                                    case 1:
                                        _a.sent();
                                        post = new post_1.Post({
                                            title: craw.title,
                                            link: craw.link,
                                            youtuber: craw.youtuber,
                                            thumbnail: craw.thumbnail,
                                            key: craw.key,
                                            youtuberImage: craw.youtuberImage,
                                        });
                                        return [4 /*yield*/, post.save()];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        console.log('저장 완료');
                    }
                }
                catch (error) {
                    console.error(error);
                }
            });
            // 4. 에러 발생 시, stderr의 'data'이벤트리스너로 실행결과를 받는다.
            result.stderr.on('data', function (data) {
                console.log(data.toString());
            });
            return [2 /*return*/];
        });
    });
});
// app.get('/', (req, res) => res.send('Hello world!!!'));
app.use('/user', user_1.default);
app.use('/post', post_2.default);
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    // All the javascript and css files will be read and served from this folder
    app.use(express_1.default.static('front/build'));
    // index.html for all page routes    html or routing and naviagtion
    app.get('*', function (req, res) {
        res.sendFile(path_1.default.resolve(__dirname, '../front', 'build', 'index.html'));
    });
}
var port = Number(PORT) || 4000;
app.listen(port, function () { return console.log("listening on port " + port); });
