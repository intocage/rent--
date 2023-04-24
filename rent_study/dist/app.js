"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const createApp = (db) => {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use('/users', (0, UserRoute_1.default)(db));
    return app;
};
exports.default = createApp;
