import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './controllers/usersHandler';
import ProductsRoutes from './controllers/productsHandles';
import OrdersRoutes from './controllers/oredersHandler';
import OrdersProductsRoutes from './controllers/orderProductHandler';
import productsCategoriesRoutes from './controllers/productCategoryHandler';

dotenv.config()

const app = express();
app.use(cors());

const port = process.env.PORT;

app.use(bodyParser.json());


app.get('/', (_req: express.Request, res: express.Response) => {
    try {
        res.send('this is the INDEX route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})


app.listen(port, () => {
    console.log(`hello from http://localhost:${port}`);

})

userRoutes(app);
productsCategoriesRoutes(app);
ProductsRoutes(app);
OrdersRoutes(app);
OrdersProductsRoutes(app);
