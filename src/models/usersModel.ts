import Client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prepper: string = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;


export type User = {
    id?: Number,
    firstName: String,
    lastName: String,
    loginName: String,
    password: String
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
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can't find User:${id} ${err}`)
        }
    }

    async createUser(creationInput: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (firstName, lastName,loginname,password) VALUES($1,$2,$3,$4) RETURNING *'
            const hashedPassword = bcrypt.hashSync(
                creationInput.password + prepper as string,
                parseInt(saltRounds)
            )
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [creationInput.firstName, creationInput.lastName, creationInput.loginName, hashedPassword])
            const user = result.rows[0];
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not add new user ${creationInput.loginName}. Error: ${err}`)
        }
    }

    private generteUpdateQuerey = (data: [], table: string, id: String) => {
        let updateQuerey: string = `UPDATE ${table} SET `;
        data.forEach((el, index) => {

            if (data.length < 2 && data.length > 0) {
                for (const [key, value] of Object.entries(el)) {
                    if (typeof value == 'string') {
                        updateQuerey += `${key}='${value}' `
                    } else {
                        updateQuerey += `${key}=${value} `
                    }
                }
            } else if (data.length > 1) {
                if (index != data.length - 1) {
                    for (const [key, value] of Object.entries(el)) {
                        if (typeof value == 'string') {
                            updateQuerey += `${key}='${value}', `
                        } else {
                            updateQuerey += `${key}=${value}, `
                        }
                    }
                } else {
                    for (const [key, value] of Object.entries(el)) {
                        if (typeof value == 'string') {
                            updateQuerey += `${key}='${value}' `
                        } else {
                            updateQuerey += `${key}=${value} `
                        }
                    }
                }
            }
        })
        updateQuerey += `WHERE id=${id}`;
        return updateQuerey;
    }

    async updateUser(id: String, data: []): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = this.generteUpdateQuerey(data, 'users', id);
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

}