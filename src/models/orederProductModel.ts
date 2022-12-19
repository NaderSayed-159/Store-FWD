import Client from "../database";
import dotenv from 'dotenv';


dotenv.config();

export type AddedProduct = {
    id?: Number,
    order_id?: Number,
    product_id: Number,
    quantity: Number,
}

export class OrderProductModel {

    async fetchAllProductsbyOrder(orderId: String): Promise<AddedProduct[]> {
        try {
            const con = await Client.connect();
            const sql = `SELECT * FROM products_orders WHERE order_id=($1)`;
            const result = await con.query(sql, [orderId]);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Can't Fetch data: ${err}`)
        }
    }

    async addProductToCart(additionInput: AddedProduct): Promise<AddedProduct> {
        try {
            const sql = 'INSERT INTO products_orders (order_id, product_id,quantity) VALUES($1,$2,$3) RETURNING *'
            const conn = await Client.connect()
            const result = await conn.query(sql, [additionInput.order_id, additionInput.product_id, additionInput.quantity])
            const user = result.rows[0];
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not add record Error: ${err}`)
        }
    }

    async AcitveOrderOfUser(user_id: string) {
        try {
            const con = await Client.connect();
            const sql = `SELECT * FROM orders WHERE user_id=($1) AND status='active'`;
            const result = await con.query(sql, [user_id]);
            con.release();
            if (result.rowCount > 0) {
                return {
                    'status': 'active',
                    'rows': result.rows[0]
                };
            } else {
                return {
                    'status': 'no-active',
                };
            }
        } catch (err) {
            throw new Error(`can't get the record Error:${err}`)
        }
    }

    async checkProductInCart(order_id: string, product_id: string) {
        try {
            const con = await Client.connect();
            const sql = 'SELECT * FROM products_orders WHERE order_id=($1) AND product_id=($2)';
            const result = await con.query(sql, [order_id, product_id]);
            if (result.rowCount > 0) {
                return {
                    "status": "contain",
                    rows: result.rows[0]
                }
            } else {
                return {
                    "status": "not",
                }
            }
        } catch (err) {
            throw new Error(`${err}`)
        }
    }

    async updateCartProduct(quantity: number, order_id: string, product_id: string) {
        try {
            const con = await Client.connect();
            const sql = 'UPDATE products_orders SET quantity=($1) WHERE order_id=($2) AND product_id=($3)';
            const result = await con.query(sql, [quantity, order_id, product_id]);
            return result.rows[0]
        } catch (err) {
            throw new Error(`${err}`)
        }
    }

    async deleteCartProduct(order_id: string, product_id: string) {
        try {
            const con = await Client.connect();
            const sql = 'DELETE FROM products_orders WHERE order_id=($1) AND product_id=($2)';
            const result = await con.query(sql, [order_id, product_id]);
            return result.rows[0]
        } catch (err) {
            throw new Error(`${err}`)
        }
    }


}