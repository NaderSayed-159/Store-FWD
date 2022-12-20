import { Order, OrderModel } from "../models/ordersModel";
import express from "express";
import { accessByToken, accessByID } from "../middlewares/premissions";
import { OrderProductModel } from "../models/orederProductModel";
import { getDetailsString } from "../services/helperFunction";
const orderModel = new OrderModel;
const orderProductModel = new OrderProductModel;

const getOrders = async (_req: express.Request, res: express.Response) => {
  try {
    const allUsers = await orderModel.fetchAllOrders();
    res.json(allUsers);
  } catch (err) {
    res.json(err);
  }
};

const orderById = async (req: express.Request, res: express.Response) => {
  try {
    const user = await orderModel.getOrderById(req.params.id);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const createOrder = async (req: express.Request, res: express.Response) => {
  const createdProduct: Order = {
    productsoforder: req.body.productsoforder,
    quantitiesofproducts: req.body.quantitiesofproducts,
    user_id: req.body.user_id,
    status: req.body.status,
  };

  try {
    const newProduct = await orderModel.createOrder(createdProduct);
    res.status(201);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    console.log(err);
    res.json(`Send good Request ${err}`);
  }
};

const updateOrder = async (req: express.Request, res: express.Response) => {
  const userUpdates: [] = req.body;
  try {
    const updatedUser = await orderModel.updateOrder(
      req.params.id,
      userUpdates
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteOrder = async (req: express.Request, res: express.Response) => {
  try {
    const deletedProduct = await orderModel.deleteOrder(req.params.id);
    res.json(deletedProduct);
  } catch (err) {
    res.json(err);
  }
};

const OrdersByUser = async (req: express.Request, res: express.Response) => {
  try {
    const ordersOfUser = await orderModel.getOrdersOfUser(req.params.id);
    res.json(ordersOfUser);
  } catch (err) {
    res.json(err);
  }
};
const cofirmOrder = async (req: express.Request, res: express.Response) => {
  try {
    const orderProducts = await orderProductModel.fetchAllProductsbyOrder(
      req.params.id
    );
    const order = await orderModel.getOrderById(req.params.id);
    if (order.status == "completed") {
      throw new Error("order is already closed");
    }
    const products = getDetailsString(orderProducts, "products");
    const qunatites = getDetailsString(orderProducts, "quantity");
    await orderModel.confirmOrder(req.params.id, products, qunatites);
    const confirmedOrder = await orderModel.getOrderById(req.params.id);
    res.json(confirmedOrder);
  } catch (err) {
    res.json(`${err}`);
  }
};

const OrdersRoutes = (app: express.Application) => {
  app.get("/orders", getOrders);
  app.get("/orders/:id", orderById);
  app.post("/orders", accessByToken, createOrder);
  app.put("/orders/:id", accessByToken, updateOrder);
  app.delete("/orders/:id", accessByToken, deleteOrder);
  app.get("/users/:id/orders", accessByID, OrdersByUser);
  app.post("/orders/:id/confirm", accessByToken, cofirmOrder);

};

export default OrdersRoutes;
