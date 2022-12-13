CREATE TABLE Products (id SERIAL PRIMARY KEY,productName VARCHAR(100),productPrice INTEGER,category_id INTEGER REFERENCES Products_Categories(id));
