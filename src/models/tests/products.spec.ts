import { ProductModel, Product } from "../productsModel";
import { CategoryModel, Category } from "../productsCategoryModel";
import Client from "../../database";
import app from "../..";
import supertest from "supertest";
import { UsersModel } from "../usersModel";
const req = supertest(app);

const productModel = new ProductModel;
const categoryModel = new CategoryModel;
const userModel = new UsersModel;


const product: Product = {
    productname: "chair",
    productprice: 5,
    category_id: 1
};

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJOYWRlciIsImxhc3RuYW1lIjoiU2F5ZWQiLCJsb2dpbm5hbWUiOiJhZG1pbjEifSwiaWF0IjoxNjcxNjEwODMxfQ.s_jpv6lvD9O5tlWym3PzaFVvRLWuNCKpY7rD-otmt3Q"

describe("Products Model defination", () => {
    describe("Products Model functions defination", () => {
        it("should have fetchAll", () => {
            expect(productModel.fetchAllProducts).toBeDefined();
        });
        it("should have fetch by id", () => {
            expect(productModel.getProductsById).toBeDefined();
        });
        it("should have create", () => {
            expect(productModel.createProduct).toBeDefined();
        });
        it("should have delete", () => {
            expect(productModel.deleteProduct).toBeDefined();
        });
        it("should have update", () => {
            expect(productModel.updateProduct).toBeDefined();
        });
    });
    beforeAll(async () => {
        await categoryModel.createCategory({ categoryname: "wooden" });
        await productModel.createProduct(product);
        await userModel.createUser({
            firstname: "Nader",
            lastName: "Sayed",
            loginName: "admin",
            password: "Pass123$",
        });
    });
    describe("Products Model Action", () => {

        it("Fetch all Products", async () => {
            const products = await productModel.fetchAllProducts();
            expect(products.length).toBeGreaterThanOrEqual(1);
        });
        it("Fetch by id", async () => {
            const product = await productModel.getProductsById('1');
            expect(product.productname).toEqual('chair');
        })
        it('update product', async () => {
            const data: [] = [{ "productname": "bed" }] as unknown as []
            const updatedProdcut = await productModel.updateProduct('1', data);
            expect(updatedProdcut).toEqual('Product Updated');
        })
        it('product deletion', async () => {
            await productModel.createProduct(product);
            const deletedProduct = await productModel.deleteProduct('2');
            expect(deletedProduct).toEqual("Product Deleted");
        })
    });
    describe("Products Routes", () => {
        it("Get all products endpoint", async () => {
            const res = await req.get("/products").set("Authorization", `bearer ${token}`);
            expect(res.status).toBe(200);
        });
        it("Get product by id route ", async () => {
            const res = await req.get("/products/1").set("Authorization", `bearer ${token}`);
            expect(res.status).toBe(200);
        });
        it("Create products route", async () => {


            const newProduct = {
                productname: "chair",
                productprice: 5,
                category_id: 1,
            }

            const res = await req.post("/products").send(newProduct).set("Authorization", `bearer ${token}`);
            expect(res.status).toBe(201);
        });
        it("update product route ", async () => {
            const res = await req.put("/products/1").send([{ "productName": "bed" }]).set("Authorization", `bearer ${token}`);
            expect(res.status).toBe(200);
        });
        it("delete product route", async () => {
            const res = await req.delete("/products/3").set("Authorization", `bearer ${token}`);
            expect(res.status).toBe(200);
        });
    })

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
