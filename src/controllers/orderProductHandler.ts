import express from "express";
import { OrderProductModel, AddedProduct } from "../models/orederProductModel";
import { tokenUser } from "../middlewares/premissions";
import { Order, OrderModel } from "../models/ordersModel";

const orderProductModel = new OrderProductModel;

const getProductsOfOrder = async (req: express.Request, res: express.Response) => {
    try {
        const products = await orderProductModel.fetchAllProductsbyOrder(req.params.id);
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(`${err}`);
    }

}

const addProductToCart = async (req: express.Request, res: express.Response) => {

    const addedProduct: AddedProduct = {
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
    }
    try {
        const decodedTokenUser = tokenUser(req);
        const activeOrder = await orderProductModel.AcitveOrderOfUser(decodedTokenUser);
        if (activeOrder.status == 'active') {
            const productsAdded = await orderProductModel.addProductToCart(addedProduct);
            res.json(productsAdded);
        } else {
            const addedOrder: Order = {
                productsoforder: `${addedProduct.product_id}`,
                quantitiesofproducts: `${addedProduct.quantity}`,
                status: 'active',
                user_id: decodedTokenUser
            }
            const orderModel = new OrderModel;
            const newOrder = await orderModel.createOrder(addedOrder);
        }


    } catch (err) {
        res.status(400);
        res.json(`${err}`);
    }

}

const OrdersProductsRoutes = (app: express.Application) => {
    app.get('/orders/:id/products', getProductsOfOrder)
    app.post('/orders/products', addProductToCart)

}

export default OrdersProductsRoutes;




