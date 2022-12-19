import { UsersModel, User } from "../usersModel";
import app from "../..";
import { Connection } from "pg";
import Client from "../../database";
const userModel = new UsersModel;


describe('Users Model defination', () => {

    describe('Users Model functions defination', () => {
        it('should have fetchAll', () => {
            expect(userModel.fetchAllUsers).toBeDefined();
        })
        it('should have fetch by id', () => {
            expect(userModel.getUserById).toBeDefined();
        })
        it('should have create', () => {
            expect(userModel.createUser).toBeDefined();
        })
        it('should have delete', () => {
            expect(userModel.deleteUser).toBeDefined();
        })
        it('should have update', () => {
            expect(userModel.updateUser).toBeDefined();
        })
    })
    describe('Users Model endpoints', () => {
        //test endpoint using jasmine using supertest?              
        beforeAll(async () => {
            const user: User = {
                firstName: "Nader",
                lastName: "Sayed",
                loginName: "admin",
                password: "Pass123$"
            };
            await userModel.createUser(user);

        })
        it("Fetch all users", async () => {
            const users = await userModel.fetchAllUsers();
            expect(users.length).toBeGreaterThanOrEqual(1);
        })
    })

    afterAll(async () => {
        const con = await Client.connect();
        const sql = "DELETE FROM users;\n ALTER SEQUENCE user_id_seq RESTART WITH 1;" +
            "\n DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;" +
            "\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;" +
            "\n DELETE FROM products_categories;\n ALTER SEQUENCE products_categories_id_seq RESTART WITH 1;" +
            "\n DELETE FROM products_orders;\n ALTER SEQUENCE products_orders_id_seq RESTART WITH 1;"
        await con.query(sql);
        con.release();

    })
})

// const req = supertest(app);
// it("Test resizing form endpoint", async () => {
//     const res = await req.get("/api");
//     expect(res.status).toBe(200);
// });

// it('index Method return array', async () => {
//     const res = await user1.index();
//     expect(res).toEqual([]);
// })

// it('Create method should add  a book', async () => {
//     const res = await user1.create({
//         title: '100$',
//         author: 'nader',
//         pages: 100,
//         type: 'investment',
//         summary: 'nothing useful'
//     })
//     expect(res).toEqual({
//         id: 1,
//         title: '100$',
//         author: 'nader',
//         pages: 100,
//         type: 'investment',
//         summary: 'nothing useful'
//     })
// })


