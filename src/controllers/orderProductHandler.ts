import express from "express";
import { OrderProductModel, AddedProduct } from "../models/orederProductModel";

const orderProductModel = new OrderProductModel;

const getProductsOfOrder = async (req: express.Request, res: express.Response) => {
    try {
        const products = await orderProductModel.fetchAllProductsbyOrder(req.params.id);
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }

}

const addProductToOrder = async (req: express.Request, res: express.Response) => {
    const addedProduct: AddedProduct = {
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
    }
    try {
        const productsAdded = await orderProductModel.addProductToOrder(addedProduct);
        res.json(productsAdded);
    } catch (err) {
        res.status(400);
        res.json(err);
    }

}

const OrdersRoutes = (app: express.Application) => {
    app.get('/orders/:id/products', getProductsOfOrder)
    app.post('/orders/products', addProductToOrder)

}



