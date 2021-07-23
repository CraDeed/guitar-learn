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
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var user_1 = require("../models/user");
var jwtMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decode, now, user, token_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.cookies.access_token;
                if (!token)
                    return [2 /*return*/, next()]; // 토큰 없음
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                decode = jsonwebtoken_1.verify(token, process.env.JWT_SECRET);
                res.locals.user = {
                    _id: decode._id,
                    username: decode.username,
                };
                now = Math.floor(Date.now() / 1000);
                if (!(decode.exp - now < 60 * 60 * 24 * 3.5)) return [3 /*break*/, 3];
                return [4 /*yield*/, user_1.User.findById(decode._id)];
            case 2:
                user = _a.sent();
                token_1 = user.generateToken();
                res.cookie('access_token', token_1, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    httpOnly: true,
                });
                _a.label = 3;
            case 3: return [2 /*return*/, next()];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, next()];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.default = jwtMiddleware;
