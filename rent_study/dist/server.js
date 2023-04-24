"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dbConnection_1 = __importDefault(require("./database/dbConnection"));
const port = process.env.PORT || 3000;
const db = new dbConnection_1.default();
const app = (0, app_1.default)(db);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
