CREATE TABLE Orders (id SERIAL PRIMARY KEY,productsOfOrder VARCHAR(150),quantitiesOfProducts VARCHAR(150),user_id INTEGER REFERENCES Users(id),status VARCHAR(50));
