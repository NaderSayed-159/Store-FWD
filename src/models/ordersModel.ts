import Client from "../database";
import dotenv from 'dotenv';
import * as helpers from '../middlewares/helperFunction'


dotenv.config();

export type Order = {
    id?: Number,
    productsoforder: String,
    quantitiesofproducts: String,
    user_id: Number,
    status: String
}

export class OrderModel {
    async fetchAllOrders(): Promise<Order[]> {
        try {
            const con = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Can't Fetch Orders: ${err}`)
        }

    }

    async getOrderById(id: String): Promise<Order> {
        try {
            const con = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await con.query(sql, [id]);
            con.release();
            if (result.rowCount > 0) {
                return result.rows[0];
            } else {
                throw new Error()
            }
        } catch (err) {
            throw new Error(`Can't find Orders:${id} ${err}`)
        }
    }

    async AcitveOrderOfUser(user_id: string) {
        try {
            const con = await Client.connect();
            const sql = `SELECT * FROM orders WHERE user_id=($1) AND status='active'`;
            const result = await con.query(sql, [user_id]);
            con.release();
            if (result.rowCount > 0) {
                return result.rows[0];
            } else {
                return 'zero'
            }
        } catch (err) {
            throw new Error(`can't get the record Error:${err}`)
        }
    }

    async createOrder(creationInput: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (productsoforder, quantitiesofproducts,user_id,status) VALUES($1,$2,$3,$4) RETURNING *'

            const conn = await Client.connect()
            const result = await conn.query(sql, [creationInput.productsoforder, creationInput.quantitiesofproducts, creationInput.user_id, creationInput.status])
            const user = result.rows[0];
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not add new Order. Error: ${err}`)
        }
    }

    async updateOrder(id: String, data: []): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = helpers.generteUpdateQuerey(data, 'orders', id);
            const result = await conn.query(sql);
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            if (data.length == 0) {
                throw new Error(`Updates can't be empty`)
            } else {
                throw new Error(`Could not update Order of id=${id}. Error: ${err}`)
            }

        }
    }

    async deleteOrder(id: string): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const result = await conn.query(sql, [id])
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }

    async getOrdersOfUser(userId: String): Promise<Order[]> {
        try {
            const con = await Client.connect();
            const sql = 'SELECT * FROM products WHERE user_id=($1)';
            const result = await con.query(sql, [userId]);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Can't Fetch Orders of User ${userId}: ${err}`)

        }
    }

}