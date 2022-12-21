import { AddedProduct, OrderProductModel } from "../orederProductModel";
import { Product, ProductModel } from "../productsModel";
import { CategoryModel } from "../productsCategoryModel";
import { Order, OrderModel } from "../ordersModel";
import { User, UsersModel } from "../usersModel";
import Client from "../../database";
import app from "../..";
import supertest from "supertest";


const orderModel = new OrderModel;
const userModel = new UsersModel;
const orderProductModel = new OrderProductModel;
const productModel = new ProductModel;
const categoryModel = new CategoryModel;

const req = supertest(app);
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJOYWRlciIsImxhc3RuYW1lIjoiU2F5ZWQiLCJsb2dpbm5hbWUiOiJhZG1pbjEifSwiaWF0IjoxNjcxNjEwODMxfQ.s_jpv6lvD9O5tlWym3PzaFVvRLWuNCKpY7rD-otmt3Q"

const user: User = {
    firstname: "Nader",
    lastName: "Sayed",
    loginName: "admin",
    password: "Pass123$",
};

const order: Order = {
    productsoforder: "1,2",
    quantitiesofproducts: "10,15",
    status: "active",
    user_id: 1
};

const product: Product = {
    productname: "chair",
    productprice: 10,
    category_id: 1
};

describe("Orders Products Model defination", () => {
    describe("Orders Model functions defination", () => {
        it("should have fetchAll", () => {
            expect(orderProductModel.fetchAllProductsbyOrder).toBeDefined();
        });
        it("should have add product to cart function", () => {
            expect(orderProductModel.addProductToCart).toBeDefined();
        });
        it("should have get active orders of users", () => {
            expect(orderProductModel.AcitveOrderOfUser).toBeDefined();
        });
        it("should have delete product from cart", () => {
            expect(orderProductModel.deleteCartProduct).toBeDefined();
        });
        it("should have check if product in the cart for the order", () => {
            expect(orderProductModel.checkProductInCart).toBeDefined();
        });
        it("should have update cart product method", () => {
            expect(orderProductModel.updateCartProduct).toBeDefined();
        });
    });
    beforeAll(async () => {
        await userModel.createUser(user);
        await orderModel.createOrder(order);
        await categoryModel.createCategory({ categoryname: "Metal" })
        await productModel.createProduct(product)
    });

})