import express from "express";
import { OrderProductModel, AddedProduct } from "../models/orederProductModel";
import { tokenUserID, accessByToken } from "../middlewares/premissions";
import { Order, OrderModel } from "../models/ordersModel";



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
        const decodedTokenUser = tokenUserID(req);
        const activeOrder = await orderProductModel.AcitveOrderOfUser(decodedTokenUser);
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
                const newQunatity = parseInt(req.body.quantity) + parseInt(productCheck.rows.quantity);
                const updatedProduct = await orderProductModel.updateCartProduct(newQunatity, activeOrder.rows.id, req.body.product_id)
                res.json(updatedProduct);
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
        array.forEach((el, index) => {
            if (index != 0) {
                output += `,${el.product_id}`;
            } else {
                output += `${el.product_id}`;

            }

        })
    } else if (flag = 'quantity') {
        array.forEach((el, index) => {
            if (index != 0) {
                output += `,${el.quantity}`;
            } else {
                output += `${el.quantity}`;
            }
        })

    }
    return output;
}

const cofirmOrder = async (req: express.Request, res: express.Response) => {
    try {
        const orderProducts = await orderProductModel.fetchAllProductsbyOrder(req.params.id);
        const order = await orderModel.getOrderById(req.params.id);
        if (order.status == 'completed') {
            throw new Error('order is already closed')
        }
        const products = getDetailsString(orderProducts, 'products');
        const qunatites = getDetailsString(orderProducts, 'quantity');
        await orderModel.confirmOrder(req.params.id, products, qunatites)
        const confirmedOrder = await orderModel.getOrderById(req.params.id);
        res.json(confirmedOrder);
    } catch (err) {
        res.json(`${err}`)
    }
}

const deleteCartProduct = async (req: express.Request, res: express.Response) => {
    try {
        const order = await orderModel.getOrderById(req.params.order_id);
        if (order.status == 'completed') {
            throw new Error("order is already closed & can't be modified")
        }
        const deletedProduct = await orderProductModel.deleteCartProduct(req.params.order_id, req.params.id);
        res.json(deletedProduct);
    } catch (err) {
        res.json(`${err}`)
    }
}

const OrdersProductsRoutes = (app: express.Application) => {
    app.get('/orders/:id/products', accessByToken, getProductsOfOrder)
    app.post('/orders/products', accessByToken, addProductToCart)
    app.post('/orders/:id/confirm', accessByToken, cofirmOrder)
    app.delete('/orders/:order_id/products/:id', accessByToken, deleteCartProduct)
}

export default OrdersProductsRoutes;




