import Client from "../database";
import dotenv from "dotenv";
import * as helpers from "../services/helperFunction";

dotenv.config();

export type Category = {
  id?: Number;
  categoryname: String;
};

export class CategoryModel {
  async fetchAllCategories(): Promise<Category[]> {
    try {
      const con = await Client.connect();
      const sql = "SELECT * FROM products_categories";
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't Fetch Categories: ${err}`);
    }
  }

  async getCategoriesById(id: String): Promise<Category> {
    try {
      const con = await Client.connect();
      const sql = "SELECT * FROM products_categories WHERE id=($1)";
      const result = await con.query(sql, [id]);
      con.release();
      if (result.rowCount > 0) {
        return result.rows[0];
      } else {
        throw new Error();
      }
    } catch (err) {
      throw new Error(`Can't find Categories:${id} ${err}`);
    }
  }

  async createCategory(creationInput: Category): Promise<Category> {
    try {
      const sql =
        "INSERT INTO products_categories (categoryname) VALUES($1) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [creationInput.categoryname]);
      const category = result.rows[0];
      conn.release();
      return category;
    } catch (err) {
      throw new Error(
        `Could not add new Category ${creationInput.categoryname}. Error: ${err}`
      );
    }
  }

  async updateCategory(id: String, data: []): Promise<string> {
    try {
      const conn = await Client.connect();
      const sql = helpers.generteUpdateQuerey(data, "products_categories", id);
      const result = await conn.query(sql);
      const category = result.rows[0];
      conn.release();
      return "Category Updated";
    } catch (err) {
      if (data.length == 0) {
        throw new Error(`Updates can't be empty`);
      } else {
        throw new Error(`Could not update Category of id=${id}`);
      }
    }
  }

  async deleteCategory(id: string): Promise<string> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM products_categories WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      const category = result.rows[0];
      conn.release();
      return "Category Deleted";
    } catch (err) {
      throw new Error(`Could not delete Category ${id}. Error: ${err}`);
    }
  }
}
