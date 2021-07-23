"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prod_1 = require("./prod");
var dev_1 = require("./dev");
var mongoURI;
if (process.env.NODE_ENV === 'production') {
    mongoURI = prod_1.mongoURI;
}
else {
    mongoURI = dev_1.mongoURI;
}
exports.default = mongoURI;
