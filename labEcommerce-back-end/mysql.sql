CREATE TABLE labecommerce_users(
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

SELECT * FROM labecommerce_users;

CREATE TABLE labecommerce_products(
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    image_url VARCHAR(5000) NOT NULL
);

SELECT * FROM labecommerce_products;

CREATE TABLE labecommerce_purchases(
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    quantity INT,
    total_price FLOAT,
    FOREIGN KEY (user_id) REFERENCES labecommerce_users (id),
    FOREIGN KEY (product_id) REFERENCES labecommerce_products (id)
);

SELECT * FROM labecommerce_purchases;
