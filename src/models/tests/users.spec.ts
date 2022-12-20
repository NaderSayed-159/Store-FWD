import { UsersModel, User } from "../usersModel";
import Client from "../../database";
const userModel = new UsersModel();


const user: User = {
  firstName: "Nader",
  lastName: "Sayed",
  loginname: "admin",
  password: "Pass123$",
};

describe("Users Model defination", () => {
  describe("Users Model functions defination", () => {
    it("should have fetchAll", () => {
      expect(userModel.fetchAllUsers).toBeDefined();
    });
    it("should have fetch by id", () => {
      expect(userModel.getUserById).toBeDefined();
    });
    it("should have create", () => {
      expect(userModel.createUser).toBeDefined();
    });
    it("should have delete", () => {
      expect(userModel.deleteUser).toBeDefined();
    });
    it("should have update", () => {
      expect(userModel.updateUser).toBeDefined();
    });
    it("should have authentication function", () => {
      expect(userModel.auth).toBeDefined();
    });
  });
  describe("Users Model endpoints", () => {
    //test endpoint using jasmine using supertest?
    beforeAll(async () => {
      await userModel.createUser(user);
    });
    it("Fetch all users", async () => {
      const users = await userModel.fetchAllUsers();
      expect(users.length).toBeGreaterThanOrEqual(1);
    });
    it("Fetch by id", async () => {
      const user = await userModel.getUserById('1');
      expect(user.loginname).toEqual('admin');
    })
    it('update user', async () => {
      const data: [] = [{ "firstName": "updated" }] as unknown as []
      const updatedUser = await userModel.updateUser('1', data);
      expect(updatedUser).toEqual('User Updated');
    })

    it('user deletion', async () => {
      await userModel.createUser(user);
      const deletedUser = await userModel.deleteUser('2');
      expect(deletedUser).toEqual('User Deleted');
    })

    it('get token authentication', async () => {
      const auth = await userModel.auth(user.loginname, user.password);
      expect(auth?.id).toEqual(1)
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

// import app from "../..";
// import supertest from "supertest";
// const req = supertest(app);

// it("Test resizing form endpoint", async () => {
//     const res = await req.get("/api");
//     expect(res.status).toBe(200);
// });