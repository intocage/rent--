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
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
const dbConfig_1 = require("./dbConfig");
class DatabaseConnection {
    constructor() {
        this.pool = (0, promise_1.createPool)(dbConfig_1.dbConfig);
        console.log('Connection pool created');
    }
    query(sql, values) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.pool.query(sql, values);
            return result;
        });
    }
}
exports.default = DatabaseConnection;
