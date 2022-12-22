import { CategoryModel, Category } from "../productsCategoryModel";
import Client from "../../database";
import app from "../..";
import supertest from "supertest";
import { UsersModel } from "../usersModel";

const req = supertest(app);
const categoryModel = new CategoryModel();
const userModel = new UsersModel();
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJOYWRlciIsImxhc3RuYW1lIjoiU2F5ZWQiLCJsb2dpbm5hbWUiOiJhZG1pbjEifSwiaWF0IjoxNjcxNjEwODMxfQ.s_jpv6lvD9O5tlWym3PzaFVvRLWuNCKpY7rD-otmt3Q";

const category: Category = {
  categoryname: "wooden",
};

describe("Products Categories Model defination", () => {
  describe("Products Categories Model functions defination", () => {
    it("should have fetchAll", () => {
      expect(categoryModel.fetchAllCategories).toBeDefined();
    });
    it("should have fetch by id", () => {
      expect(categoryModel.getCategoriesById).toBeDefined();
    });
    it("should have create", () => {
      expect(categoryModel.createCategory).toBeDefined();
    });
    it("should have delete", () => {
      expect(categoryModel.deleteCategory).toBeDefined();
    });
    it("should have update", () => {
      expect(categoryModel.updateCategory).toBeDefined();
    });
  });
  beforeAll(async () => {
    await categoryModel.createCategory(category);
    await userModel.createUser({
      firstname: "Nader",
      lastName: "Sayed",
      loginName: "admin",
      password: "Pass123$",
    });
  });
  describe("Products Categories Model Actions", () => {
    it("Fetch all Products", async () => {
      const Categories = await categoryModel.fetchAllCategories();
      expect(Categories.length).toBeGreaterThanOrEqual(1);
    });
    it("Fetch by id", async () => {
      const Category = await categoryModel.getCategoriesById("1");
      expect(Category.categoryname).toEqual("wooden");
    });
    it("Category product", async () => {
      const data: [] = [{ categoryname: "metal" }] as unknown as [];
      const updatedCategory = await categoryModel.updateCategory("1", data);
      expect(updatedCategory).toEqual("Category Updated");
    });

    it("Category deletion", async () => {
      await categoryModel.createCategory(category);
      const deletedCategory = await categoryModel.deleteCategory("2");
      expect(deletedCategory).toEqual("Category Deleted");
    });
  });

  describe("Products Categories Routes", () => {
    it("Get all Categories endpoint", async () => {
      const res = await req
        .get("/products/categories")
        .set("Authorization", `bearer ${token}`);
      expect(res.status).toBe(200);
    });
    it("Get Category by id route ", async () => {
      const res = await req
        .get("/products/categories/1")
        .set("Authorization", `bearer ${token}`);
      expect(res.status).toBe(200);
    });
    it("Create categories route", async () => {
      const newCategory: Category = {
        categoryname: "metal",
      };
      const res = await req
        .post("/products/categories")
        .send(newCategory)
        .set("Authorization", `bearer ${token}`);
      expect(res.status).toBe(201);
    });
    it("update categories route ", async () => {
      const res = await req
        .put("/products/categories/1")
        .send([{ categoryName: "Metal" }])
        .set("Authorization", `bearer ${token}`);
      expect(res.status).toBe(200);
    });
    it("delete categories route", async () => {
      const res = await req
        .delete("/products/categories/3")
        .set("Authorization", `bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });

  afterAll(async () => {
    const con = await Client.connect();
    const sql =
      "DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;" +
      "\n DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;" +
      "\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;" +
      "\n DELETE FROM products_categories;\n ALTER SEQUENCE products_categories_id_seq RESTART WITH 1;" +
      "\n DELETE FROM products_orders;\n ALTER SEQUENCE products_orders_id_seq RESTART WITH 1;";
    await con.query(sql);
    con.release();
  });
});
