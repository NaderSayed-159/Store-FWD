import { Order, OrderModel } from "../ordersModel";
import { User, UsersModel } from "../usersModel";
import Client from "../../database";

const orderModel = new OrderModel;
const userModel = new UsersModel;


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
    describe("Orders Model endpoints", () => {
        beforeAll(async () => {
            await userModel.createUser(user);
            await orderModel.createOrder(order);
        });
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
