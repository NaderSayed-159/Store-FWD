import express from "express";
import { OrderProductModel, AddedProduct } from "../models/orederProductModel";
import { tokenUser } from "../middlewares/premissions";
import { Order, OrderModel } from "../models/ordersModel";
import e from "express";
const orderProductModel = new OrderProductModel;
const orderModel = new OrderModel;

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
    try {
        const decodedTokenUser = tokenUser(req);
        const activeOrder = await orderProductModel.AcitveOrderOfUser(decodedTokenUser);
        console.log('activeOrder', activeOrder)
        if (activeOrder.status == 'active') {
            const productCheck = await orderProductModel.checkProductInCart(activeOrder.rows.id, req.body.product_id);
            if (productCheck.status == 'not') {
                const addedProduct: AddedProduct = {
                    order_id: activeOrder.rows.id,
                    product_id: req.body.product_id,
                    quantity: req.body.quantity,
                }
                const productsAdded = await orderProductModel.addProductToCart(addedProduct);
                res.json(productsAdded);
            } else {
                const updatedProduct = await orderProductModel.updateCartProduct(req.body.quantity, activeOrder.rows.id, req.body.product_id)
            }

        } else {
            const addedOrder: Order = {
                productsoforder: ``,
                quantitiesofproducts: ``,
                status: 'active',
                user_id: decodedTokenUser
            }
            const newOrder = await orderModel.createOrder(addedOrder);
            const productsAdded = await orderProductModel.addProductToCart({
                order_id: newOrder.id as Number,
                product_id: req.body.product_id,
                quantity: req.body.quantity
            });
            res.json(productsAdded);
        }
    } catch (err) {
        res.status(400);
        res.json(`${err}`);
    }
}

const getDetailsString = (array: AddedProduct[], flag: string) => {
    let output: string = '';
    if (flag == 'products') {
        array.forEach(el => {
            output += el.product_id;
        })
    } else if (flag = 'quantity') {
        array.forEach(el => {
            output += el.quantity;
        })
    }
    return output;
}

const cofirmOrder = async (req: express.Request, res: express.Response) => {
    const orderProducts = await orderProductModel.fetchAllProductsbyOrder(req.params.id);
    const producString = getDetailsString(orderProducts, 'products');
    res.json(producString);
}

const OrdersProductsRoutes = (app: express.Application) => {
    app.get('/orders/:id/products', getProductsOfOrder)
    app.post('/orders/products', addProductToCart)
    app.post('/orders/:id/confirm', cofirmOrder)

}

export default OrdersProductsRoutes;




