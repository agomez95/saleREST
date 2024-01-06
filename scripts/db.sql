CREATE DATABASE sales;
\c sales

CREATE table categorys(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);

CREATE table subcategorys(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    category_id INTEGER NOT NULL
);

ALTER TABLE subcategorys ADD CONSTRAINT fk_subcategorys_categorys FOREIGN KEY (category_id) REFERENCES categorys (id);

CREATE table products(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    code VARCHAR(250) NOT NULL,
    price NUMERIC NOT NULL,
    stock INTEGER NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    subcategory_id INTEGER NOT NULL
);

ALTER TABLE products ADD CONSTRAINT fk_products_subcategorys FOREIGN KEY (subcategory_id) REFERENCES products (id);

CREATE table users(
    id SERIAL NOT NULL PRIMARY KEY,
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
    username VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);

CREATE table statesales(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL
);

CREATE table sales(
    id SERIAL NOT NULL PRIMARY KEY,
    sales_code VARCHAR(250) NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    state_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL
);

ALTER TABLE sales ADD CONSTRAINT fk_sales_users FOREIGN KEY (state_id) REFERENCES users (id);
ALTER TABLE sales ADD CONSTRAINT fk_sales_statesales FOREIGN KEY (user_id) REFERENCES statesales (id);

CREATE table presales(
    id SERIAL NOT NULL PRIMARY KEY,
    quanty INTEGER NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    sale_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL
);

ALTER TABLE presales ADD CONSTRAINT fk_presales_sales FOREIGN KEY (sale_id) REFERENCES sales (id);
ALTER TABLE presales ADD CONSTRAINT fk_presales_products FOREIGN KEY (product_id) REFERENCES products (id);


/****************
    FUNCIONES
*****************/

--CATEGORYS

CREATE OR REPLACE FUNCTION getCategorys()
RETURNS TABLE(id INTEGER, name VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT c.id as id, c.name as name, c.state as state, date(c.created_at) as creation_date FROM categorys as c;
END
$func$;

CREATE OR REPLACE FUNCTION addCategory(name_in VARCHAR)
RETURNS INTEGER AS 
$func$
DECLARE
	c_new_id INTEGER;
BEGIN
	INSERT INTO categorys(name, state, created_at, modified_at) VALUES (name_in, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
	RETURNING id INTO c_new_id;
	RETURN c_new_id;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deleteCategory(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	c_delete_count INTEGER;	
BEGIN
	DELETE FROM categorys where id = id_in
	RETURNING * INTO c_delete_count;
	RETURN c_delete_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION activateCategory(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	c_activate_count INTEGER;	
BEGIN
	UPDATE categorys SET state = TRUE WHERE id = id_in
	RETURNING * INTO c_activate_count;
	RETURN c_activate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deactivateCategory(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	c_deactivate_count INTEGER;	
BEGIN
	UPDATE categorys SET state = FALSE WHERE id = id_in
	RETURNING * INTO c_deactivate_count;
	RETURN c_deactivate_count;
END;
$func$
LANGUAGE plpgsql;

--CATEGORYS: EXAMPLES
-- SELECT addCategory('pantalones');
-- SELECT * FROM getCategorys();
-- SELECT deleteCategory(5);
-- SELECT deactivateCategory(4); -- FALSE
-- SELECT activateCategory(4); -- TRUE