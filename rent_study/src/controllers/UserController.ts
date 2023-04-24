// src/controllers/UserController.ts

import { Request, Response } from "express";
import { IDatabaseConnection } from "../database/IDatabaseConnection";
import User from "../models/User";
import { IUser } from "../models/Interface/IUser";

class UserController {
  private db: IDatabaseConnection;

  constructor(db: IDatabaseConnection) {
    this.db = db;
  }

  public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const user = new User(this.db);
    try {
      const users = await user.getAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error getting all users:", error);
      res.status(500).json({ message: "Error getting all users" });
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = new User(this.db);

    try {
      const userData = await user.getById(id);
      if (userData) {
        res.status(200).json(userData);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error getting user by id:", error);
      res.status(500).json({ message: "Error getting user by id" });
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    const user: IUser = req.body;
    const userModel = new User(this.db, user);

    try {
      const userId = await userModel.create();
      res.status(201).json({ message: "User created", id: userId });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user: IUser = req.body;
    user.id = id;
    const userModel = new User(this.db, user);

    try {
      await userModel.update(user);
      res.status(200).json({ message: "User updated" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user" });
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userModel = new User(this.db, { id } as IUser);

    try {
      await userModel.delete();
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user" });
    }
  };

  public loginUser = async (req: Request, res: Response): Promise<void> => {
    const { id, password } = req.body;
    const userModel = new User(this.db, { id, password } as IUser);

    try {
      const userData = await userModel.getByIdAndPassword(id, password);
      if (userData) {
        res.status(200).json(userData);
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Error logging in user" });
    }
  };
}

export default UserController;
