import Client from "../database";
import dotenv from 'dotenv';
import * as helpers from '../middlewares/helperFunction'


dotenv.config();

export type Product = {
    id?: Number,
    productName: String,
    productPrice: Number,
    category_id: Number,
}

export class ProductModel {
    async fetchAllProducts(): Promise<Product[]> {
        try {
            const con = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (err) {
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

    async createProduct(creationInput: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (productname, productprice,category_id) VALUES($1,$2,$3) RETURNING *'

            const conn = await Client.connect()
            const result = await conn.query(sql, [creationInput.productName, creationInput.productPrice, creationInput.category_id])
            const product = result.rows[0];
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not add new Product ${creationInput.productName}. Error: ${err}`)
        }
    }

    async updateProduct(id: String, data: []): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = helpers.generteUpdateQuerey(data, 'products', id);
            const result = await conn.query(sql);
            const product = result.rows[0];
            conn.release();
            return product;
        } catch (err) {
            if (data.length == 0) {
                throw new Error(`Updates can't be empty`)
            } else {
                throw new Error(`Could not update Product of id=${id}. Error: ${err}`)
            }

        }
    }
    async deleteProduct(id: string): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE FROM products WHERE id=($1)'
            const result = await conn.query(sql, [id])
            const product = result.rows[0];
            conn.release();
            return product
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }

}