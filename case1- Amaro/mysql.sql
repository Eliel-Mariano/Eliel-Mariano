CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tags NOT NULL
);

SELECT * FROM products;

#DROP TABLE products;