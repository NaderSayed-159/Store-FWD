import { Product , ProductModel } from "../models/productsModel";
import express from "express";
import { accessByToken } from "../middlewares/premissions";



const productsModel = new ProductModel;


const getProducts = async (_req: express.Request, res: express.Response) => {
    try {
        const allUsers = await productsModel.fetchAllProducts();
        res.json(allUsers)
    } catch (err) {
        res.json(err)
    }
}

const productById = async (req: express.Request, res: express.Response) => {
    try {
        const user = await productsModel.getProductsById(req.params.id);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const createProduct = async (req: express.Request, res: express.Response) => {
    const createdProduct: Product = {
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        category_id: req.body.category_id,
    }

    try {
        const newProduct = await productsModel.createProduct(createdProduct);
        res.status(201);
        res.json(newProduct);
    } catch (err) {
        res.status(400)
        console.log(err);
        res.json(`Send good Request ${err}`)
    }
}

const updateProduct = async (req: express.Request, res: express.Response) => {
    const userUpdates: [] = req.body;
    try {
        const updatedUser = await productsModel.updateProduct(req.params.id, userUpdates);
        res.json(updatedUser)
    } catch (err) {
        res.status(400);
        res.json(err)
    }
}

const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {
        const deletedProduct = await productsModel.deleteProduct(req.params.id);
        res.json(deletedProduct);
    } catch (err) {
        res.json(err)
    }
}

const ProductsRoutes = (app: express.Application) => {
    app.get('/users',  getProducts)
    app.get('/users/:id', productById)
    app.post('/users', accessByToken, createProduct)
    app.put('/users/:id', accessByToken, updateProduct)
    app.delete('/users/:id', accessByToken, deleteProduct)
}

export default ProductsRoutes;
 
