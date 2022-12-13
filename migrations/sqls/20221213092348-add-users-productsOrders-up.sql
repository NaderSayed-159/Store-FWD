CREATE TABLE Products_Orders(id SERIAL PRIMARY KEY,order_id INTEGER REFERENCES Orders(id),product_id INTEGER REFERENCES Products(id),quantity INTEGER)
