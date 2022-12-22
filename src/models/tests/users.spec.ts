import { UsersModel, User } from "../usersModel";
import Client from "../../database";
import app from "../..";
import supertest from "supertest";
const req = supertest(app);
const userModel = new UsersModel();

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJOYWRlciIsImxhc3RuYW1lIjoiU2F5ZWQiLCJsb2dpbm5hbWUiOiJhZG1pbjEifSwiaWF0IjoxNjcxNjEwODMxfQ.s_jpv6lvD9O5tlWym3PzaFVvRLWuNCKpY7rD-otmt3Q";
const user: User = {
  firstname: "Nader",
  lastName: "Sayed",
  loginName: "admin",
  password: "Pass123$",
};

describe("Users Model defination", () => {
  beforeAll(async () => {
    await userModel.createUser(user);
  });
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
    it("should have update password function", () => {
      expect(userModel.updatePassword).toBeDefined();
    });
  });
  describe("Users Model actions", () => {
    it("Fetch all users", async () => {
      const users = await userModel.fetchAllUsers();
      expect(users.length).toBeGreaterThanOrEqual(1);
    });
    it("Fetch by id", async () => {
      const user = await userModel.getUserById("1");
      expect(user.firstname).toEqual("Nader");
    });
    it("update user", async () => {
      const data: [] = [{ firstName: "updated" }] as unknown as [];
      const updatedUser = await userModel.updateUser("1", data);
      expect(updatedUser).toEqual("User Updated");
    });
    it("user deletion", async () => {
      await userModel.createUser(user);
      const deletedUser = await userModel.deleteUser("2");
      expect(deletedUser).toEqual("User Deleted");
    });
    it("get token authentication", async () => {
      const auth = await userModel.auth(user.loginName, user.password);
      expect(auth?.id).toEqual(1);
    });
    it("update Password", async () => {
      const password = await userModel.updatePassword("newPass123$", "1");
      expect(password).toEqual("Password Updated");
    });
  });
  describe("User Routes", () => {
    it("Get all users endpoint", async () => {
      const res = await req
        .get("/users")
        .set("Authorization", `bearer ${token}`);
      expect(res.status).toBe(200);
    });
    it("Get user by id route ", async () => {
      const res = await req
        .get("/users/1")
        .set("Authorization", `bearer ${token}`);
      expect(res.status).toBe(200);
    });
    it("Create user route", async () => {
      const newUser = {
        loginName: "admin",
        firstName: "Nader",
        lastName: "Sayed",
        password: "Pass123$",
      };

      const res = await req
        .post("/users")
        .send(newUser)
        .set("Authorization", `bearer ${token}`);
      expect(res.status).toBe(201);
    });

    it("update user route ", async () => {
      const res = await req
        .put("/users/1")
        .send([{ firstname: "newName" }])
        .set("Authorization", `bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it("delete user route", async () => {
      const res = await req
        .delete("/users/3")
        .set("Authorization", `bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it("update password route", async () => {
      const res = await req
        .put("/users/1/password")
        .send({ password: "Pass123$" })
        .set("Authorization", `bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it("auth route", async () => {
      const res = await req.post("/users/auth").send({
        loginName: user.loginName,
        password: "Pass123$",
      });
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
