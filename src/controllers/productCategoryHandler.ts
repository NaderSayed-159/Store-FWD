import express from "express";
import { accessByToken } from "../middlewares/premissions";
import { Category, CategoryModel } from "../models/productsCategoryModel";

const productCategoryModel = new CategoryModel();

const getCategories = async (_req: express.Request, res: express.Response) => {
  try {
    const allCategories = await productCategoryModel.fetchAllCategories();
    res.json(allCategories);
  } catch (err) {
    res.json(err);
  }
};

const categoryById = async (req: express.Request, res: express.Response) => {
  try {
    const category = await productCategoryModel.getCategoriesById(
      req.params.id
    );
    res.json(category);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const createCategory = async (req: express.Request, res: express.Response) => {
  const createdCategory: Category = {
    categoryName: req.body.categoryName,
  };

  try {
    const newCategory = await productCategoryModel.createCategory(
      createdCategory
    );
    res.status(201);
    res.json(newCategory);
  } catch (err) {
    res.status(400);
    console.log(err);
    res.json(`Send good Request ${err}`);
  }
};

const updateCategory = async (req: express.Request, res: express.Response) => {
  const categoryUpdates: [] = req.body;
  try {
    const updatedCategory = await productCategoryModel.updateCategory(
      req.params.id,
      categoryUpdates
    );
    res.json(updatedCategory);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const deleteCategory = async (req: express.Request, res: express.Response) => {
  try {
    const deletedCategory = await productCategoryModel.deleteCategory(
      req.params.id
    );
    res.json(deletedCategory);
  } catch (err) {
    res.json(err);
  }
};

const productsCategoriesRoutes = (app: express.Application) => {
  app.get("/products/categories", getCategories);
  app.get("/products/categories/:id", categoryById);
  app.post("/products/categories", accessByToken, createCategory);
  app.put("/products/categories/:id", accessByToken, updateCategory);
  app.delete("/products/categories/:id", accessByToken, deleteCategory);
};

export default productsCategoriesRoutes;
