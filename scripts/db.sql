CREATE DATABASE sales;
\c sales

/* TABLES: PRODUCTS */

CREATE TABLE PRO_categorys(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);

CREATE TABLE PRO_subcategorys(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    PRO_category_id INTEGER NOT NULL
);

ALTER TABLE PRO_subcategorys ADD CONSTRAINT fk_subcategorys_categorys FOREIGN KEY (PRO_category_id) REFERENCES PRO_categorys (id);

CREATE TABLE PRO_brands(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);

CREATE TABLE products(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description VARCHAR(250) NOT NULL,
	long_description TEXT NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    PRO_subcategory_id INTEGER NOT NULL,
    PRO_brand_id INTEGER NOT NULL
);

ALTER TABLE products ADD CONSTRAINT fk_products_subcategorys FOREIGN KEY (PRO_subcategory_id) REFERENCES PRO_subcategorys (id);
ALTER TABLE products ADD CONSTRAINT fk_products_brands FOREIGN KEY (PRO_brand_id) REFERENCES PRO_brands (id);

-- CREATE TABLE PRO_prices(
--     id SERIAL NOT NULL PRIMARY KEY,
--     price DECIMAL(10,2) NOT NULL,
--     state BOOLEAN NOT NULL,
--     created_at TIMESTAMP,
--     modified_at TIMESTAMP,
--     PRO_id INTEGER NOT NULL
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

CREATE TABLE PRO_specifications(
    id SERIAL NOT NULL PRIMARY KEY,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    specification_constant_id INTEGER NOT NULL,
    PRO_subcategory_id INTEGER NOT NULL
);

ALTER TABLE PRO_specifications ADD CONSTRAINT fk_products_specifications_constants FOREIGN KEY (specification_constant_id) REFERENCES specificaction_constants (id);
ALTER TABLE PRO_specifications ADD CONSTRAINT fk_products_specifications_subcategorys FOREIGN KEY (PRO_subcategory_id) REFERENCES PRO_subcategorys (id);

CREATE TABLE PRO_specification_values (
    id SERIAL NOT NULL PRIMARY KEY,
    value VARCHAR(250) NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    PRO_specification_id INTEGER NOT NULL
);

ALTER TABLE PRO_specification_values ADD CONSTRAINT fk_products_specification_values_specifications FOREIGN KEY (PRO_specification_id) REFERENCES PRO_specifications (id);

CREATE TABLE PRO_variants(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    stock INTEGER NOT NULL,
    cost NUMERIC NOT NULL,
    is_available BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    PRO_id INTEGER NOT NULL
);

ALTER TABLE PRO_variants ADD CONSTRAINT fk_products_variants_products FOREIGN KEY (PRO_id) REFERENCES products (id);

CREATE TABLE PRO_variant_specification_values(
    id SERIAL NOT NULL PRIMARY KEY,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    PRO_variant_id INTEGER NOT NULL,
    PRO_specification_value_id INTEGER NOT NULL
);

ALTER TABLE PRO_variant_specification_values ADD CONSTRAINT fk_products_variant_specification_values_variants FOREIGN KEY (PRO_variant_id) REFERENCES PRO_variants (id);
ALTER TABLE PRO_variant_specification_values ADD CONSTRAINT fk_products_variant_specification_values_specification_values FOREIGN KEY (PRO_specification_value_id) REFERENCES PRO_specification_values (id);


CREATE TABLE PRO_photo_attributes(
	id SERIAL NOT NULL PRIMARY KEY,
	size FLOAT NOT NULL,
	height INTEGER NOT NULL,
	width INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE PRO_photo_storage(
	id SERIAL NOT NULL PRIMARY KEY,
	route VARCHAR(700) NOT NULL
);

CREATE TABLE PRO_photos(
	id SERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(500) NOT NULL,
    PRO_photo_attribute_id INTEGER NOT NULL,
    PRO_photo_storage_id INTEGER NOT NULL
);

ALTER TABLE PRO_photos ADD CONSTRAINT fk_PRO_photos_PRO_photo_attributes FOREIGN KEY (PRO_photo_attribute_id) REFERENCES PRO_photo_attributes (id);
ALTER TABLE PRO_photos ADD CONSTRAINT fk_PRO_photos_PRO_photo_storage FOREIGN KEY (PRO_photo_storage_id) REFERENCES PRO_photo_storage (id);

CREATE TABLE PRO_photo_configuration(
	PRO_variant_id INTEGER NOT NULL,
	PRO_photo_id INTEGER NOT NULL
);

ALTER TABLE PRO_photo_configuration ADD CONSTRAINT fk_PRO_photo_configuration_products FOREIGN KEY (PRO_variant_id) REFERENCES PRO_variants (id);
ALTER TABLE PRO_photo_configuration ADD CONSTRAINT fk_PRO_photo_configuration_PRO_images FOREIGN KEY (PRO_photo_id) REFERENCES PRO_photos (id);

/* TABLES: CUSTOMERS & ADDRESS*/

CREATE TABLE CST_customers(
	id SERIAL NOT NULL PRIMARY KEY,
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
	email VARCHAR(250) NOT NULL UNIQUE,
	password VARCHAR(250) NOT NULL,
	state BOOLEAN NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ADR_country(
	id SERIAL NOT NULL PRIMARY KEY,
	fullname VARCHAR(250) NOT NULL UNIQUE,
	shortname VARCHAR(250) NOT NULL
);

INSERT INTO ADR_country (fullname, shortname) VALUES ('Peru', 'pe'); 
INSERT INTO ADR_country (fullname, shortname) VALUES ('Spain', 'es'); 
INSERT INTO ADR_country (fullname, shortname) VALUES ('United States', 'us'); 

CREATE TABLE ADR_addresses(
	id SERIAL NOT NULL PRIMARY KEY,
	number VARCHAR(250) NOT NULL,
	street VARCHAR(250) NOT NULL,
	address_line_1 VARCHAR(250),
	address_line_2 VARCHAR(250),
	city VARCHAR(250) NOT NULL,
	state_province VARCHAR(250) NOT NULL,
	postal_code VARCHAR(250) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	ADR_country_id INTEGER NOT NULL
);

ALTER TABLE ADR_addresses ADD CONSTRAINT fk_address_country FOREIGN KEY (ADR_country_id) REFERENCES ADR_country (id);

CREATE TABLE CST_customer_address(
	CST_customer_id INTEGER REFERENCES CST_customers(id),
	ADR_address_id INTEGER REFERENCES ADR_addresses(id),
	is_default BOOLEAN NOT NULL,
	PRIMARY KEY (CST_customer_id, ADR_address_id)
);

-- ALTER TABLE CST_customer_address ADD CONSTRAINT fk_CST_customer_address_customers FOREIGN KEY (CST_customer_id) REFERENCES CST_customers (id);
-- ALTER TABLE CST_customer_address ADD CONSTRAINT fk_CST_customer_address_addresses FOREIGN KEY (ADR_address_id) REFERENCES ADR_addresses (id);

/* TABLES: PAYMENT */

CREATE TABLE PMT_methods(
	id SERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(250) NOT NULL UNIQUE
);

CREATE TABLE CST_payment_method(
	id SERIAL NOT NULL PRIMARY KEY,
	provider VARCHAR(250) NOT NULL,
	account VARCHAR(250) NOT NULL,
	expiry VARCHAR NOT NULL,
	is_default BOOLEAN NOT NULL,
	PMT_method_id INTEGER NOT NULL,
	CST_customer_id INTEGER NOT NULL
);

ALTER TABLE CST_payment_method ADD CONSTRAINT CST_payment_method_payments FOREIGN KEY (PMT_method_id) REFERENCES CST_customers (id);
ALTER TABLE CST_payment_method ADD CONSTRAINT CST_payment_method_customers FOREIGN KEY (CST_customer_id) REFERENCES PMT_methods (id);

/* FUNCTIONS */

/* PRODUCT CATEGORYS */

CREATE OR REPLACE FUNCTION FN_GET_CATEGORIES()
RETURNS TABLE(id INTEGER, name VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT c.id AS id, c.name AS name, c.state AS state, date(c.created_at) AS creation_date FROM PRO_categorys AS c;
END
$func$;

CREATE OR REPLACE FUNCTION FN_GET_CATEGORY(id_in INTEGER)
RETURNS TABLE(id INTEGER, name VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT c.id AS id, c.name AS name, c.state AS state, date(c.created_at) AS creation_date FROM PRO_categorys AS c where c.id = id_in;
END
$func$;

CREATE OR REPLACE FUNCTION FN_ADD_CATEGORY(name_in VARCHAR)
RETURNS INTEGER AS 
$func$
DECLARE
	c_new_id INTEGER;
BEGIN
	INSERT INTO PRO_categorys(name, state, created_at, modified_at) VALUES (name_in, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
	RETURNING id INTO c_new_id;
	RETURN c_new_id;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION FN_DEL_CATEGORY(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	c_delete_count INTEGER;	
BEGIN
	DELETE FROM PRO_categorys where id = id_in
	RETURNING * INTO c_delete_count;
	RETURN c_delete_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION FN_ACT_CATEGORY(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	c_activate_count INTEGER;	
BEGIN
	UPDATE PRO_categorys SET state = TRUE WHERE id = id_in
	RETURNING * INTO c_activate_count;
	RETURN c_activate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION FN_DEACT_CATEGORY(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	c_deactivate_count INTEGER;	
BEGIN
	UPDATE PRO_categorys SET state = FALSE WHERE id = id_in
	RETURNING * INTO c_deactivate_count;
	RETURN c_deactivate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION FN_EDIT_CATEGORY(id_in INTEGER, name_in VARCHAR)
RETURNS INTEGER AS
$func$
DECLARE
	c_edit_count INTEGER;	
BEGIN
	UPDATE PRO_categorys SET name = name_in, modified_at = CURRENT_TIMESTAMP WHERE id = id_in
	RETURNING * INTO c_edit_count;
	RETURN c_edit_count;
END;
$func$
LANGUAGE plpgsql;


/* PRODUCT SUBCATEGORYS */


CREATE OR REPLACE FUNCTION FN_GET_SUBCATEGORIES()
RETURNS TABLE(id INTEGER, name VARCHAR, category VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT sc.id AS id, sc.name AS name, c.name AS category, sc.state AS state, date(sc.created_at) AS creation_date 
    FROM PRO_subcategorys AS sc
    INNER JOIN PRO_categorys AS c ON c.id = sc.PRO_category_id;
END
$func$;

CREATE OR REPLACE FUNCTION FN_GET_SUBCATEGORY(id_in INTEGER)
RETURNS TABLE(id INTEGER, name VARCHAR, category VARCHAR, category_id INTEGER, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT sc.id AS id, sc.name AS name, c.name AS category, sc.PRO_category_id AS category_id, sc.state AS state, date(sc.created_at) AS creation_date 
    FROM PRO_subcategorys AS sc
    INNER JOIN PRO_categorys AS c ON c.id = sc.PRO_category_id
    WHERE sc.id = id_in;
END
$func$;

CREATE OR REPLACE FUNCTION FN_ADD_SUBCATEGORY(name_in VARCHAR, category_id_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	sc_new_id INTEGER;
BEGIN
	INSERT INTO PRO_subcategorys(name, state, created_at, modified_at, PRO_category_id) VALUES (name_in, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, category_id_in)
	RETURNING id INTO sc_new_id;
	RETURN sc_new_id;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION FN_DEL_SUBCATEGORY(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	sc_delete_count INTEGER;	
BEGIN
	DELETE FROM PRO_subcategorys where id = id_in
	RETURNING * INTO sc_delete_count;
	RETURN sc_delete_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION FN_ACT_SUBCATEGORY(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	sc_activate_count INTEGER;	
BEGIN
	UPDATE PRO_subcategorys SET state = TRUE WHERE id = id_in
	RETURNING * INTO sc_activate_count;
	RETURN sc_activate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION FN_DEACT_SUBCATEGORY(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	sc_deactivate_count INTEGER;	
BEGIN
	UPDATE PRO_subcategorys SET state = FALSE WHERE id = id_in
	RETURNING * INTO sc_deactivate_count;
	RETURN sc_deactivate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION FN_EDIT_SUBCATEGORY(id_in INTEGER, name_in VARCHAR, category_id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	sc_edit_count INTEGER;	
BEGIN
	UPDATE PRO_subcategorys SET name = name_in, PRO_category_id = category_id_in, modified_at = CURRENT_TIMESTAMP WHERE id = id_in
	RETURNING * INTO sc_edit_count;
	RETURN sc_edit_count;
END;
$func$
LANGUAGE plpgsql;


/* PRODUCT BRANDS */


CREATE OR REPLACE FUNCTION FN_GET_BRANDS()
RETURNS TABLE(id INTEGER, name VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT b.id AS id, b.name AS name, b.state AS state, date(b.created_at) AS creation_date FROM PRO_brands AS b;
END
$func$;

CREATE OR REPLACE FUNCTION FN_GET_BRAND(id_in INTEGER)
RETURNS TABLE(id INTEGER, name VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT b.id AS id, b.name AS name, b.state AS state, date(b.created_at) AS creation_date FROM PRO_brands AS b where b.id = id_in;
END
$func$;

CREATE OR REPLACE FUNCTION FN_ADD_BRAND(name_in VARCHAR)
RETURNS INTEGER AS 
$func$
DECLARE
	b_new_id INTEGER;
BEGIN
	INSERT INTO PRO_brands(name, state, created_at, modified_at) VALUES (name_in, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
	RETURNING id INTO b_new_id;
	RETURN b_new_id;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION FN_DEL_BRAND(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	b_delete_count INTEGER;	
BEGIN
	DELETE FROM PRO_brands where id = id_in
	RETURNING * INTO b_delete_count;
	RETURN b_delete_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION FN_ACT_BRAND(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	b_activate_count INTEGER;	
BEGIN
	UPDATE PRO_brands SET state = TRUE WHERE id = id_in
	RETURNING * INTO b_activate_count;
	RETURN b_activate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION FN_DEACT_BRAND(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	b_deactivate_count INTEGER;	
BEGIN
	UPDATE PRO_brands SET state = FALSE WHERE id = id_in
	RETURNING * INTO b_deactivate_count;
	RETURN b_deactivate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION FN_EDIT_BRAND(id_in INTEGER, name_in VARCHAR)
RETURNS INTEGER AS
$func$
DECLARE
	b_edit_count INTEGER;	
BEGIN
	UPDATE PRO_brands SET name = name_in, modified_at = CURRENT_TIMESTAMP WHERE id = id_in
	RETURNING * INTO b_edit_count;
	RETURN b_edit_count;
END;
$func$
LANGUAGE plpgsql;


/* PRODUCTS */


CREATE OR REPLACE FUNCTION FN_ADD_PRODUCT(name_in VARCHAR, description_in VARCHAR, long_description_in TEXT, subcategory_id_in INTEGER, brand_id_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	p_new_id INTEGER;
BEGIN
	INSERT INTO products(name, description, long_description, state, created_at, modified_at, PRO_subcategory_id, PRO_brand_id) VALUES (name_in, description_in, long_description_in, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, subcategory_id_in, brand_id_in)
	RETURNING id INTO p_new_id;
	RETURN p_new_id;
END;
$func$
LANGUAGE plpgsql;


/* PRODUCT SPECIFICATIONS */


CREATE OR REPLACE FUNCTION FN_ADD_SPEC(specification_constant_id_in INTEGER, subcategory_id_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	s_new_id INTEGER;
BEGIN
	INSERT INTO PRO_specifications(created_at, modified_at, specification_constant_id, PRO_subcategory_id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, specification_constant_id_in, subcategory_id_in)
	RETURNING id INTO s_new_id;
	RETURN s_new_id;
END;
$func$
LANGUAGE plpgsql;

/* SUBCATEGORIES WITH SPECS*/

CREATE OR REPLACE FUNCTION FN_GET_SUBCAT_WITH_SPECS()
RETURNS TABLE(
	subcategory VARCHAR,
	subcategory_id INTEGER,
	specification_constant VARCHAR,
	specification_constant_id INTEGER,
	created_at DATE,
	modified_at DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT
		psub.name AS subcategory, 
		pspec.pro_subcategory_id AS subcategory_id, 
		sconst.name AS specificaction_constant,
		pspec.specification_constant_id AS specificaction_constant_id,
		date(pspec.created_at) AS created_at,
		date(pspec.modified_at) AS modified_at
	FROM pro_specifications AS pspec
	INNER JOIN pro_subcategorys AS psub ON pspec.pro_subcategory_id = psub.id
	INNER JOIN specificaction_constants AS sconst ON pspec.specification_constant_id = sconst.id;
END
$func$;

/* SUBCATEGORIES WITHOUT SPECS*/

CREATE OR REPLACE FUNCTION FN_GET_SUBCAT_WITHOUT_SPECS()
RETURNS TABLE(
	subcategory_id INTEGER,
	subcategory VARCHAR,
	created_at DATE,
	modified_at DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT
	    psub.id AS subcategory_id,
	    psub.name AS subcategory,
		date(psub.created_at) AS created_at,
		date(psub.modified_at) AS modified_at
	FROM pro_subcategorys AS psub
	LEFT JOIN pro_specifications AS pspec ON pspec.pro_subcategory_id = psub.id
	WHERE pspec.id IS NULL;
END
$func$;


/* PRODUCT SPECIFICATION VALUES */


CREATE OR REPLACE FUNCTION FN_ADD_SPEC_VAL(value_in VARCHAR, specification_id_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	s_new_id INTEGER;
BEGIN
	INSERT INTO PRO_specification_values(value, created_at, modified_at, PRO_specification_id) VALUES (value_in, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, specification_id_in)
	RETURNING id INTO s_new_id;
	RETURN s_new_id;
END;
$func$
LANGUAGE plpgsql;


/* PRODUCT VARIANTS */


CREATE OR REPLACE FUNCTION FN_ADD_VARIANT(name_in VARCHAR, stock_in INTEGER, cost_in NUMERIC, PRO_id_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	v_new_id INTEGER;
BEGIN
	INSERT INTO PRO_variants(name, stock, cost, is_available, created_at, modified_at, PRO_id) VALUES (name_in, stock_in, cost_in, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, PRO_id_in)
	RETURNING id INTO v_new_id;
	RETURN v_new_id;
END;
$func$
LANGUAGE plpgsql;


/* PRODUCT VARIANT SPECIFICATION VALUES */


CREATE OR REPLACE FUNCTION FN_ADD_VARIANT_SPEC_VAL(variant_id_in INTEGER, specification_value_id_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	v_new_id INTEGER;
BEGIN
	INSERT INTO PRO_variant_specification_values(created_at, modified_at, PRO_variant_id, PRO_specification_value_id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, variant_id_in, specification_value_id_in)
	RETURNING id INTO v_new_id;
	RETURN v_new_id;
END;
$func$
LANGUAGE plpgsql;


/* DELETE SPECIFICATION VALUES BY VARIANT */


CREATE OR REPLACE FUNCTION FN_DEL_VARIANT_SPEC_VAL(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	vsp_delete_count INTEGER;	
BEGIN
    DELETE FROM PRO_variant_specification_values 
    WHERE PRO_variant_id = id_in;
    
    -- GET DIAGNOSTICS: Obtener el número de filas afectadas
    GET DIAGNOSTICS vsp_delete_count = ROW_COUNT;

    RETURN vsp_delete_count;
END;
$func$
LANGUAGE plpgsql;

-- SELECT delete_PRO_variant_specification_value(2);


/* DELETE VARIANT */


CREATE OR REPLACE FUNCTION FN_DEL_VARIANT(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	v_delete_count INTEGER;	
BEGIN
	DELETE FROM PRO_variants where id = id_in
	RETURNING * INTO v_delete_count;
	RETURN v_delete_count;
END;
$func$
LANGUAGE plpgsql;



/* INFORMATION */


-- SELECT add_PRO_category('ropa'); -- agregado categoria 'ropa'
-- SELECT add_PRO_subcategory('jeans hombre', 1); -- agregado sub-categoria 'jeans de hombre'
-- SELECT add_PRO_brand('American Cold'); -- agregado marca 'amercian cold'
-- SELECT add_product('Pantalon Hombre Basement', 'PRO12', 1, 1); -- agregado producto 'Pantalon Hombre Basement'


-- SELECT add_PRO_specification(1, 1); -- agregado especificacion COLOR para la subcategoria de 'jeans de hombre'
-- SELECT add_PRO_specification(2, 1); -- agregado especificacion SIZE para la subcategoria de 'jeans de hombre'
-- SELECT add_PRO_specification(3, 1); -- agregado especificacion TEXT para la subcategoria de 'jeans de hombre'


-- SELECT add_PRO_specification_value('NEGRO', 1); -- agregado valor 'NEGRO' a la especificacion COLOR para la subcategoria de 'jeans de hombre'
-- SELECT add_PRO_specification_value('AZUL', 1); -- agregado valor 'AZUL' a la  especificacion COLOR para la subcategoria de 'jeans de hombre'
-- SELECT add_PRO_specification_value('BEIGE', 1); -- agregado valor 'BEIGE' a la  especificacion COLOR para la subcategoria de 'jeans de hombre'


-- SELECT add_PRO_specification_value('32', 2); -- agregada talla '32' a la especificacion SIZE para la subcategoria de 'jeans de hombre'
-- SELECT add_PRO_specification_value('30', 2); -- agregada talla '30' a la especificacion SIZE para la subcategoria de 'jeans de hombre'
-- SELECT add_PRO_specification_value('28', 2); -- agregada talla '28' a la especificacion SIZE para la subcategoria de 'jeans de hombre'


-- SELECT add_PRO_specification_value('Material: Drill', 3); -- agregado valor informativo 'Material: Drill' a la especificacion TEXT para la subcategoria de 'jeans de hombre'


-- SELECT add_PRO_variant('PANTALON NEGRO 32', 10, 59.9, 1); -- agregada variante 'PANTALON NEGRO 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_PRO_variant('PANTALON AZUL 32', 10, 59.9, 1); -- agregada variante 'PANTALON AZUL 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_PRO_variant('PANTALON BEIGE 32', 10, 59.9, 1); -- agregada variante 'PANTALON BEIGE 32' del producto 'Pantalon Hombre Basement'

-- SELECT add_PRO_variant('PANTALON NEGRO 30', 10, 59.9, 1); -- agregada variante 'PANTALON NEGRO 30' del producto 'Pantalon Hombre Basement'
-- SELECT add_PRO_variant('PANTALON AZUL 30', 10, 59.9, 1); -- agregada variante 'PANTALON AZUL 30' del producto 'Pantalon Hombre Basement'
-- SELECT add_PRO_variant('PANTALON BEIGE 30', 10, 59.9, 1); -- agregada variante 'PANTALON BEIGE 30' del producto 'Pantalon Hombre Basement'


-- SELECT add_PRO_variant('PANTALON NEGRO 28', 10, 59.9, 1); -- agregada variante 'PANTALON NEGRO 28' del producto 'Pantalon Hombre Basement'
-- SELECT add_PRO_variant('PANTALON AZUL 28', 10, 59.9, 1); -- agregada variante 'PANTALON AZUL 28' del producto 'Pantalon Hombre Basement'
-- SELECT add_PRO_variant('PANTALON BEIGE 28', 10, 59.9, 1); -- agregada variante 'PANTALON BEIGE 28' del producto 'Pantalon Hombre Basement'


-- SELECT add_PRO_variant_specification_value(1,1); -- agregada valor 'NEGRO' de las especificaciones a la variante 'PANTALON NEGRO 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_PRO_variant_specification_value(1,4); -- agregada valor '32' de las especificaciones a la variante 'PANTALON NEGRO 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_PRO_variant_specification_value(1,7); -- agregada valor 'Material: Dril' de las especificaciones a la variante 'PANTALON NEGRO 32' del producto 'Pantalon Hombre Basement'


-- SELECT add_PRO_variant_specification_value(2,2); -- agregada valor 'AZUL' de las especificaciones a la variante 'PANTALON AZUL 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_PRO_variant_specification_value(2,4); -- agregada valor '32' de las especificaciones a la variante 'PANTALON AZUL 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_PRO_variant_specification_value(2,7); -- agregada valor 'Material: Dril' de las especificaciones a la variante 'PANTALON AZUL 32' del producto 'Pantalon Hombre Basement'


-- SELECT add_PRO_variant_specification_value(3,3); -- agregada valor 'BEIGE' de las especificaciones a la variante 'PANTALON BEIGE 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_PRO_variant_specification_value(3,4); -- agregada valor '32' de las especificaciones a la variante 'PANTALON BEIGE 32' del producto 'Pantalon Hombre Basement'
-- SELECT add_PRO_variant_specification_value(3,7); -- agregada valor 'Material: Dril' de las especificaciones a la variante 'PANTALON BEIGE 32' del producto 'Pantalon Hombre Basement'


/* SEARCHES */

CREATE OR REPLACE FUNCTION FN_SEARCH_SPECS_SUBCAT(subcategory_id_in INTEGER)
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
    JOIN PRO_variants v ON p.id = v.PRO_id
    JOIN PRO_variant_specification_values vsv ON v.id = vsv.PRO_variant_id
    JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
    JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
  	JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
    WHERE p.PRO_subcategory_id = subcategory_id_in;
	RETURN;
END
$func$;

CREATE OR REPLACE FUNCTION FN_SEARCH_SPECS_BRAND(brand_id_in INTEGER)
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
    JOIN PRO_variants v ON p.id = v.PRO_id
    JOIN PRO_variant_specification_values vsv ON v.id = vsv.PRO_variant_id
    JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
    JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
  	JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
    WHERE p.PRO_brand_id = brand_id_in;
	RETURN;
END
$func$;

CREATE OR REPLACE FUNCTION FN_SEARCH_SPECS_PRODUCT(PRO_id_in INTEGER)
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
    JOIN PRO_variants v ON p.id = v.PRO_id
    JOIN PRO_variant_specification_values vsv ON v.id = vsv.PRO_variant_id
    JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
    JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
  	JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
    WHERE p.id = PRO_id_in;
	RETURN;
END
$func$;


/* GET SIZES-COLORS BY */


CREATE OR REPLACE FUNCTION FN_GET_SIZ_COL_SUBCAT(subcategory_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	PRO_cost NUMERIC, 
	PRO_stock INTEGER,
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
		p.id AS PRO_code,
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		pv.cost AS PRO_cost, 
		pv.stock AS PRO_stock, 
		pv.is_available AS available, 
		c.color AS color, 
		s.size AS size, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN ( 
		SELECT vsv.PRO_variant_id AS variant, sv.value AS color 
		FROM PRO_variant_specification_values vsv 
		INNER JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
		INNER JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'COLOR') AS c ON pv.id = c.variant
	JOIN ( 
		SELECT vsv.PRO_variant_id AS variant, sv.value AS size 
		FROM PRO_variant_specification_values vsv 
		INNER JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
		INNER JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'SIZE') AS s ON pv.id = s.variant
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND ps.id = subcategory_id_in;
END
$func$;

CREATE OR REPLACE FUNCTION FN_GET_SIZ_COL_BRAND(brand_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	PRO_cost NUMERIC, 
	PRO_stock INTEGER, 
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
		p.id AS PRO_code,
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		pv.cost AS PRO_cost, 
		pv.stock AS PRO_stock, 
		pv.is_available AS available, 
		c.color AS color, 
		s.size AS size, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN ( 
		SELECT vsv.PRO_variant_id AS variant, sv.value AS color 
		FROM PRO_variant_specification_values vsv 
		INNER JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
		INNER JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'COLOR') AS c ON pv.id = c.variant
	JOIN ( 
		SELECT vsv.PRO_variant_id AS variant, sv.value AS size 
		FROM PRO_variant_specification_values vsv 
		INNER JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
		INNER JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'SIZE') AS s ON pv.id = s.variant
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND pb.id = brand_id_in;
END
$func$;

CREATE OR REPLACE FUNCTION FN_GET_SIZ_COL_PRODUCT(PRO_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	PRO_cost NUMERIC, 
	PRO_stock INTEGER,
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
		p.id AS PRO_code,
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		pv.cost AS PRO_cost, 
		pv.stock AS PRO_stock, 
		pv.is_available AS available, 
		c.color AS color, 
		s.size AS size, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN ( 
		SELECT vsv.PRO_variant_id AS variant, sv.value AS color 
		FROM PRO_variant_specification_values vsv 
		INNER JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
		INNER JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'COLOR') AS c ON pv.id = c.variant
	JOIN ( 
		SELECT vsv.PRO_variant_id AS variant, sv.value AS size 
		FROM PRO_variant_specification_values vsv 
		INNER JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
		INNER JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'SIZE') AS s ON pv.id = s.variant
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND pv.PRO_id = PRO_id_in
	ORDER BY pv.id;
END
$func$;


/* GET COLORS BY */


CREATE OR REPLACE FUNCTION FN_GET_COL_SUBCAT(subcategory_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	PRO_cost NUMERIC, 
	PRO_stock INTEGER,
	available BOOLEAN, 
	color VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS PRO_code,
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		pv.cost AS PRO_cost, 
		pv.stock AS PRO_stock, 
		pv.is_available AS available, 
		c.color AS color, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN ( 
		SELECT vsv.PRO_variant_id AS variant, sv.value AS color 
		FROM PRO_variant_specification_values vsv 
		INNER JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
		INNER JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'COLOR') AS c ON pv.id = c.variant
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND ps.id = subcategory_id_in;
END
$func$;

CREATE OR REPLACE FUNCTION FN_GET_COL_BRAND(brand_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	PRO_cost NUMERIC, 
	PRO_stock INTEGER,
	available BOOLEAN, 
	color VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS PRO_code,
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		pv.cost AS PRO_cost, 
		pv.stock AS PRO_stock, 
		pv.is_available AS available, 
		c.color AS color, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN ( 
		SELECT vsv.PRO_variant_id AS variant, sv.value AS color 
		FROM PRO_variant_specification_values vsv 
		INNER JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
		INNER JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'COLOR') AS c ON pv.id = c.variant
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND pb.id = brand_id_in;
END
$func$;

CREATE OR REPLACE FUNCTION FN_GET_COL_PRODUCT(PRO_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	PRO_cost NUMERIC, 
	PRO_stock INTEGER,
	available BOOLEAN, 
	color VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS PRO_code,
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		pv.cost AS PRO_cost, 
		pv.stock AS PRO_stock, 
		pv.is_available AS available, 
		c.color AS color, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN ( 
		SELECT vsv.PRO_variant_id AS variant, sv.value AS color 
		FROM PRO_variant_specification_values vsv 
		INNER JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
		INNER JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'COLOR') AS c ON pv.id = c.variant
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND pv.PRO_id = PRO_id_in;
END
$func$;

/* GET SIZES BY */

CREATE OR REPLACE FUNCTION FN_GET_SIZ_SUBCAT(subcategory_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	PRO_cost NUMERIC, 
	PRO_stock INTEGER,
	available BOOLEAN, 
	size VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS PRO_code,
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		pv.cost AS PRO_cost, 
		pv.stock AS PRO_stock, 
		pv.is_available AS available, 
		s.size AS size, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN ( 
		SELECT vsv.PRO_variant_id AS variant, sv.value AS size 
		FROM PRO_variant_specification_values vsv 
		INNER JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
		INNER JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'SIZE') AS s ON pv.id = s.variant
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND ps.id = subcategory_id_in;
END
$func$;

CREATE OR REPLACE FUNCTION FN_GET_SIZ_BRAND(brand_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	PRO_cost NUMERIC, 
	PRO_stock INTEGER,
	available BOOLEAN, 
	size VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS PRO_code,
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		pv.cost AS PRO_cost, 
		pv.stock AS PRO_stock, 
		pv.is_available AS available, 
		s.size AS size, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN ( 
		SELECT vsv.PRO_variant_id AS variant, sv.value AS size 
		FROM PRO_variant_specification_values vsv 
		INNER JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
		INNER JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'SIZE') AS s ON pv.id = s.variant
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND pb.id = brand_id_in;
END
$func$;

CREATE OR REPLACE FUNCTION FN_GET_SIZ_PRODUCT(PRO_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	PRO_cost NUMERIC, 
	PRO_stock INTEGER,
	available BOOLEAN, 
	size VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS PRO_code, 
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		pv.cost AS PRO_cost, 
		pv.stock AS PRO_stock, 
		pv.is_available AS available, 
		s.size AS size, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN ( 
		SELECT vsv.PRO_variant_id AS variant, sv.value AS size 
		FROM PRO_variant_specification_values vsv 
		INNER JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
		INNER JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
		INNER JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
		WHERE sc.name = 'SIZE') AS s ON pv.id = s.variant
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND pv.PRO_id = PRO_id_in;
END
$func$;


/* GET SPECIFICATIONS BY */


CREATE OR REPLACE FUNCTION FN_GET_SPEC_SUBCAT(subcategory_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	specification VARCHAR,
	value VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS PRO_code,
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		sc.name AS specification, 
		sv.value AS value, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN PRO_variant_specification_values vsv ON pv.id = vsv.PRO_variant_id
	JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
	JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
	JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND ps.id = subcategory_id_in;
END
$func$;

CREATE OR REPLACE FUNCTION FN_GET_SPEC_BRAND(brand_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	specification VARCHAR,
	value VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS PRO_code,
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		sc.name AS specification, 
		sv.value AS value, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN PRO_variant_specification_values vsv ON pv.id = vsv.PRO_variant_id
	JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
	JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
	JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND pb.id = brand_id_in;
END
$func$;

CREATE OR REPLACE FUNCTION FN_GET_SPEC_PRODUCT(PRO_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	specification VARCHAR,
	value VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS PRO_code,
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		sc.name AS specification, 
		sv.value AS value, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN PRO_variant_specification_values vsv ON pv.id = vsv.PRO_variant_id
	JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
	JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
	JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND pv.PRO_id = PRO_id_in;
END
$func$;


/* GET VARIANTS DETAILS BY */


CREATE OR REPLACE FUNCTION FN_GET_VARIANTS_DETAILS_SUBCAT(subcategory_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	PRO_cost NUMERIC, 
	PRO_stock INTEGER,
	available BOOLEAN,
	specification VARCHAR,
	value VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS PRO_code,
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		pv.cost AS PRO_cost, 
		pv.stock AS PRO_stock, 
		pv.is_available AS available, 
		sc.name AS specification, 
		sv.value AS value, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN PRO_variant_specification_values vsv ON pv.id = vsv.PRO_variant_id
	JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
	JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
	JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND ps.id = subcategory_id_in;
END
$func$;

CREATE OR REPLACE FUNCTION FN_GET_VARIANTS_DETAILS_BRAND(brand_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	PRO_cost NUMERIC, 
	PRO_stock INTEGER,
	available BOOLEAN,
	specification VARCHAR,
	value VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS PRO_code,
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		pv.cost AS PRO_cost, 
		pv.stock AS PRO_stock, 
		pv.is_available AS available, 
		sc.name AS specification, 
		sv.value AS value, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN PRO_variant_specification_values vsv ON pv.id = vsv.PRO_variant_id
	JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
	JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
	JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND pb.id = brand_id_in;
END
$func$;

CREATE OR REPLACE FUNCTION FN_GET_VARIANTS_DETAILS_PRODUCT(PRO_id_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	PRO_code INTEGER,
	PRO_description VARCHAR,
	PRO_long_description VARCHAR,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	category VARCHAR,
	category_code INTEGER,
	PRO_variant VARCHAR,
	PRO_variant_id INTEGER,
	PRO_cost NUMERIC, 
	PRO_stock INTEGER,
	available BOOLEAN,
	specification VARCHAR,
	value VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
		p.name AS product, 
		p.id AS PRO_code,
		p.description AS PRO_description,
		p.long_description::VARCHAR AS PRO_long_description,
		pb.name AS brand, 
		pb.id AS brand_code, 
		ps.name AS subcategory, 
		ps.id AS subcategory_code, 
		pc.name AS category, 
		pc.id AS category_code, 
		pv.name AS PRO_variant, 
		pv.id AS PRO_variant_id, 
		pv.cost AS PRO_cost, 
		pv.stock AS PRO_stock, 
		pv.is_available AS available, 
		sc.name AS specification, 
		sv.value AS value, 
		date(pv.created_at) AS creation_date
	FROM PRO_variants pv
	JOIN products p ON pv.PRO_id = p.id
	JOIN PRO_variant_specification_values vsv ON pv.id = vsv.PRO_variant_id
	JOIN PRO_specification_values sv ON vsv.PRO_specification_value_id = sv.id
	JOIN PRO_specifications s ON sv.PRO_specification_id = s.id
	JOIN specificaction_constants sc ON s.specification_constant_id = sc.id
	JOIN PRO_brands pb ON p.PRO_brand_id = pb.id
	JOIN PRO_subcategorys ps ON p.PRO_subcategory_id = ps.id
	JOIN PRO_categorys pc ON ps.PRO_category_id = pc.id
	WHERE p.state = TRUE AND pv.PRO_id = PRO_id_in;
END
$func$;

/*************************** FOTO ********************************/

/* GET VARIANTS BY */

CREATE OR REPLACE FUNCTION FN_VARIANT_EXIST(variant_id_in INT) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM pro_variants WHERE id = variant_id_in);
END;
$$ LANGUAGE plpgsql;

-- SELECT variant_exists(1); retorna true o false

/* GET NUMERATION BY VARIANT ID */

CREATE OR REPLACE FUNCTION FN_GET_NUMERATION_PHOTO(variant_id_in INT)
RETURNS INT AS
$func$
DECLARE
    next_number INT;
    photos_count INTEGER;
BEGIN

    SELECT COUNT(*) INTO photos_count FROM pro_photo_configuration WHERE pro_variant_id = variant_id_in;
    
    IF photos_count > 0 THEN
        SELECT COALESCE(MAX(SUBSTRING(name FROM '[0-9]+$')::INT), 0) + 1
        INTO next_number
        FROM PRO_photos
        WHERE name LIKE variant_id_in || '_%';
    ELSE
        next_number := 0;
    END IF;

    RETURN next_number;
END;
$func$
LANGUAGE plpgsql;

-- SELECT get_numeration_photo(1); retorna 0 SI no hay fotos con esa variant y retorna X numero SI existen variantes configuradas

/* ADD PHOTO VARIANT*/

CREATE OR REPLACE FUNCTION FN_ADD_PHOTO_VAR(
    p_size_in FLOAT,
    p_height_in INTEGER,
    p_width_in INTEGER,
    p_type_in VARCHAR(50),
    p_route_in VARCHAR(700),
    p_name_in VARCHAR(500),
    p_pro_variant_id_in INTEGER
)
RETURNS INTEGER AS 
$func$
DECLARE
    v_photo_attribute_id INTEGER;
    v_photo_storage_id INTEGER;
    v_photo_id INTEGER;
	v_photo_configuration_id INTEGER;
BEGIN
	INSERT INTO PRO_photo_attributes(size, height, width, type)
	VALUES (p_size_in, p_height_in, p_width_in, p_type_in)
	RETURNING id INTO v_photo_attribute_id;

	INSERT INTO PRO_photo_storage(route)
	VALUES (p_route_in)
	RETURNING id INTO v_photo_storage_id;
	
	INSERT INTO PRO_photos(name, PRO_photo_attribute_id, PRO_photo_storage_id)
	VALUES (p_name_in, v_photo_attribute_id, v_photo_storage_id)
	RETURNING id INTO v_photo_id;
	
    BEGIN
        INSERT INTO PRO_photo_configuration (PRO_variant_id, PRO_photo_id)
        VALUES (p_pro_variant_id_in, v_photo_id);
        
        v_photo_configuration_id := 1;
    EXCEPTION WHEN OTHERS THEN
        v_photo_configuration_id := 0;
    END;

	RETURN v_photo_configuration_id;
END;
$func$
LANGUAGE plpgsql;


/* DELETE TRIGGER BY VARIANT*/

CREATE OR REPLACE FUNCTION FN_DEL_PHOTO_ON_VARIANT()
RETURNS TRIGGER AS
$func$
DECLARE
    photo_ids INTEGER[];
    attribute_ids INTEGER[];
    storage_ids INTEGER[];
BEGIN
    -- Obtener los IDs de las fotos asociadas a la variante eliminada
    SELECT ARRAY(SELECT PRO_photo_id FROM PRO_photo_configuration WHERE PRO_variant_id = OLD.id) INTO photo_ids;
    
    -- Obtener los IDs de los atributos y rutas de almacenamiento antes de eliminar las fotos
    SELECT ARRAY(SELECT PRO_photo_attribute_id FROM PRO_photos WHERE id = ANY(photo_ids)) INTO attribute_ids;
    SELECT ARRAY(SELECT PRO_photo_storage_id FROM PRO_photos WHERE id = ANY(photo_ids)) INTO storage_ids;
   
    -- Eliminar configuraciones de fotos asociadas
    DELETE FROM PRO_photo_configuration WHERE PRO_variant_id = OLD.id;

    -- Eliminar fotos
    DELETE FROM PRO_photos WHERE id = ANY(photo_ids);
    
    -- Eliminar atributos de fotos asociadas
    DELETE FROM PRO_photo_attributes WHERE id = ANY(attribute_ids);

    -- Eliminar rutas de almacenamiento de fotos asociadas
    DELETE FROM PRO_photo_storage WHERE id = ANY(storage_ids);

    RETURN OLD;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER TR_DEL_PHOTO_ON_VARIANT
BEFORE DELETE ON PRO_variants
FOR EACH ROW
EXECUTE FUNCTION FN_DEL_PHOTO_ON_VARIANT();


/* DELETE TRIGGER BY PHOTO*/

CREATE OR REPLACE FUNCTION FN_DEL_DATA_ON_PHOTO()
RETURNS TRIGGER AS
$func$
BEGIN
    -- Eliminar atributos de fotos asociadas
    DELETE FROM PRO_photo_attributes WHERE id = OLD.PRO_photo_attribute_id;

    -- Eliminar rutas de almacenamiento de fotos asociadas
    DELETE FROM PRO_photo_storage WHERE id = OLD.PRO_photo_storage_id;

    RETURN OLD;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER TR_DEL_DATA_ON_PHOTO
AFTER DELETE ON PRO_photos
FOR EACH ROW
EXECUTE FUNCTION FN_DEL_DATA_ON_PHOTO();
