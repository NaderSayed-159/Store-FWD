import { Product, ProductModel } from "../models/productsModel";
import express from "express";
import { accessByToken } from "../middlewares/premissions";

const productsModel = new ProductModel();

const getProducts = async (_req: express.Request, res: express.Response): Promise<void> => {
  try {
    const allProducts = await productsModel.fetchAllProducts();
    res.json(allProducts);
  } catch (err) {
    res.json(err);
  }
};

const productById = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const product = await productsModel.getProductsById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const createProduct = async (req: express.Request, res: express.Response): Promise<void> => {
  const createdProduct: Product = {
    productname: req.body.productName,
    productprice: req.body.productPrice,
    category_id: req.body.category_id,
  };

  try {
    const newProduct = await productsModel.createProduct(createdProduct);
    res.status(201);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    console.log(err);
    res.json(`Send good Request ${err}`);
  }
};

const updateProduct = async (req: express.Request, res: express.Response): Promise<void> => {
  const productUpdates: [] = req.body;
  try {
    const updatedProduct = await productsModel.updateProduct(
      req.params.id,
      productUpdates
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteProduct = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const deletedProduct = await productsModel.deleteProduct(req.params.id);
    res.json(deletedProduct);
  } catch (err) {
    res.json(err);
  }
};

const ProductsRoutes = (app: express.Application): void => {
  app.get("/products", getProducts);
  app.get("/products/:id", productById);
  app.post("/products", accessByToken, createProduct);
  app.put("/products/:id", accessByToken, updateProduct);
  app.delete("/products/:id", accessByToken, deleteProduct);
};

export default ProductsRoutes;
