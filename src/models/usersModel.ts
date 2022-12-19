import Client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import * as helpers from '../middlewares/helperFunction'

dotenv.config();

const prepper: string = process.env.BCRYPT_PASSWORD as string;


export type User = {
    id?: Number,
    firstName: String,
    lastName: String,
    loginName: String,
    password: string
}

export class UsersModel {
    async fetchAllUsers(): Promise<User[]> {
        try {
            const con = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Can't Fetch Users: ${err}`)
        }
    }

    async getUserById(id: String): Promise<User> {
        try {
            const con = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await con.query(sql, [id]);
            con.release();
            if (result.rowCount > 0) {
                return result.rows[0];
            } else {
                throw new Error()
            }
        } catch (err) {
            throw new Error(`Can't find User:${id} ${err}`)
        }
    }

    async createUser(creationInput: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (firstname, lastname,loginname,password) VALUES($1,$2,$3,$4) RETURNING *'
            const hashedPassword = helpers.hashingPass(creationInput.password)

            const conn = await Client.connect()
            const result = await conn.query(sql, [creationInput.firstName, creationInput.lastName, creationInput.loginName, hashedPassword])
            const user = result.rows[0];
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not add new user ${creationInput.loginName}. Error: ${err}`)
        }
    }

    async updateUser(id: String, data: []): Promise<User> {

        try {
            const conn = await Client.connect();
            const sql = helpers.generteUpdateQuerey(data, 'users', id);
            const result = await conn.query(sql);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            if (data.length == 0) {
                throw new Error(`Updates can't be empty`)
            } else {
                throw new Error(`Could not update User of id=${id}. Error: ${err}`)
            }

        }
    }

    async deleteUser(id: string): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

    async auth(loginName: String, inputPass: String): Promise<User | null> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM users WHERE loginname=($1)';
        const result = await conn.query(sql, [loginName])
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt.compareSync(inputPass + prepper, user.password)) {
                return user;
            }
        }
        return null;
    }

    async updatePassword(password: string, id: string): Promise<void> {
        const hashedPassword = helpers.hashingPass(password)

        try {
            const conn = await Client.connect();
            const sql = 'UPDATE users SET password=($1) where id=($2)';
            const result = await conn.query(sql, [hashedPassword, id])
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(`Can't update password Error: ${err}`)
        }
    }

}