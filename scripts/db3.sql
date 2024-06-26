CREATE DATABASE sales;
\c sales

CREATE TABLE categorys(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);

CREATE TABLE subcategorys(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    category_id INTEGER NOT NULL
);

ALTER TABLE subcategorys ADD CONSTRAINT fk_subcategorys_categorys FOREIGN KEY (category_id) REFERENCES categorys (id);

CREATE TABLE brands(
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
    subcategory_id INTEGER NOT NULL,
	brand_id INTEGER NOT NULL
);

ALTER TABLE products ADD CONSTRAINT fk_products_subcategorys FOREIGN KEY (subcategory_id) REFERENCES subcategorys (id);
ALTER TABLE products ADD CONSTRAINT fk_products_brands FOREIGN KEY (brand_id) REFERENCES brands (id);

CREATE TABLE variants(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    stock INTEGER NOT NULL,
    cost NUMERIC NOT NULL,
    isAvailable BOOLEAN NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    product_id INTEGER NOT NULL
);

ALTER TABLE variants ADD CONSTRAINT fk_variants_products FOREIGN KEY (product_id) REFERENCES products (id);

CREATE TABLE specifications(
    id SERIAL NOT NULL PRIMARY KEY,
    color BOOLEAN NOT NULL,
    size BOOLEAN NOT NULL,
    text BOOLEAN NOT NULL,
    name VARCHAR NOT NULL,
	information VARCHAR NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    variant_id INTEGER NOT NULL
);

ALTER TABLE specifications ADD CONSTRAINT fk_specifications_variants FOREIGN KEY (variant_id) REFERENCES variants (id);

CREATE TABLE userTypes(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL
);

CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
    username VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
	type_id INTEGER NOT NULL
);

ALTER TABLE users ADD CONSTRAINT fk_users_usertypes FOREIGN KEY (type_id) REFERENCES userTypes (id);

CREATE TABLE statesales(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL
);

CREATE TABLE sales(
    id SERIAL NOT NULL PRIMARY KEY,
    sales_code VARCHAR(250) NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    state_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL
);

ALTER TABLE sales ADD CONSTRAINT fk_sales_users FOREIGN KEY (state_id) REFERENCES users (id);
ALTER TABLE sales ADD CONSTRAINT fk_sales_statesales FOREIGN KEY (user_id) REFERENCES statesales (id);

CREATE TABLE presales(
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
    FUNCIONES: LAS FUNCIONES DE ESTADO HAY QUE CORREGIRLAS AUN, CASCADA?
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

CREATE OR REPLACE FUNCTION editCategory(id_in INTEGER, name_in VARCHAR)
RETURNS INTEGER AS
$func$
DECLARE
	c_edit_count INTEGER;	
BEGIN
	UPDATE categorys SET name = name_in, modified_at = CURRENT_TIMESTAMP WHERE id = id_in
	RETURNING * INTO c_edit_count;
	RETURN c_edit_count;
END;
$func$
LANGUAGE plpgsql;

--CATEGORYS: EXAMPLES
-- SELECT addCategory('pantalones');
-- SELECT * FROM getCategorys();
-- SELECT deleteCategory(5);
-- SELECT deactivateCategory(4); -- FALSE
-- SELECT activateCategory(4); -- TRUE
-- SELECT editCategory(4, 'CARROS');


--SUBCATEGORYS

CREATE OR REPLACE FUNCTION getSubcategorys()
RETURNS TABLE(id INTEGER, name VARCHAR, category VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT sc.id AS id, sc.name AS name, c.name as category, sc.state AS state, date(sc.created_at) AS creation_date 
    FROM subcategorys AS sc
    INNER JOIN categorys AS c ON c.id = sc.category_id;
END
$func$;

CREATE OR REPLACE FUNCTION addSubcategory(name_in VARCHAR, categoryId_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	sc_new_id INTEGER;
BEGIN
	INSERT INTO subcategorys(name, state, created_at, modified_at, category_id) VALUES (name_in, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, categoryId_in)
	RETURNING id INTO sc_new_id;
	RETURN sc_new_id;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deleteSubcategory(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	sc_delete_count INTEGER;	
BEGIN
	DELETE FROM subcategorys where id = id_in
	RETURNING * INTO sc_delete_count;
	RETURN sc_delete_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION activateSubcategory(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	sc_activate_count INTEGER;	
BEGIN
	UPDATE subcategorys SET state = TRUE WHERE id = id_in
	RETURNING * INTO sc_activate_count;
	RETURN sc_activate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deactivateSubcategory(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	sc_deactivate_count INTEGER;	
BEGIN
	UPDATE subcategorys SET state = FALSE WHERE id = id_in
	RETURNING * INTO sc_deactivate_count;
	RETURN sc_deactivate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION editNameSubcategory(id_in INTEGER, name_in VARCHAR)
RETURNS INTEGER AS
$func$
DECLARE
	sc_edit_count INTEGER;	
BEGIN
	UPDATE subcategorys SET name = name_in, modified_at = CURRENT_TIMESTAMP WHERE id = id_in
	RETURNING * INTO sc_edit_count;
	RETURN sc_edit_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION editCategorySubcategory(id_in INTEGER, categoryId_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	sc_edit_count INTEGER;	
BEGIN
	UPDATE subcategorys SET category_id = categoryId_in, modified_at = CURRENT_TIMESTAMP WHERE id = id_in
	RETURNING * INTO sc_edit_count;
	RETURN sc_edit_count;
END;
$func$
LANGUAGE plpgsql;


--SUBCATEGORYS: EXAMPLES
-- SELECT * FROM getSubcategorys();
-- SELECT addSubcategory('buzos', 1);
-- SELECT deleteSubcategory(1);
-- SELECT deactivateSubcategory(1); -- FALSE
-- SELECT activateSubcategory(1); -- TRUE
-- SELECT editNameSubcategory(1,'buzos');
-- SELECT editCategorySubcategory(1, 2);

--BRANDS

CREATE OR REPLACE FUNCTION getBrands()
RETURNS TABLE(id INTEGER, name VARCHAR, state BOOLEAN, created_at DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT b.id as id, b.name as name, b.state as state, date(b.created_at) as creation_date FROM brands as b;
END
$func$;

CREATE OR REPLACE FUNCTION addBrand(name_in VARCHAR)
RETURNS INTEGER AS 
$func$
DECLARE
	b_new_id INTEGER;
BEGIN
	INSERT INTO brands(name, state, created_at, modified_at) VALUES (name_in, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
	RETURNING id INTO b_new_id;
	RETURN b_new_id;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deleteBrand(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	b_delete_count INTEGER;	
BEGIN
	DELETE FROM brands where id = id_in
	RETURNING * INTO b_delete_count;
	RETURN b_delete_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION activateBrand(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	b_activate_count INTEGER;	
BEGIN
	UPDATE brands SET state = TRUE WHERE id = id_in
	RETURNING * INTO b_activate_count;
	RETURN b_activate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deactivateBrand(id_in INTEGER)
RETURNS INTEGER AS
$func$
DECLARE
	b_deactivate_count INTEGER;	
BEGIN
	UPDATE brands SET state = FALSE WHERE id = id_in
	RETURNING * INTO b_deactivate_count;
	RETURN b_deactivate_count;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION editBrand(id_in INTEGER, name_in VARCHAR)
RETURNS INTEGER AS
$func$
DECLARE
	b_edit_count INTEGER;	
BEGIN
	UPDATE brands SET name = name_in, modified_at = CURRENT_TIMESTAMP WHERE id = id_in
	RETURNING * INTO b_edit_count;
	RETURN b_edit_count;
END;
$func$
LANGUAGE plpgsql;

--BRANDS: EXAMPLES
-- SELECT addBrand('American Cold');
-- SELECT * FROM getBrands();
-- SELECT deleteBrand(2);
-- SELECT deactivateBrand(1);
-- SELECT activateBrand(1);
-- SELECT editBrand(1, 'American Cold');

--PRODUCTS

CREATE OR REPLACE FUNCTION addProduct(name_in VARCHAR, code_in VARCHAR, subcategoryId_in INTEGER, brandId_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	p_new_id INTEGER;
BEGIN
	INSERT INTO products(name, code, state, created_at, modified_at, subcategory_id, brand_id) VALUES (name_in, code_in, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, subcategoryId_in, brandId_in)
	RETURNING id INTO p_new_id;
	RETURN p_new_id;
END;
$func$
LANGUAGE plpgsql;


--PRODUCTS: EXAMPLES
-- SELECT addProduct('Pantalon Hombre Basement', 'PRO12', 1, 1);

--VARIANTS

CREATE OR REPLACE FUNCTION addVariant(name_in VARCHAR, stock_in INTEGER, cost_in NUMERIC, productId_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	v_new_id INTEGER;
BEGIN
	INSERT INTO variants(name, stock, cost, isAvailable, state, created_at, modified_at, product_id) VALUES (name_in, stock_in, cost_in, TRUE, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, productId_in)
	RETURNING id INTO v_new_id;
	RETURN v_new_id;
END;
$func$
LANGUAGE plpgsql;

--VARIANTS: EXAMPLES
-- SELECT addVariant('PANTALON BEIGE 32', 10, 59.9, 1);
-- SELECT addVariant('PANTALON BEIGE 34', 10, 59.9, 1);
-- SELECT addVariant('PANTALON BEIGE 36', 10, 59.9, 1);
-- SELECT addVariant('PANTALON BLUE 30', 10, 59.9, 1);
-- SELECT addVariant('PANTALON BLUE 32', 10, 59.9, 1);
-- SELECT addVariant('PANTALON BLUE 34', 10, 59.9, 1);


--SPECIFICATIONS

CREATE OR REPLACE FUNCTION addSpecification(color_in BOOLEAN, size_in BOOLEAN, text_in BOOLEAN, name_in VARCHAR, information_in VARCHAR, variantId_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	s_new_id INTEGER;
BEGIN
	INSERT INTO specifications(color, size, text, name, information, state, created_at, modified_at, variant_id) VALUES (color_in, size_in, text_in, name_in, information_in, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, variantId_in)
	RETURNING id INTO s_new_id;
	RETURN s_new_id;
END;
$func$
LANGUAGE plpgsql;


/*
-- the specifications works like attributes but idk i didnt write that name in first place.. whatever.
The variant: PANTALON BEIGE 32 have 2 attributes, the first one is BEIGE and the second one is 32
and add this two below here and 2 more attributes but different - text type

SELECT addSpecification(TRUE, FALSE, FALSE, 'BEIGE', 'Buzo color beige', 1);
SELECT addSpecification(FALSE, TRUE, FALSE, '32', 'Talla 32', 1);
SELECT addSpecification(FALSE, FALSE, TRUE, 'Material', '55% Lino, 45% Algodón', 1);
SELECT addSpecification(FALSE, FALSE, TRUE, 'Condición del Producto', 'Nuevo', 1);
SELECT addSpecification(TRUE, FALSE, FALSE, 'BEIGE', 'Buzo color beige', 2);
SELECT addSpecification(FALSE, TRUE, FALSE, '34', 'Talla 34', 2);
SELECT addSpecification(TRUE, FALSE, FALSE, 'BEIGE', 'Buzo color beige', 3);
SELECT addSpecification(FALSE, TRUE, FALSE, '36', 'Talla 36', 3);

SELECT addSpecification(TRUE, FALSE, FALSE, 'BLUE', 'Buzo color blue', 4);
SELECT addSpecification(FALSE, TRUE, FALSE, '30', 'Talla 30', 4);
SELECT addSpecification(TRUE, FALSE, FALSE, 'BLUE', 'Buzo color blue', 5);
SELECT addSpecification(FALSE, TRUE, FALSE, '32', 'Talla 32', 5);
SELECT addSpecification(TRUE, FALSE, FALSE, 'BLUE', 'Buzo color blue', 6);
SELECT addSpecification(FALSE, TRUE, FALSE, '34', 'Talla 34', 6);
*/

/*

SELECT addBrand('Starter');
SELECT addProduct('Pantalón Cargo Hombre Starter', 'PRO13', 1, 3);

SELECT addVariant('PANTALON NEGRO 30', 10, 69.9, 3);
SELECT addVariant('PANTALON NEGRO 32', 10, 69.9, 3);

SELECT addSpecification(TRUE, FALSE, FALSE, 'BLACK', 'Pantalon color black', 7);
SELECT addSpecification(FALSE, TRUE, FALSE, '30', 'Talla 30', 7);
SELECT addSpecification(TRUE, FALSE, FALSE, 'BLACK', 'Pantalon color black', 8);
SELECT addSpecification(FALSE, TRUE, FALSE, '32', 'Talla 32', 8);

*/


/*
----- FINDING THE TYPE OF SPECIFICATIONS
*/

-- by Subcategory

CREATE OR REPLACE FUNCTION searchSpecificationsBySubcategory(subcategoryId_in INTEGER)
RETURNS TABLE(specification_type INTEGER)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT
    CASE
        WHEN COUNT(DISTINCT CASE WHEN s.color THEN s.id END) > 0 AND COUNT(DISTINCT CASE WHEN s.size THEN s.id END) = 0 THEN 1  -- ONLY COLOR
        WHEN COUNT(DISTINCT CASE WHEN s.size THEN s.id END) > 0 AND COUNT(DISTINCT CASE WHEN s.color THEN s.id END) = 0 THEN 2  -- ONLY SIZE
        WHEN COUNT(DISTINCT CASE WHEN s.color THEN s.id END) > 0 AND COUNT(DISTINCT CASE WHEN s.size THEN s.id END) > 0 THEN 3  -- COLOR AND SIZE
        WHEN COUNT(DISTINCT CASE WHEN s.text THEN s.id END) > 0 AND COUNT(DISTINCT CASE WHEN s.color THEN s.id END) = 0 AND COUNT(DISTINCT CASE WHEN s.size THEN s.id END) = 0 THEN 4  -- ONLY TEXT
        ELSE 0  -- NO SPEC
	    END AS specification_type
	FROM products p
	JOIN variants v ON p.id = v.product_id
	LEFT JOIN specifications s ON v.id = s.variant_id
	WHERE p.subcategory_id = subcategoryId_in;

	RETURN;
END
$func$;

-- by Brand

CREATE OR REPLACE FUNCTION searchSpecificationsByBrand(brandId_in INTEGER)
RETURNS TABLE(specification_type INTEGER)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT
    CASE
        WHEN COUNT(DISTINCT CASE WHEN s.color THEN s.id END) > 0 AND COUNT(DISTINCT CASE WHEN s.size THEN s.id END) = 0 THEN 1  -- ONLY COLOR
        WHEN COUNT(DISTINCT CASE WHEN s.size THEN s.id END) > 0 AND COUNT(DISTINCT CASE WHEN s.color THEN s.id END) = 0 THEN 2  -- ONLY SIZE
        WHEN COUNT(DISTINCT CASE WHEN s.color THEN s.id END) > 0 AND COUNT(DISTINCT CASE WHEN s.size THEN s.id END) > 0 THEN 3  -- COLOR AND SIZE
        WHEN COUNT(DISTINCT CASE WHEN s.text THEN s.id END) > 0 AND COUNT(DISTINCT CASE WHEN s.color THEN s.id END) = 0 AND COUNT(DISTINCT CASE WHEN s.size THEN s.id END) = 0 THEN 4  -- ONLY TEXT
        ELSE 0  -- NO SPEC
	    END AS specification_type
	FROM products p
	JOIN variants v ON p.id = v.product_id
	LEFT JOIN specifications s ON v.id = s.variant_id
	WHERE p.brand_id = brandId_in;
	RETURN;
END
$func$;

-- by product

CREATE OR REPLACE FUNCTION searchSpecificationsByProduct(productId_in INTEGER)
RETURNS TABLE(specification_type INTEGER)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT
    CASE
        WHEN COUNT(DISTINCT CASE WHEN s.color THEN s.id END) > 0 AND COUNT(DISTINCT CASE WHEN s.size THEN s.id END) = 0 THEN 1  -- ONLY COLOR
        WHEN COUNT(DISTINCT CASE WHEN s.size THEN s.id END) > 0 AND COUNT(DISTINCT CASE WHEN s.color THEN s.id END) = 0 THEN 2  -- ONLY SIZE
        WHEN COUNT(DISTINCT CASE WHEN s.color THEN s.id END) > 0 AND COUNT(DISTINCT CASE WHEN s.size THEN s.id END) > 0 THEN 3  -- COLOR AND SIZE
        WHEN COUNT(DISTINCT CASE WHEN s.text THEN s.id END) > 0 AND COUNT(DISTINCT CASE WHEN s.color THEN s.id END) = 0 AND COUNT(DISTINCT CASE WHEN s.size THEN s.id END) = 0 THEN 4  -- ONLY TEXT
        ELSE 0  -- NO SPEC
	    END AS specification_type
	FROM products p
	JOIN variants v ON p.id = v.product_id
	LEFT JOIN specifications s ON v.id = s.variant_id
	WHERE p.id = productId_in;

	RETURN;
END
$func$;


/*
--------SEARCHS SIZES AND COLORS -----------
*/

CREATE OR REPLACE FUNCTION getSizesColorsProductsByBrand(brandId_in INTEGER)
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
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	cat.name AS category,
	cat.id as category_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	v.cost AS product_cost,
	v.stock as product_stock,
	v.isavailable AS availabe, 
	c.color AS color, 
	s.size AS size, 
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant,s.name AS color from specifications AS s WHERE s.color = TRUE
	) AS c ON v.id = c.variant
	JOIN (
		SELECT s.variant_id as variant, s.name AS size from specifications AS s WHERE s.size = TRUE
	) AS s ON v.id = s.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	JOIN categorys AS cat ON sc.category_id = cat.id
	WHERE p.state = TRUE AND b.id = brandId_in;
END
$func$;

-- this function is a search by the brand
-- SELECT * FROM getSizesColorsProductsByBrand(3);

CREATE OR REPLACE FUNCTION getSizesColorsProductsBySubcategory(subcategoryId_in INTEGER)
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
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	cat.name AS category,
	cat.id as category_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	v.cost AS product_cost, 
	v.stock as product_stock,
	v.isavailable AS availabe, 
	c.color AS color, 
	s.size AS size, 
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant,s.name AS color from specifications AS s WHERE s.color = TRUE
	) AS c ON v.id = c.variant
	JOIN (
		SELECT s.variant_id as variant, s.name AS size from specifications AS s WHERE s.size = TRUE
	) AS s ON v.id = s.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	JOIN categorys AS cat ON sc.category_id = cat.id
	WHERE p.state = TRUE AND sc.id = subcategoryId_in;
END
$func$;

-- this function is a search by the subcategory
-- SELECT * FROM getSizesColorsProductsBySubcategory(1);

CREATE OR REPLACE FUNCTION getSizesColorsDataByProduct(productId_in INTEGER)
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
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	cat.name AS category,
	cat.id as category_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	v.cost AS product_cost, 
	v.stock as product_stock,
	v.isavailable AS availabe, 
	c.color AS color, 
	s.size AS size, 
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant,s.name AS color from specifications AS s WHERE s.color = TRUE
	) AS c ON v.id = c.variant
	JOIN (
		SELECT s.variant_id as variant, s.name AS size from specifications AS s WHERE s.size = TRUE
	) AS s ON v.id = s.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	JOIN categorys AS cat ON sc.category_id = cat.id
	WHERE product_id = productId_in AND p.state = TRUE
	ORDER BY v.id;
END
$func$;

-- this function is a kind of search where see the data from variants and his specifications by product
-- SELECT * FROM getSizesColorsDataByProduct(1);


/*
--------SEARCHS SIZES -----------
*/


CREATE OR REPLACE FUNCTION getSizesProductsByBrand(brandId_in INTEGER)
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
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	cat.name AS category,
	cat.id as category_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	v.cost AS product_cost,
	v.stock as product_stock,
	v.isavailable AS availabe, 
	c.color AS color, 
	s.size AS size, 
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant, s.name AS size from specifications AS s WHERE s.size = TRUE
	) AS s ON v.id = s.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	JOIN categorys AS cat ON sc.category_id = cat.id
	WHERE p.state = TRUE AND b.id = brandId_in;
END
$func$;



CREATE OR REPLACE FUNCTION getSizesProductsBySubcategory(subcategoryId_in INTEGER)
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
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	cat.name AS category,
	cat.id as category_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	v.cost AS product_cost, 
	v.stock as product_stock,
	v.isavailable AS availabe, 
	c.color AS color, 
	s.size AS size, 
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant, s.name AS size from specifications AS s WHERE s.size = TRUE
	) AS s ON v.id = s.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	JOIN categorys AS cat ON sc.category_id = cat.id
	WHERE p.state = TRUE AND sc.id = subcategoryId_in;
END
$func$;


CREATE OR REPLACE FUNCTION getSizesDataByProduct(productId_in INTEGER)
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
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	cat.name AS category,
	cat.id as category_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	v.cost AS product_cost, 
	v.stock as product_stock,
	v.isavailable AS availabe, 
	c.color AS color, 
	s.size AS size, 
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant, s.name AS size from specifications AS s WHERE s.size = TRUE
	) AS s ON v.id = s.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	JOIN categorys AS cat ON sc.category_id = cat.id
	WHERE product_id = productId_in AND p.state = TRUE
	ORDER BY v.id;
END
$func$;



/*
--------SEARCHS COLORS -----------
*/


CREATE OR REPLACE FUNCTION getColorsProductsByBrand(brandId_in INTEGER)
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
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
	p.name AS product,
	p.id AS product_code,
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	cat.name AS category,
	cat.id as category_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	v.cost AS product_cost,
	v.stock as product_stock,
	v.isavailable AS availabe, 
	c.color AS color, 
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant,s.name AS color from specifications AS s WHERE s.color = TRUE
	) AS c ON v.id = c.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	JOIN categorys AS cat ON sc.category_id = cat.id
	WHERE p.state = TRUE AND b.id = brandId_in;
END
$func$;

CREATE OR REPLACE FUNCTION getColorsProductsBySubcategory(subcategoryId_in INTEGER)
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
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT
	p.name AS product,
	p.id AS product_code,
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	cat.name AS category,
	cat.id as category_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	v.cost AS product_cost, 
	v.stock as product_stock,
	v.isavailable AS availabe, 
	c.color AS color, 
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant,s.name AS color from specifications AS s WHERE s.color = TRUE
	) AS c ON v.id = c.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	JOIN categorys AS cat ON sc.category_id = cat.id
	WHERE p.state = TRUE AND sc.id = subcategoryId_in;
END
$func$;


CREATE OR REPLACE FUNCTION getColorsDataByProduct(productId_in INTEGER)
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
	creation_date DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
	p.name AS product,
	p.id AS product_code,
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	cat.name AS category,
	cat.id as category_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	v.cost AS product_cost, 
	v.stock as product_stock,
	v.isavailable AS availabe, 
	c.color AS color, 
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant,s.name AS color from specifications AS s WHERE s.color = TRUE
	) AS c ON v.id = c.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	JOIN categorys AS cat ON sc.category_id = cat.id
	WHERE product_id = productId_in AND p.state = TRUE
	ORDER BY v.id;
END
$func$;


/*
--------SEARCHS DESCRIPTIONS -----------
*/


CREATE OR REPLACE FUNCTION getDescriptionsProductsByBrand(brandId_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	product_code INTEGER,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	product_variant VARCHAR,
	product_variant_id INTEGER,
	name VARCHAR,
	information VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
	p.name AS product,
	p.id AS product_code,
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	s.name AS name, 
	s.information AS information,
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant,s.name AS name, s.information AS information from specifications AS s WHERE s.text = TRUE
	) AS s ON v.id = s.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	JOIN categorys AS cat ON sc.category_id = cat.id
	WHERE p.state = TRUE AND b.id = brandId_in;
END
$func$;

CREATE OR REPLACE FUNCTION getDescriptionsProductsBySubcategory(subcategoryId_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	product_code INTEGER,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	product_variant VARCHAR,
	product_variant_id INTEGER,
	name VARCHAR,
	information VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
	p.name AS product,
	p.id AS product_code,
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	s.name AS name, 
	s.information AS information,
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant,s.name AS name, s.information AS information from specifications AS s WHERE s.text = TRUE
	) AS s ON v.id = s.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	JOIN categorys AS cat ON sc.category_id = cat.id
	WHERE p.state = TRUE AND sc.id = subcategoryId_in;
END
$func$;

CREATE OR REPLACE FUNCTION getDescriptionsDataByProduct(productId_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	product_code INTEGER,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	product_variant VARCHAR,
	product_variant_id INTEGER,
	name VARCHAR,
	information VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
	p.name AS product,
	p.id AS product_code,
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	s.name AS name, 
	s.information AS information,
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant,s.name AS name, s.information AS information from specifications AS s WHERE s.text = TRUE
	) AS s ON v.id = s.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	WHERE product_id = productId_in AND p.state = TRUE
	ORDER BY v.id;
END
$func$;


/*
--------SEARCHS VARIANTS DESCRIPTIONS -----------
*/


CREATE OR REPLACE FUNCTION getVariantsDescriptionsProductsByBrand(brandId_in INTEGER)
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
	name VARCHAR,
	information VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
	p.name AS product,
	p.id AS product_code,
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	cat.name AS category,
	cat.id as category_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	v.cost AS product_cost,
	v.stock as product_stock,
	v.isavailable AS availabe, 
	s.name AS name, 
	s.information AS information,
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant,s.name AS name, s.information AS information from specifications AS s WHERE s.text = TRUE
	) AS s ON v.id = s.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	JOIN categorys AS cat ON sc.category_id = cat.id
	WHERE p.state = TRUE AND b.id = brandId_in;
END
$func$;

CREATE OR REPLACE FUNCTION getVariantsDescriptionsProductsBySubcategory(subcategoryId_in INTEGER)
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
	name VARCHAR,
	information VARCHAR,
	creation_date DATE
)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT
	p.name AS product,
	p.id AS product_code,
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	cat.name AS category,
	cat.id as category_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	v.cost AS product_cost, 
	v.stock as product_stock,
	v.isavailable AS availabe, 
	s.name AS name, 
	s.information AS information,
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant,s.name AS name, s.information AS information from specifications AS s WHERE s.text = TRUE
	) AS s ON v.id = s.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	JOIN categorys AS cat ON sc.category_id = cat.id
	WHERE p.state = TRUE AND sc.id = subcategoryId_in;
END
$func$;


CREATE OR REPLACE FUNCTION getVariantsDescriptionsDataByProduct(productId_in INTEGER)
RETURNS TABLE(
	product VARCHAR, 
	product_code INTEGER,
	brand VARCHAR,
	brand_code INTEGER,
	subcategory VARCHAR,
	subcategory_code INTEGER,
	product_variant VARCHAR,
	product_variant_id INTEGER,
	product_cost NUMERIC, 
	product_stock INTEGER,
	available BOOLEAN, 
	name VARCHAR,
	information VARCHAR,
	creation_date DATE)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT 
	p.name AS product,
	p.id AS product_code,
	b.name AS brand,
	b.id AS brand_code,
	sc.name AS subcategory,
	sc.id AS subcategory_code,
	v.name AS product_variant, 
	v.id AS product_variant_id,
	v.cost AS product_cost, 
	v.stock as product_stock,
	v.isavailable AS availabe, 
	s.name AS name, 
	s.information AS information,
	date(v.created_at) AS creation_date 
	FROM variants AS v
	JOIN products AS p ON v.product_id = p.id
	JOIN (
		SELECT s.variant_id as variant,s.name AS name, s.information AS information from specifications AS s WHERE s.text = TRUE
	) AS s ON v.id = s.variant
	JOIN brands AS b ON p.brand_id = b.id
	JOIN subcategorys AS sc ON p.subcategory_id = sc.id
	WHERE product_id = productId_in AND p.state = TRUE
	ORDER BY v.id;
END
$func$;


/*

-- ADDING SOME PRODUCTS(2) DATA..

SELECT addcategory('tecnologia');

SELECT addsubcategory('consolas',3);

SELECT addbrand('Nintendo');
SELECT addbrand('Sony');

SELECT addproduct('Consola PS5 Standard', 'PROD00010',3,6);
SELECT addproduct('Consola Nintendo Switch Oled Edición Especial Pokemon Scarlet and Violet', 'PROD00011',3,5);

SELECT addVariant('Consola PS5 Standard', 100, 2900.00, 5);
SELECT addVariant('Consola Nintendo Switch Oled Edición Especial Pokemon Scarlet and Viole', 100, 1499.00, 6);

SELECT addSpecification(FALSE, FALSE, TRUE, 'País de origen', 'China', 11);
SELECT addSpecification(FALSE, FALSE, TRUE, 'Conexión a Internet', 'Wifi/LAN', 11);

SELECT addSpecification(FALSE, FALSE, TRUE, 'País de origen', 'China', 12);
SELECT addSpecification(FALSE, FALSE, TRUE, 'Capacidad de almacenamiento', '64GB', 12);

*/

/*
-------------------- USERS --------------------
*/

CREATE OR REPLACE FUNCTION addUserType(name_in VARCHAR)
RETURNS INTEGER AS 
$func$
DECLARE
	ut_new_id INTEGER;
BEGIN
	INSERT INTO usertypes (name) VALUES (name_in)
	RETURNING id INTO ut_new_id;
	RETURN ut_new_id;
END;
$func$
LANGUAGE plpgsql;

SELECT addUserType('admin');
SELECT addUserType('client');

-- CREATION OF USERS (ADMINS AND CLIENTS)

CREATE OR REPLACE FUNCTION addUserAdmin(firstname_in VARCHAR, lastname_in VARCHAR, username_in VARCHAR, password_in VARCHAR, email_in VARCHAR)
RETURNS INTEGER AS 
$func$
DECLARE
	u_new_id INTEGER;
BEGIN
	INSERT INTO users (firstname, lastname, username, password, email, state, created_at, modified_at,type_id) VALUES (firstname_in, lastname_in, username_in, password_in, email_in, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1)
	RETURNING id INTO u_new_id;
	RETURN u_new_id;
END;
$func$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION addUserClient(firstname_in VARCHAR, lastname_in VARCHAR, username_in VARCHAR, password_in VARCHAR, email_in VARCHAR)
RETURNS INTEGER AS 
$func$
DECLARE
	u_new_id INTEGER;
BEGIN
	INSERT INTO users (firstname, lastname, username, password, email, state, created_at, modified_at,type_id) VALUES (firstname_in, lastname_in, username_in, password_in, email_in, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2)
	RETURNING id INTO u_new_id;
	RETURN u_new_id;
END;
$func$
LANGUAGE plpgsql;

-- USER CREATION AND AUTHENTICATION

CREATE OR REPLACE FUNCTION signupUser (firstname_in VARCHAR, lastname_in VARCHAR, username_in VARCHAR, password_in VARCHAR, email_in VARCHAR, typeId_in INTEGER)
RETURNS INTEGER AS 
$func$
DECLARE
	u_new_id INTEGER;
BEGIN
	INSERT INTO users (firstname, lastname, username, password, email, state, created_at, modified_at, type_id) VALUES (firstname_in, lastname_in, username_in, password_in, email_in, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, typeId_in)
	RETURNING id INTO u_new_id;
	RETURN u_new_id;
END;
$func$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION signinUser (username_in VARCHAR)
	RETURNS TABLE(id INTEGER, firstname VARCHAR, lastname VARCHAR, username VARCHAR, password VARCHAR, email VARCHAR, state BOOLEAN, type VARCHAR)
LANGUAGE plpgsql AS
$func$
BEGIN
	RETURN QUERY
	SELECT u.id AS id, u.firstname AS firstname, u.lastname AS lastname, u.username AS username, u.password AS password, u.email AS email, u.state AS state, ut.name AS type 
	FROM users as u 
	INNER JOIN usertypes as ut on u.type_id = ut.id
	WHERE u.username = username_in;
	-- SI NO EXISTE EL USUARIO EN LA DATA, ENVIO UNA EXCEPCION CONTROLADA DE CODIGO 'P0001'
    IF NOT FOUND THEN
		RAISE EXCEPTION 'USER NOT FOUND';
    END IF;
END
$func$;

/*
-------------------- SALES --------------------
*/

CREATE OR REPLACE FUNCTION addSaleState(name_in VARCHAR)
RETURNS INTEGER AS 
$func$
DECLARE
	ss_new_id INTEGER;
BEGIN
	INSERT INTO statesales (name) VALUES (name_in)
	RETURNING id INTO ss_new_id;
	RETURN ss_new_id;
END;
$func$
LANGUAGE plpgsql;

SELECT addSaleState('pendiente');
SELECT addSaleState('pagada');
SELECT addSaleState('cancelada');

	