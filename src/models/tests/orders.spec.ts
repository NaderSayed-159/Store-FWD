import { Order, OrderModel } from "../ordersModel";
import { User, UsersModel } from "../usersModel";
import Client from "../../database";
import app from "../..";
import supertest from "supertest";
import { OrderProductModel } from "../orederProductModel";
import { ProductModel } from "../productsModel";
import { CategoryModel } from "../productsCategoryModel";
const orderModel = new OrderModel;
const userModel = new UsersModel;
const orderProductModel = new OrderProductModel;
const productModel = new ProductModel;
const categoryModel = new CategoryModel;


const req = supertest(app);

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJOYWRlciIsImxhc3RuYW1lIjoiU2F5ZWQiLCJsb2dpbm5hbWUiOiJhZG1pbjEifSwiaWF0IjoxNjcxNjEwODMxfQ.s_jpv6lvD9O5tlWym3PzaFVvRLWuNCKpY7rD-otmt3Q"

const order: Order = {
    productsoforder: "1,2",
    quantitiesofproducts: "10,15",
    status: "active",
    user_id: 1
};
const user: User = {
    firstname: "Nader",
    lastName: "Sayed",
    loginName: "admin",
    password: "Pass123$",
};
describe("Orders Model defination", () => {
    describe("Orders Model functions defination", () => {
        it("should have fetchAll", () => {
            expect(orderModel.fetchAllOrders).toBeDefined();
        });
        it("should have fetch by id", () => {
            expect(orderModel.getOrderById).toBeDefined();
        });
        it("should have create", () => {
            expect(orderModel.createOrder).toBeDefined();
        });
        it("should have delete", () => {
            expect(orderModel.deleteOrder).toBeDefined();
        });
        it("should have update", () => {
            expect(orderModel.updateOrder).toBeDefined();
        });
        it("should have confirm order method", () => {
            expect(orderModel.confirmOrder).toBeDefined();
        });
        it("should have get orders of the user", () => {
            expect(orderModel.getOrdersOfUser).toBeDefined();
        });
    });
    beforeAll(async () => {
        await userModel.createUser(user);
        await orderModel.createOrder(order);
    });
    describe("Orders Model actions", () => {
        it("Fetch all Orders", async () => {
            const products = await orderModel.fetchAllOrders();
            expect(products.length).toBeGreaterThanOrEqual(1);
        });
        it("Fetch by id", async () => {
            const order = await orderModel.getOrderById('1');
            expect(order.status).toEqual('active');
        })
        it('update Order', async () => {
            const data: [] = [{ "status": "completed" }] as unknown as []
            const updatedOrder = await orderModel.updateOrder('1', data);
            expect(updatedOrder).toEqual('Order Updated');
        })
        it('Order deletion', async () => {
            await orderModel.createOrder(order);
            const deletedOrder = await orderModel.deleteOrder('2');
            expect(deletedOrder).toEqual("Order Deleted");
        })
        it('Orders of user', async () => {
            const userOrders = await orderModel.getOrdersOfUser("1");
            expect(userOrders.length).toBeGreaterThanOrEqual(1);
        })
        it('Order confrirmation', async () => {
            const confrimedOrder = await orderModel.confirmOrder("1", "1,5", "10,10");
            expect(confrimedOrder).toEqual("Order confirmed");
        })

    });
    describe("Orders Routes", () => {
        it("Get all orders endpoint", async () => {
            const res = await req.get("/orders").set("Authorization", `bearer ${token}`);
            expect(res.status).toBe(200);
        });

        it("Get order by id route ", async () => {
            const res = await req.get("/orders/1").set("Authorization", `bearer ${token}`);
            expect(res.status).toBe(200);
        });

        it("Create orders route", async () => {

            const res = await req.post("/products").send(order).set("Authorization", `bearer ${token}`);
            expect(res.status).toBe(201);
        });

        it("update order route ", async () => {
            const res = await req.put("/orders/1").send([{ "status": "active" }]).set("Authorization", `bearer ${token}`);
            expect(res.status).toBe(200);
        });

        it("delete order route", async () => {
            const res = await req.delete("/orders/3").set("Authorization", `bearer ${token}`);
            expect(res.status).toBe(200);
        });

        it('Orders of user route', async () => {
            const res = await req.get("/users/1/orders").set("Authorization", `bearer ${token}`);
            expect(res.status).toBe(200);
        })

        it('Order confirrmation route', async () => {
            await categoryModel.createCategory({
                categoryname: "metal"
            })
            await orderModel.createOrder(order)
            await productModel.createProduct({
                productname: "chair",
                productprice: 5,
                category_id: 1
            })
            await orderProductModel.addProductToCart({
                order_id:3,
                product_id: 1,
                quantity: 5
            })
            const res = await req.post("/orders/3/confirm").set("Authorization", `bearer ${token}`);
            expect(res.status).toBe(200);
        })

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
