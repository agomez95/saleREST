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

CREATE TABLE specificaction_constants(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);

INSERT INTO specificaction_constants (name, created_at, modified_at) VALUES ('COLOR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 
INSERT INTO specificaction_constants (name, created_at, modified_at) VALUES ('SIZE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 
INSERT INTO specificaction_constants (name, created_at, modified_at) VALUES ('TEXT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 

CREATE TABLE product_specifications(
    id SERIAL NOT NULL PRIMARY KEY,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    specification_constant_id INTEGER NOT NULL,
    product_subcategory_id INTEGER NOT NULL
);

ALTER TABLE product_specifications ADD CONSTRAINT fk_products_specifications_constants FOREIGN KEY (specification_constant_id) REFERENCES specificaction_constants (id);
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
	SELECT c.id AS id, c.name AS name, c.state AS state, date(c.created_at) AS creation_date FROM product_categorys AS c;
END
$func$;

CREATE OR REPLACE FUNCTION get_product_category(id_in INTEGER)
RETURNS TABLE(id INTEGER, name VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT c.id AS id, c.name AS name, c.state AS state, date(c.created_at) AS creation_date FROM product_categorys AS c where c.id = id_in;
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
	SELECT sc.id AS id, sc.name AS name, c.name AS category, sc.state AS state, date(sc.created_at) AS creation_date 
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
	SELECT sc.id AS id, sc.name AS name, c.name AS category, sc.state AS state, date(sc.created_at) AS creation_date 
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
	SELECT b.id AS id, b.name AS name, b.state AS state, date(b.created_at) AS creation_date FROM product_brands AS b;
END
$func$;

CREATE OR REPLACE FUNCTION get_product_brand(id_in INTEGER)
RETURNS TABLE(id INTEGER, name VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT b.id AS id, b.name AS name, b.state AS state, date(b.created_at) AS creation_date FROM product_brands AS b where b.id = id_in;
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


CREATE OR REPLACE FUNCTION add_product_specification(specification_constant_id_in INTEGER, subcategory_id_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	s_new_id INTEGER;
BEGIN
	INSERT INTO product_specifications(created_at, modified_at, specification_constant_id, product_subcategory_id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, specification_constant_id_in, subcategory_id_in)
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


/* PRODUCT VARIANT SPECIFICATION VALUES */


CREATE OR REPLACE FUNCTION add_product_variant_specification_value(variant_id_in INTEGER, specification_value_id_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	v_new_id INTEGER;
BEGIN
	INSERT INTO product_variant_specification_values(created_at, modified_at, product_variant_id, product_specification_value_id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, variant_id_in, specification_value_id_in)
	RETURNING id INTO v_new_id;
	RETURN v_new_id;
END;
$func$
LANGUAGE plpgsql;


/* INFORMATION */


-- SELECT add_product_category('ropa'); -- agregado categoria 'ropa'
-- SELECT add_product_subcategory('jeans hombre', 1); -- agregado sub-categoria 'jeans de hombre'
-- SELECT add_product_brand('American Cold'); -- agregado marca 'amercian cold'
-- SELECT add_product('Pantalon Hombre Basement', 'PRO12', 1, 1); -- agregado producto 'Pantalon Hombre Basement'


-- SELECT add_product_specification(1, 1); -- agregado especificacion COLOR para la subcategoria de 'jeans de hombre'
-- SELECT add_product_specification(2, 1); -- agregado especificacion SIZE para la subcategoria de 'jeans de hombre'
-- SELECT add_product_specification(3, 1); -- agregado especificacion TEXT para la subcategoria de 'jeans de hombre'


-- SELECT add_product_specification_value('NEGRO', 1); -- agregado valor 'NEGRO' a la especificacion COLOR para la subcategoria de 'jeans de hombre'
-- SELECT add_product_specification_value('AZUL', 1); -- agregado valor 'AZUL' a la  especificacion COLOR para la subcategoria de 'jeans de hombre'
-- SELECT add_product_specification_value('BEIGE', 1); -- agregado valor 'BEIGE' a la  especificacion COLOR para la subcategoria de 'jeans de hombre'


-- SELECT add_product_specification_value('32', 2); -- agregada talla '32' a la especificacion SIZE para la subcategoria de 'jeans de hombre'
-- SELECT add_product_specification_value('30', 2); -- agregada talla '30' a la especificacion SIZE para la subcategoria de 'jeans de hombre'
-- SELECT add_product_specification_value('28', 2); -- agregada talla '28' a la especificacion SIZE para la subcategoria de 'jeans de hombre'


-- SELECT add_product_specification_value('Material: Drill', 3); -- agregado valor informativo 'Material: Drill' a la especificacion TEXT para la subcategoria de 'jeans de hombre'


-- SELECT add_product_variant('PANTALON NEGRO 32', 10, 59.9, 1); -- agregada variante 'PANTALON NEGRO 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_product_variant('PANTALON AZUL 32', 10, 59.9, 1); -- agregada variante 'PANTALON AZUL 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_product_variant('PANTALON BEIGE 32', 10, 59.9, 1); -- agregada variante 'PANTALON BEIGE 32' del producto 'Pantalon Hombre Basement'

-- SELECT add_product_variant('PANTALON NEGRO 30', 10, 59.9, 1); -- agregada variante 'PANTALON NEGRO 30' del producto 'Pantalon Hombre Basement'
-- SELECT add_product_variant('PANTALON AZUL 30', 10, 59.9, 1); -- agregada variante 'PANTALON AZUL 30' del producto 'Pantalon Hombre Basement'
-- SELECT add_product_variant('PANTALON BEIGE 30', 10, 59.9, 1); -- agregada variante 'PANTALON BEIGE 30' del producto 'Pantalon Hombre Basement'


-- SELECT add_product_variant('PANTALON NEGRO 28', 10, 59.9, 1); -- agregada variante 'PANTALON NEGRO 28' del producto 'Pantalon Hombre Basement'
-- SELECT add_product_variant('PANTALON AZUL 28', 10, 59.9, 1); -- agregada variante 'PANTALON AZUL 28' del producto 'Pantalon Hombre Basement'
-- SELECT add_product_variant('PANTALON BEIGE 28', 10, 59.9, 1); -- agregada variante 'PANTALON BEIGE 28' del producto 'Pantalon Hombre Basement'


-- SELECT add_product_variant_specification_value(1,1); -- agregada valor 'NEGRO' de las especificaciones a la variante 'PANTALON NEGRO 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_product_variant_specification_value(1,4); -- agregada valor '32' de las especificaciones a la variante 'PANTALON NEGRO 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_product_variant_specification_value(1,7); -- agregada valor 'Material: Dril' de las especificaciones a la variante 'PANTALON NEGRO 32' del producto 'Pantalon Hombre Basement'


-- SELECT add_product_variant_specification_value(2,2); -- agregada valor 'AZUL' de las especificaciones a la variante 'PANTALON AZUL 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_product_variant_specification_value(2,4); -- agregada valor '32' de las especificaciones a la variante 'PANTALON AZUL 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_product_variant_specification_value(2,7); -- agregada valor 'Material: Dril' de las especificaciones a la variante 'PANTALON AZUL 32' del producto 'Pantalon Hombre Basement'


-- SELECT add_product_variant_specification_value(3,3); -- agregada valor 'BEIGE' de las especificaciones a la variante 'PANTALON BEIGE 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_product_variant_specification_value(3,4); -- agregada valor '32' de las especificaciones a la variante 'PANTALON BEIGE 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_product_variant_specification_value(3,7); -- agregada valor 'Material: Dril' de las especificaciones a la variante 'PANTALON BEIGE 32' del producto 'Pantalon Hombre Basement'


/* SEARCHES */

CREATE OR REPLACE FUNCTION search_spectifications_subcategory(subcategory_id_in INTEGER)
RETURNS TABLE(specification_type INTEGER)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
    SELECT 
    CASE
    	WHEN COUNT (CASE WHEN sc.id = 1 THEN sc.id END) > 0 AND COUNT (CASE WHEN sc.id = 2 THEN sc.id END) = 0 THEN 1 -- ONLY COLOR
    	WHEN COUNT (CASE WHEN sc.id = 2 THEN sc.id END) > 0 AND COUNT (CASE WHEN sc.id = 1 THEN sc.id END) = 0 THEN 2 -- ONLY SIZE
    	WHEN COUNT (CASE WHEN sc.id = 1 THEN sc.id END) > 0 AND COUNT (CASE WHEN sc.id = 2 THEN sc.id END) > 0 THEN 3 -- COLOR AND SIZE
    	WHEN COUNT (CASE WHEN sc.id = 3 THEN sc.id END) > 0 AND COUNT (CASE WHEN sc.id = 1 THEN sc.id END) = 0 AND COUNT (CASE WHEN sc.id = 2 THEN sc.id END) = 0 THEN 4 -- ONLY TEXT
        ELSE 0  -- NO SPEC
	    END AS specification_type
    FROM products p
    JOIN product_variants v ON p.id = v.product_id
    JOIN product_variant_specification_values vsv ON v.id = vsv.product_variant_id
    JOIN product_specification_values sv ON vsv.product_specification_value_id = sv.id
    JOIN product_specifications s ON sv.product_specification_id = s.id
  	JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
    WHERE p.product_subcategory_id = subcategory_id_in;
	RETURN;
END
$func$;

CREATE OR REPLACE FUNCTION search_spectifications_brand(brand_id_in INTEGER)
RETURNS TABLE(specification_type INTEGER)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
    SELECT 
    CASE
    	WHEN COUNT (CASE WHEN sc.id = 1 THEN sc.id END) > 0 AND COUNT (CASE WHEN sc.id = 2 THEN sc.id END) = 0 THEN 1 -- ONLY COLOR
    	WHEN COUNT (CASE WHEN sc.id = 2 THEN sc.id END) > 0 AND COUNT (CASE WHEN sc.id = 1 THEN sc.id END) = 0 THEN 2 -- ONLY SIZE
    	WHEN COUNT (CASE WHEN sc.id = 1 THEN sc.id END) > 0 AND COUNT (CASE WHEN sc.id = 2 THEN sc.id END) > 0 THEN 3 -- COLOR AND SIZE
    	WHEN COUNT (CASE WHEN sc.id = 3 THEN sc.id END) > 0 AND COUNT (CASE WHEN sc.id = 1 THEN sc.id END) = 0 AND COUNT (CASE WHEN sc.id = 2 THEN sc.id END) = 0 THEN 4 -- ONLY TEXT
        ELSE 0  -- NO SPEC
	    END AS specification_type
    FROM products p
    JOIN product_variants v ON p.id = v.product_id
    JOIN product_variant_specification_values vsv ON v.id = vsv.product_variant_id
    JOIN product_specification_values sv ON vsv.product_specification_value_id = sv.id
    JOIN product_specifications s ON sv.product_specification_id = s.id
  	JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
    WHERE p.product_brand_id = brand_id_in;
	RETURN;
END
$func$;

CREATE OR REPLACE FUNCTION search_spectifications_product(product_id_in INTEGER)
RETURNS TABLE(specification_type INTEGER)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
    SELECT 
    CASE
    	WHEN COUNT (CASE WHEN sc.id = 1 THEN sc.id END) > 0 AND COUNT (CASE WHEN sc.id = 2 THEN sc.id END) = 0 THEN 1 -- ONLY COLOR
    	WHEN COUNT (CASE WHEN sc.id = 2 THEN sc.id END) > 0 AND COUNT (CASE WHEN sc.id = 1 THEN sc.id END) = 0 THEN 2 -- ONLY SIZE
    	WHEN COUNT (CASE WHEN sc.id = 1 THEN sc.id END) > 0 AND COUNT (CASE WHEN sc.id = 2 THEN sc.id END) > 0 THEN 3 -- COLOR AND SIZE
    	WHEN COUNT (CASE WHEN sc.id = 3 THEN sc.id END) > 0 AND COUNT (CASE WHEN sc.id = 1 THEN sc.id END) = 0 AND COUNT (CASE WHEN sc.id = 2 THEN sc.id END) = 0 THEN 4 -- ONLY TEXT
        ELSE 0  -- NO SPEC
	    END AS specification_type
    FROM products p
    JOIN product_variants v ON p.id = v.product_id
    JOIN product_variant_specification_values vsv ON v.id = vsv.product_variant_id
    JOIN product_specification_values sv ON vsv.product_specification_value_id = sv.id
    JOIN product_specifications s ON sv.product_specification_id = s.id
  	JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
    WHERE p.id = product_id_in;
	RETURN;
END
$func$;


/* GET SEARCHS */


CREATE OR REPLACE FUNCTION get_sizes_colors_bySubcategory(subcategory_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	product_code INTEGER,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	product_variant VARCHAR,
	product_variant_id INTEGER,
	product_cost NUMERIC, 
	product_stock INTEGER,
	available BOOLEAN, 
	color VARCHAR, 
	size VARCHAR, 
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS product_code, 
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS product_variant, 
		pv.id AS product_variant_id, 
		pv.cost AS product_cost, 
		pv.stock AS product_stock, 
		pv.is_available AS available, 
		c.color AS color, 
		s.size AS size, 
		date(pv.created_at) AS creation_date
	FROM product_variants pv
	JOIN products p ON pv.product_id = p.id
	JOIN ( 
		SELECT vsv.product_variant_id AS variant, sv.value AS color 
		FROM product_variant_specification_values vsv 
		INNER JOIN product_specification_values sv ON vsv.product_specification_value_id = sv.id
		INNER JOIN product_specifications s ON sv.product_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'COLOR') AS c ON pv.id = c.variant
	JOIN ( 
		SELECT vsv.product_variant_id AS variant, sv.value AS size 
		FROM product_variant_specification_values vsv 
		INNER JOIN product_specification_values sv ON vsv.product_specification_value_id = sv.id
		INNER JOIN product_specifications s ON sv.product_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'SIZE') AS s ON pv.id = s.variant
	JOIN product_brands pb ON p.product_brand_id = pb.id
	JOIN product_subcategorys ps ON p.product_subcategory_id = ps.id
	JOIN product_categorys pc ON ps.product_category_id = pc.id
	WHERE p.state = TRUE AND ps.id = subcategory_id_in;
END
$func$;

CREATE OR REPLACE FUNCTION get_sizes_colors_byBrand(brand_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	product_code INTEGER,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	product_variant VARCHAR,
	product_variant_id INTEGER,
	product_cost NUMERIC, 
	product_stock INTEGER, 
	available BOOLEAN, 
	color VARCHAR, 
	size VARCHAR, 
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS product_code, 
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS product_variant, 
		pv.id AS product_variant_id, 
		pv.cost AS product_cost, 
		pv.stock AS product_stock, 
		pv.is_available AS available, 
		c.color AS color, 
		s.size AS size, 
		date(pv.created_at) AS creation_date
	FROM product_variants pv
	JOIN products p ON pv.product_id = p.id
	JOIN ( 
		SELECT vsv.product_variant_id AS variant, sv.value AS color 
		FROM product_variant_specification_values vsv 
		INNER JOIN product_specification_values sv ON vsv.product_specification_value_id = sv.id
		INNER JOIN product_specifications s ON sv.product_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'COLOR') AS c ON pv.id = c.variant
	JOIN ( 
		SELECT vsv.product_variant_id AS variant, sv.value AS size 
		FROM product_variant_specification_values vsv 
		INNER JOIN product_specification_values sv ON vsv.product_specification_value_id = sv.id
		INNER JOIN product_specifications s ON sv.product_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'SIZE') AS s ON pv.id = s.variant
	JOIN product_brands pb ON p.product_brand_id = pb.id
	JOIN product_subcategorys ps ON p.product_subcategory_id = ps.id
	JOIN product_categorys pc ON ps.product_category_id = pc.id
	WHERE p.state = TRUE AND pb.id = brand_id_in;
END
$func$;


CREATE OR REPLACE FUNCTION get_sizes_colors_byProduct(product_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	product_code INTEGER,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	product_variant VARCHAR,
	product_variant_id INTEGER,
	product_cost NUMERIC, 
	product_stock INTEGER,
	available BOOLEAN, 
	color VARCHAR, 
	size VARCHAR, 
	creation_date DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS product_code, 
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS product_variant, 
		pv.id AS product_variant_id, 
		pv.cost AS product_cost, 
		pv.stock AS product_stock, 
		pv.is_available AS available, 
		c.color AS color, 
		s.size AS size, 
		date(pv.created_at) AS creation_date
	FROM product_variants pv
	JOIN products p ON pv.product_id = p.id
	JOIN ( 
		SELECT vsv.product_variant_id AS variant, sv.value AS color 
		FROM product_variant_specification_values vsv 
		INNER JOIN product_specification_values sv ON vsv.product_specification_value_id = sv.id
		INNER JOIN product_specifications s ON sv.product_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'COLOR') AS c ON pv.id = c.variant
	JOIN ( 
		SELECT vsv.product_variant_id AS variant, sv.value AS size 
		FROM product_variant_specification_values vsv 
		INNER JOIN product_specification_values sv ON vsv.product_specification_value_id = sv.id
		INNER JOIN product_specifications s ON sv.product_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'SIZE') AS s ON pv.id = s.variant
	JOIN product_brands pb ON p.product_brand_id = pb.id
	JOIN product_subcategorys ps ON p.product_subcategory_id = ps.id
	JOIN product_categorys pc ON ps.product_category_id = pc.id
	WHERE p.state = TRUE AND pv.product_id = product_id_in
	ORDER BY pv.id;
END
$func$;