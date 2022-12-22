import Client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as helpers from "../services/helperFunction";

dotenv.config();

const prepper = process.env.BCRYPT_PASSWORD as string;

export type User = {
  id?: Number;
  firstname: String;
  lastName: String;
  loginName: String;
  password: string;
};

export class UsersModel {
  async fetchAllUsers(): Promise<User[]> {
    try {
      const con = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't Fetch Users: ${err}`);
    }
  }

  async getUserById(id: String): Promise<User> {
    try {
      const con = await Client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await con.query(sql, [id]);
      con.release();
      if (result.rowCount > 0) {
        return result.rows[0];
      } else {
        throw new Error();
      }
    } catch (err) {
      throw new Error(`Can't find User:${id} ${err}`);
    }
  }

  async createUser(creationInput: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (firstname, lastname,loginname,password) VALUES($1,$2,$3,$4) RETURNING *";
      const hashedPassword = helpers.hashingPass(creationInput.password);

      const conn = await Client.connect();
      const result = await conn.query(sql, [
        creationInput.firstname,
        creationInput.lastName,
        creationInput.loginName,
        hashedPassword,
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(
        `Could not add new user ${creationInput.loginName}. Error: ${err}`
      );
    }
  }

  async updateUser(id: String, data: []): Promise<string> {
    try {
      const conn = await Client.connect();
      const sql = helpers.generteUpdateQuerey(data, "users", id);
      const result = await conn.query(sql);
      const user = result.rows[0];
      conn.release();
      return "User Updated";
    } catch (err) {
      if (data.length == 0) {
        throw new Error(`Updates can't be empty`);
      } else {
        throw new Error(`Could not update User of id=${id}. Error: ${err}`);
      }
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return "User Deleted";
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async auth(loginName: String, inputPass: String): Promise<User | null> {
    const conn = await Client.connect();
    const sql = "SELECT password FROM users WHERE loginname=($1)";
    const result = await conn.query(sql, [loginName]);
    if (result.rows.length) {
      const hashed = result.rows[0];
      if (bcrypt.compareSync(`${inputPass}${prepper}`, hashed.password)) {
        const sql2 =
          "SELECT id ,firstname , lastname , loginname FROM users WHERE loginname=($1)";
        const result2 = await conn.query(sql2, [loginName]);
        return result2.rows[0];
      }
    }
    return null;
  }

  async updatePassword(password: string, id: string): Promise<string> {
    const hashedPassword = helpers.hashingPass(password);

    try {
      const conn = await Client.connect();
      const sql = "UPDATE users SET password=($1) where id=($2)";
      const result = await conn.query(sql, [hashedPassword, id]);
      const user = result.rows[0];
      conn.release();
      return "Password Updated";
    } catch (err) {
      throw new Error(`Can't update password Error: ${err}`);
    }
  }
}
