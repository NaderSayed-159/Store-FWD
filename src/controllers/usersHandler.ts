import { UsersModel, User } from "../models/usersModel";
import express from "express";
import jwt, { Secret } from "jsonwebtoken";
import { accessByID, accessByToken } from "../middlewares/premissions";

const userModel = new UsersModel();

const getUsers = async (_req: express.Request, res: express.Response): Promise<void> => {
  try {
    const allUsers = await userModel.fetchAllUsers();
    res.json(allUsers);
  } catch (err) {
    res.json(`${err}`);
  }
};

const userById = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const user = await userModel.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const createUser = async (req: express.Request, res: express.Response): Promise<void> => {
  const createdUser: User = {
    firstname: req.body.firstName,
    lastName: req.body.lastName,
    loginName: req.body.loginName,
    password: req.body.password,
  };

  try {
    const newUser = await userModel.createUser(createdUser);
    res.status(201);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    console.log(err);
    res.json(`Send good Request ${err}`);
  }
};

const updateUser = async (req: express.Request, res: express.Response): Promise<void> => {
  const userUpdates: [] = req.body;
  try {
    const updatedUser = await userModel.updateUser(req.params.id, userUpdates);
    res.json(updatedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteUser = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const deletedUser = await userModel.deleteUser(req.params.id);
    res.json(deletedUser);
  } catch (err) {
    res.json(err);
  }
};

const authenticate = async (req: express.Request, res: express.Response): Promise<void> => {
  const loginedUser = {
    loginName: req.body.loginName,
    password: req.body.password,
  };
  try {
    const authUser = await userModel.auth(
      loginedUser.loginName,
      loginedUser.password
    );
    
    if (authUser != null) {
      const token = jwt.sign(
        { user: authUser },
        process.env.JWT_String as Secret
      );
      res.json(token);
    } else {
      res.status(401);
      throw new Error("unauthorized");
    }
  } catch (err) {
    res.status(401);
    res.json(`${err}`);
  }
};

const updatePass = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    await userModel.updatePassword(
      req.body.password,
      req.params.id
    );
    res.json("Password Updated");
  } catch (err) {
    res.status(400);
    res.json(`Can't update password${err}`);
  }
};

const userRoutes = (app: express.Application): void => {
  app.get("/users", accessByToken, getUsers);
  app.get("/users/:id", accessByToken, userById);
  app.post("/users", accessByToken, createUser);
  app.put("/users/:id/password", accessByID, updatePass);
  app.put("/users/:id", accessByToken, updateUser);
  app.delete("/users/:id", accessByToken, deleteUser);
  app.post("/users/auth", authenticate);
};

export default userRoutes;
