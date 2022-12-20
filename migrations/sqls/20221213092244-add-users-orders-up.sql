CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    productsOfOrder VARCHAR(150),
    quantitiesOfProducts VARCHAR(150),
    user_id INTEGER REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    status VARCHAR(50));
