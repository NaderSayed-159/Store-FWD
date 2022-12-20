import { ProductModel, Product } from "../productsModel";
import { CategoryModel, Category } from "../productsCategoryModel";
import Client from "../../database";
const productModel = new ProductModel();
const categoryModel = new CategoryModel();


const product: Product = {
    productname: "chair",
    productprice: 5,
    category_id: 1
};

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
    describe("Products Model endpoints", () => {
        //test endpoint using jasmine using supertest?
        beforeAll(async () => {
            await categoryModel.createCategory({categoryName:"wooden"});
            await productModel.createProduct(product);
        });
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
            const deletedUser = await productModel.deleteProduct('2');
            expect(deletedUser).toEqual("Product Deleted");
        })

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
