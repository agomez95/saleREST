CREATE DATABASE sales;
\c sales

CREATE TABLE product_categorys(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);

CREATE TABLE product_subcategorys(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    product_category_id INTEGER NOT NULL
);

ALTER TABLE product_subcategorys ADD CONSTRAINT fk_subcategorys_categorys FOREIGN KEY (product_category_id) REFERENCES product_categorys (id);

CREATE TABLE product_brands(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);

CREATE TABLE products(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    code VARCHAR(250) NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    product_subcategory_id INTEGER NOT NULL,
    product_brand_id INTEGER NOT NULL
);

ALTER TABLE products ADD CONSTRAINT fk_products_subcategorys FOREIGN KEY (product_subcategory_id) REFERENCES product_subcategorys (id);
ALTER TABLE products ADD CONSTRAINT fk_products_brands FOREIGN KEY (product_brand_id) REFERENCES product_brands (id);

-- CREATE TABLE product_prices(
--     id SERIAL NOT NULL PRIMARY KEY,
--     price DECIMAL(10,2) NOT NULL,
--     state BOOLEAN NOT NULL,
--     created_at TIMESTAMP,
--     modified_at TIMESTAMP,
--     product_id INTEGER NOT NULL
-- );

