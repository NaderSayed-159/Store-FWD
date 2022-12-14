import Client from "../database";
import dotenv from 'dotenv';

dotenv.config();

export type Product = {
    id?: Number,
    productName: String,
    productPrice: Number,
    category_id: String,
}

export class ProductModel {
    async fetchAllProducts(): Promise<Product[]> {
        try {
            const con = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await con.query(sql);
            con.release();
            return result.rows;
        }catch(err){
            throw new Error(`Can't Fetch Products: ${err}`)
        }

    }
    
    async getProductsById(id: String): Promise<Product> {
        try {
            const con = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await con.query(sql, [id]);
            con.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can't find Products:${id} ${err}`)
        }
    }

    async createUser(creationInput: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (productname, productprice,category_id) VALUES($1,$2,$3) RETURNING *'

            const conn = await Client.connect()
            const result = await conn.query(sql, [creationInput.productName, creationInput.productPrice, creationInput.category_id])
            const user = result.rows[0];
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not add new user ${creationInput.productName}. Error: ${err}`)
        }
    }





}