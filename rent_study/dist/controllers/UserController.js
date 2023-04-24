"use strict";
// src/controllers/UserController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class UserController {
    constructor(db) {
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.default(this.db);
            try {
                const users = yield user.getAll();
                res.status(200).json(users);
            }
            catch (error) {
                console.error("Error getting all users:", error);
                res.status(500).json({ message: "Error getting all users" });
            }
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = new User_1.default(this.db);
            try {
                const userData = yield user.getById(id);
                if (userData) {
                    res.status(200).json(userData);
                }
                else {
                    res.status(404).json({ message: "User not found" });
                }
            }
            catch (error) {
                console.error("Error getting user by id:", error);
                res.status(500).json({ message: "Error getting user by id" });
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const userModel = new User_1.default(this.db, user);
            try {
                const userId = yield userModel.create();
                res.status(201).json({ message: "User created", id: userId });
            }
            catch (error) {
                console.error("Error creating user:", error);
                res.status(500).json({ message: "Error creating user" });
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = req.body;
            user.id = id;
            const userModel = new User_1.default(this.db, user);
            try {
                yield userModel.update(user);
                res.status(200).json({ message: "User updated" });
            }
            catch (error) {
                console.error("Error updating user:", error);
                res.status(500).json({ message: "Error updating user" });
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userModel = new User_1.default(this.db, { id });
            try {
                yield userModel.delete();
                res.status(200).json({ message: "User deleted" });
            }
            catch (error) {
                console.error("Error deleting user:", error);
                res.status(500).json({ message: "Error deleting user" });
            }
        });
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, password } = req.body;
            const userModel = new User_1.default(this.db, { id, password });
            try {
                const userData = yield userModel.getByIdAndPassword(id, password);
                if (userData) {
                    res.status(200).json(userData);
                }
                else {
                    res.status(401).json({ message: "Invalid username or password" });
                }
            }
            catch (error) {
                console.error("Error logging in user:", error);
                res.status(500).json({ message: "Error logging in user" });
            }
        });
        this.db = db;
    }
}
exports.default = UserController;
