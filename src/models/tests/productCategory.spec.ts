import { CategoryModel, Category } from "../productsCategoryModel";
import Client from "../../database";
const categoryModel = new CategoryModel();


const category: Category = {
    categoryname:"wooden"
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

    describe("Products Categories Model endpoints", () => {
        beforeAll(async () => {
            await categoryModel.createCategory(category);
        });
        it("Fetch all Products", async () => {
            const Categories = await categoryModel.fetchAllCategories();
            expect(Categories.length).toBeGreaterThanOrEqual(1);
        });
        it("Fetch by id", async () => {
            const Category = await categoryModel.getCategoriesById('1');
            expect(Category.categoryname).toEqual('wooden');
        })
        it('Category product', async () => {
            const data: [] = [{ "categoryname": "metal" }] as unknown as []
            const updatedCategory = await categoryModel.updateCategory('1', data);
            expect(updatedCategory).toEqual('Category Updated');
        })

        it('Category deletion', async () => {
            await categoryModel.createCategory(category);
            const deletedCategory = await categoryModel.deleteCategory('2');
            expect(deletedCategory).toEqual("Category Deleted");
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
