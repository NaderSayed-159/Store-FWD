CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    loginName VARCHAR(100) NOT NULL,
    password VARCHAR(150) NOT NULL
    );
