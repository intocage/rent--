// src/models/User.ts

import { IDatabaseConnection } from "../database/IDatabaseConnection";
import { IUser } from "./Interface/IUser";

class User {
  private db: IDatabaseConnection;
  private user?: IUser;

  constructor(db: IDatabaseConnection, user?: IUser) {
    this.db = db;
    this.user = user;
  }

  async getAll(): Promise<IUser[]> {
    const result = await this.db.query<IUser[]>("SELECT * FROM users");
    return result;
  }

  async getById(id: string): Promise<IUser | null> {
    const result = await this.db.query<IUser[]>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    if (result.length > 0) {
      return result[0];
    }
    return null;
  }

  async create(): Promise<number> {
    const result = await this.db.query("INSERT INTO users SET ?", [this.user]);
    return result.insertId;
  }

  async update(user: Omit<IUser, "id">): Promise<void> {
    await this.db.query("UPDATE users SET ? WHERE id = ?", [user, this.user?.user_id]);
  }

  async delete(): Promise<void> {
    await this.db.query("DELETE FROM users WHERE id = ?", [this.user?.user_id]);
  }

  async getByIdAndPassword(
    id: string,
    password: string
  ): Promise<IUser | null> {
    const result = await this.db.query<IUser[]>(
      "SELECT * FROM users WHERE id = ? AND password = ?",
      [id, password]
    );
    if (result.length > 0) {
      return result[0];
    }
    return null;
  }
}

export default User;