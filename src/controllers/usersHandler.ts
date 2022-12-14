import { UsersModel, User } from "../models/usersModel";
import express from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { premissionAccess } from "../services/middlewares";
const userModel = new UsersModel;

const getUsers = async (_req: express.Request, res: express.Response) => {
    try {
        const allUsers = await userModel.fetchAllUsers();
        res.json(allUsers)
    } catch (err) {
        res.json(err)
    }
}

const userById = async (req: express.Request, res: express.Response) => {
    try {
        const user = await userModel.getUserById(req.params.id);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const createUser = async (req: express.Request, res: express.Response) => {
    const createdUser: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        loginName: req.body.loginName,
        password: req.body.password
    }

    try {
        const newUser = await userModel.createUser(createdUser);
        res.status(201);
        res.json(newUser);
    } catch (err) {
        res.status(400)
        console.log(err);
        res.json(`Send good Request ${err}`)
    }
}

const updateUser = async (req: express.Request, res: express.Response) => {
    const userUpdates: [] = req.body;
    try {
        const updatedUser = await userModel.updateUser(req.params.id, userUpdates);
        res.json(updatedUser)
    } catch (err) {
        res.status(400);
        res.json(err)
    }
}

const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const deletedUser = await userModel.deleteUser(req.params.id);
        res.json(deletedUser);
    } catch (err) {
        res.json(err)
    }
}

const authenticate = async (req: express.Request, res: express.Response) => {
    const loginedUser = {
        userName: req.body.userName,
        password: req.body.password
    }
    try {
        const authUser = await userModel.auth(loginedUser.userName, loginedUser.password);
        if (authUser != null) {
            const token = jwt.sign({ user: loginedUser }, process.env.JWT_String as Secret);
            res.json(token);
        } else {
            res.status(401);
            throw new Error('unauthorized')
        }
    } catch (err) {
        res.status(401)
        res.json({ err })
    }
}


const userRoutes = (app: express.Application) => {
    app.get('/users', getUsers)
    app.get('/users/:id', userById)
    app.post('/users', createUser)
    // app.put('/users/:id', premissionAccess, updateUser)
    app.put('/users/:id', updateUser)
    app.delete('/users/:id', deleteUser)
    app.post('/users/auth', authenticate)
}

export default userRoutes;
