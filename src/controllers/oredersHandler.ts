import { Order, OrderModel } from "../models/ordersModel";
import express from "express";
import { accessByToken ,accessByID } from "../middlewares/premissions";



const productsModel = new OrderModel;


const getOrders = async (_req: express.Request, res: express.Response) => {
    try {
        const allUsers = await productsModel.fetchAllOrders();
        res.json(allUsers)
    } catch (err) {
        res.json(err)
    }
}

const orderById = async (req: express.Request, res: express.Response) => {
    try {
        const user = await productsModel.getOrderById(req.params.id);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const createOrder = async (req: express.Request, res: express.Response) => {
    const createdProduct: Order = {
        productsoforder: req.body.productsoforder,
        quantitiesofproducts: req.body.quantitiesofproducts,
        user_id: req.body.user_id,
        status: req.body.status,
    }

    try {
        const newProduct = await productsModel.createOrder(createdProduct);
        res.status(201);
        res.json(newProduct);
    } catch (err) {
        res.status(400)
        console.log(err);
        res.json(`Send good Request ${err}`)
    }
}

const updateOrder = async (req: express.Request, res: express.Response) => {
    const userUpdates: [] = req.body;
    try {
        const updatedUser = await productsModel.updateOrder(req.params.id, userUpdates);
        res.json(updatedUser)
    } catch (err) {
        res.status(400);
        res.json(err)
    }
}

const deleteOrder = async (req: express.Request, res: express.Response) => {
    try {
        const deletedProduct = await productsModel.deleteOrder(req.params.id);
        res.json(deletedProduct);
    } catch (err) {
        res.json(err)
    }
}

const OrderByUser = async (req: express.Request, res: express.Response) => {
    try {
        const ordersOfUser = await productsModel.getOrdersOfUser(req.params.userId);
        res.json(ordersOfUser)
    } catch (err) {
        res.json(err)
    }
}

const OrdersRoutes = (app: express.Application) => {
    app.get('/orders', getOrders)
    app.get('/orders/:id', orderById)
    app.post('/orders', accessByToken, createOrder)
    app.put('/orders/:id', accessByToken, updateOrder)
    app.delete('/orders/:id', accessByToken, deleteOrder)
    app.get('/users/:userId/orders/:id', accessByID, OrderByUser)
}

export default OrdersRoutes;

