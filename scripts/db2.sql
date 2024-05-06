CREATE DATABASE sales;
\c sales

/* TABLES */

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

CREATE TABLE product_specifications(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    product_subcategory_id INTEGER NOT NULL
);

ALTER TABLE product_specifications ADD CONSTRAINT fk_products_specifications_subcategorys FOREIGN KEY (product_subcategory_id) REFERENCES product_subcategorys (id);

CREATE TABLE product_specification_values (
    id SERIAL NOT NULL PRIMARY KEY,
    value VARCHAR(250) NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    product_specification_id INTEGER NOT NULL
);

ALTER TABLE product_specification_values ADD CONSTRAINT fk_products_specification_values_specifications FOREIGN KEY (product_specification_id) REFERENCES product_specifications (id);

CREATE TABLE product_variants(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    stock INTEGER NOT NULL,
    cost NUMERIC NOT NULL,
    is_available BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    product_id INTEGER NOT NULL
);

ALTER TABLE product_variants ADD CONSTRAINT fk_products_variants_products FOREIGN KEY (product_id) REFERENCES products (id);

CREATE TABLE product_variant_specification_values(
    id SERIAL NOT NULL PRIMARY KEY,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    product_variant_id INTEGER NOT NULL,
    product_specification_value_id INTEGER NOT NULL
);

ALTER TABLE product_variant_specification_values ADD CONSTRAINT fk_products_variant_specification_values_variants FOREIGN KEY (product_variant_id) REFERENCES product_variants (id);
ALTER TABLE product_variant_specification_values ADD CONSTRAINT fk_products_variant_specification_values_specification_values FOREIGN KEY (product_specification_value_id) REFERENCES product_specification_values (id);



/* FUNCTIONS */

/* PRODUCT CATEGORYS */

CREATE OR REPLACE FUNCTION get_product_categorys()
RETURNS TABLE(id INTEGER, name VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT c.id as id, c.name as name, c.state as state, date(c.created_at) as creation_date FROM product_categorys as c;
END
$func$;

CREATE OR REPLACE FUNCTION get_product_category(id_in INTEGER)
RETURNS TABLE(id INTEGER, name VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT c.id as id, c.name as name, c.state as state, date(c.created_at) as creation_date FROM product_categorys as c where c.id = id_in;
END
$func$;

CREATE OR REPLACE FUNCTION add_product_category(name_in VARCHAR)
RETURNS INTEGER AS 
$func$
DECLARE
	c_new_id INTEGER;
BEGIN
	INSERT INTO product_categorys(name, state, created_at, modified_at) VALUES (name_in, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
	RETURNING id INTO c_new_id;
	RETURN c_new_id;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_product_category(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	c_delete_count INTEGER;	
BEGIN
	DELETE FROM product_categorys where id = id_in
	RETURNING * INTO c_delete_count;
	RETURN c_delete_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION activate_product_category(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	c_activate_count INTEGER;	
BEGIN
	UPDATE product_categorys SET state = TRUE WHERE id = id_in
	RETURNING * INTO c_activate_count;
	RETURN c_activate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deactivate_product_category(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	c_deactivate_count INTEGER;	
BEGIN
	UPDATE product_categorys SET state = FALSE WHERE id = id_in
	RETURNING * INTO c_deactivate_count;
	RETURN c_deactivate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION edit_product_category(id_in INTEGER, name_in VARCHAR)
RETURNS INTEGER AS
$func$
DECLARE
	c_edit_count INTEGER;	
BEGIN
	UPDATE product_categorys SET name = name_in, modified_at = CURRENT_TIMESTAMP WHERE id = id_in
	RETURNING * INTO c_edit_count;
	RETURN c_edit_count;
END;
$func$
LANGUAGE plpgsql;


/* PRODUCT SUBCATEGORYS */


CREATE OR REPLACE FUNCTION get_product_subcategorys()
RETURNS TABLE(id INTEGER, name VARCHAR, category VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT sc.id AS id, sc.name AS name, c.name as category, sc.state AS state, date(sc.created_at) AS creation_date 
    FROM product_subcategorys AS sc
    INNER JOIN product_categorys AS c ON c.id = sc.product_category_id;
END
$func$;

CREATE OR REPLACE FUNCTION get_product_subcategory(id_in INTEGER)
RETURNS TABLE(id INTEGER, name VARCHAR, category VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT sc.id AS id, sc.name AS name, c.name as category, sc.state AS state, date(sc.created_at) AS creation_date 
    FROM product_subcategorys AS sc
    INNER JOIN product_categorys AS c ON c.id = sc.product_category_id
    WHERE sc.id = id_in;
END
$func$;

CREATE OR REPLACE FUNCTION add_product_subcategory(name_in VARCHAR, category_id_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	sc_new_id INTEGER;
BEGIN
	INSERT INTO product_subcategorys(name, state, created_at, modified_at, product_category_id) VALUES (name_in, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, category_id_in)
	RETURNING id INTO sc_new_id;
	RETURN sc_new_id;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_product_subcategory(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	sc_delete_count INTEGER;	
BEGIN
	DELETE FROM product_subcategorys where id = id_in
	RETURNING * INTO sc_delete_count;
	RETURN sc_delete_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION activate_product_subcategory(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	sc_activate_count INTEGER;	
BEGIN
	UPDATE product_subcategorys SET state = TRUE WHERE id = id_in
	RETURNING * INTO sc_activate_count;
	RETURN sc_activate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deactivate_product_subcategory(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	sc_deactivate_count INTEGER;	
BEGIN
	UPDATE product_subcategorys SET state = FALSE WHERE id = id_in
	RETURNING * INTO sc_deactivate_count;
	RETURN sc_deactivate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION edit_name_product_subcategory(id_in INTEGER, name_in VARCHAR)
RETURNS INTEGER AS
$func$
DECLARE
	sc_edit_count INTEGER;	
BEGIN
	UPDATE product_subcategorys SET name = name_in, modified_at = CURRENT_TIMESTAMP WHERE id = id_in
	RETURNING * INTO sc_edit_count;
	RETURN sc_edit_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION edit_category_product_subcategory(id_in INTEGER, category_id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	sc_edit_count INTEGER;	
BEGIN
	UPDATE product_subcategorys SET category_id = category_id_in, modified_at = CURRENT_TIMESTAMP WHERE id = id_in
	RETURNING * INTO sc_edit_count;
	RETURN sc_edit_count;
END;
$func$
LANGUAGE plpgsql;


/* PRODUCT BRANDS */


CREATE OR REPLACE FUNCTION get_product_brands()
RETURNS TABLE(id INTEGER, name VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT b.id as id, b.name as name, b.state as state, date(b.created_at) as creation_date FROM product_brands as b;
END
$func$;

CREATE OR REPLACE FUNCTION get_product_brand(id_in INTEGER)
RETURNS TABLE(id INTEGER, name VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT b.id as id, b.name as name, b.state as state, date(b.created_at) as creation_date FROM product_brands as b where b.id = id_in;
END
$func$;

CREATE OR REPLACE FUNCTION add_product_brand(name_in VARCHAR)
RETURNS INTEGER AS 
$func$
DECLARE
	b_new_id INTEGER;
BEGIN
	INSERT INTO product_brands(name, state, created_at, modified_at) VALUES (name_in, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
	RETURNING id INTO b_new_id;
	RETURN b_new_id;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_product_brand(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	b_delete_count INTEGER;	
BEGIN
	DELETE FROM product_brands where id = id_in
	RETURNING * INTO b_delete_count;
	RETURN b_delete_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION activate_product_brand(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	b_activate_count INTEGER;	
BEGIN
	UPDATE product_brands SET state = TRUE WHERE id = id_in
	RETURNING * INTO b_activate_count;
	RETURN b_activate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deactivate_product_brand(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	b_deactivate_count INTEGER;	
BEGIN
	UPDATE product_brands SET state = FALSE WHERE id = id_in
	RETURNING * INTO b_deactivate_count;
	RETURN b_deactivate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION edit_product_brand(id_in INTEGER, name_in VARCHAR)
RETURNS INTEGER AS
$func$
DECLARE
	b_edit_count INTEGER;	
BEGIN
	UPDATE product_brands SET name = name_in, modified_at = CURRENT_TIMESTAMP WHERE id = id_in
	RETURNING * INTO b_edit_count;
	RETURN b_edit_count;
END;
$func$
LANGUAGE plpgsql;


/* PRODUCTS */


CREATE OR REPLACE FUNCTION add_product(name_in VARCHAR, code_in VARCHAR, subcategory_id_in INTEGER, brand_id_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	p_new_id INTEGER;
BEGIN
	INSERT INTO products(name, code, state, created_at, modified_at, product_subcategory_id, product_brand_id) VALUES (name_in, code_in, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, subcategory_id_in, brand_id_in)
	RETURNING id INTO p_new_id;
	RETURN p_new_id;
END;
$func$
LANGUAGE plpgsql;


/* PRODUCT SPECIFICATIONS */


CREATE OR REPLACE FUNCTION add_product_specifications(name_in VARCHAR, subcategory_id_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	s_new_id INTEGER;
BEGIN
	INSERT INTO product_specifications(name, created_at, modified_at, product_subcategory_id) VALUES (name_in, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, subcategory_id_in)
	RETURNING id INTO s_new_id;
	RETURN s_new_id;
END;
$func$
LANGUAGE plpgsql;


/* PRODUCT SPECIFICATION VALUES */


CREATE OR REPLACE FUNCTION add_product_specification_value(value_in VARCHAR, specification_id_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	s_new_id INTEGER;
BEGIN
	INSERT INTO product_specification_values(value, created_at, modified_at, product_specification_id) VALUES (value_in, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, specification_id_in)
	RETURNING id INTO s_new_id;
	RETURN s_new_id;
END;
$func$
LANGUAGE plpgsql;


/* PRODUCT VARIANTS */


CREATE OR REPLACE FUNCTION add_product_variant(name_in VARCHAR, stock_in INTEGER, cost_in NUMERIC, product_id_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	v_new_id INTEGER;
BEGIN
	INSERT INTO product_variants(name, stock, cost, is_available, created_at, modified_at, product_id) VALUES (name_in, stock_in, cost_in, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, product_id_in)
	RETURNING id INTO v_new_id;
	RETURN v_new_id;
END;
$func$
LANGUAGE plpgsql;