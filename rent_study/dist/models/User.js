"use strict";
// src/models/User.ts
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
class User {
    constructor(db, user) {
        this.db = db;
        this.user = user;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.query("SELECT * FROM users");
            return result;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.query("SELECT * FROM users WHERE id = ?", [id]);
            if (result.length > 0) {
                return result[0];
            }
            return null;
        });
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.query("INSERT INTO users SET ?", [this.user]);
            return result.insertId;
        });
    }
    update(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.query("UPDATE users SET ? WHERE id = ?", [user, (_a = this.user) === null || _a === void 0 ? void 0 : _a.id]);
        });
    }
    delete() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.query("DELETE FROM users WHERE id = ?", [(_a = this.user) === null || _a === void 0 ? void 0 : _a.id]);
        });
    }
    getByIdAndPassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.query("SELECT * FROM users WHERE id = ? AND password = ?", [id, password]);
            if (result.length > 0) {
                return result[0];
            }
            return null;
        });
    }
}
exports.default = User;
