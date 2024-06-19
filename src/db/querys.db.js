
/************************* BRANDS ****************************/
// GET all
const get_PRO_brands = 'SELECT * FROM get_PRO_brands();';

// POST one
const add_PRO_brand = 'add_PRO_brand';

// PUT one
const edit_PRO_brand = 'edit_PRO_brand';

// GET one
const get_PRO_brand = 'get_PRO_brand';

// PUT one
const delete_PRO_brand = 'delete_PRO_brand';

// PUT one
const activate_PRO_brand = 'activate_PRO_brand';

// PUT one
const deactivate_PRO_brand = 'deactivate_PRO_brand';

/************************* CATEGORY ****************************/
// GET all
const get_PRO_categorys = 'SELECT * FROM get_PRO_categorys();';

// POST one
const add_PRO_category = 'add_PRO_category';

// PUT one
const edit_PRO_category = 'edit_PRO_category';

// GET one
const get_PRO_category = 'get_PRO_category';

// PUT one
const delete_PRO_category = 'delete_PRO_category';

// PUT one
const activate_PRO_category = 'activate_PRO_category';

// PUT one
const deactivate_PRO_category = 'deactivate_PRO_category';

/************************* SUBCATEGORYS ****************************/
// GET all
const get_PRO_subcategorys = 'SELECT * FROM get_PRO_subcategorys();';

// POST one
const add_PRO_subcategory = 'add_PRO_subcategory';

// PUT one
const edit_PRO_subcategory = 'edit_PRO_subcategory';

// GET one
const get_PRO_subcategory = 'get_PRO_subcategory';

// PUT one
const delete_PRO_subcategory = 'delete_PRO_subcategory';

// PUT one
const activate_PRO_subcategory = 'activate_PRO_subcategory';

// PUT one
const deactivate_PRO_subcategory = 'deactivate_PRO_subcategory';

/************************* PRODUCTS ****************************/
// POST one
const add_product = 'add_product';

/************************* VARIANTS && VARIANT SPECIFICATION VALUES ****************************/
// POST one
const add_PRO_variant = 'add_PRO_variant';

// POST one
const add_PRO_variant_specification_value = 'add_PRO_variant_specification_value';

// DELETE many
const delete_PRO_variant_specification_value = 'delete_PRO_variant_specification_value';

// DELETE one
const delete_PRO_variant = 'delete_PRO_variant';

// GET true or false
const variant_exist = 'SELECT variant_exists($1)';

/************************* SPECIFICATIONS ****************************/
// POST one
const add_PRO_specification = 'add_PRO_specification';

// POST one
const add_PRO_specification_value = 'add_PRO_specification_value';

/************************* PHOTOS ****************************/
// GET true or false
const get_numeration_photo = 'SELECT get_numeration_photo($1)';
const add_photo_variant = 'add_photo_variant';

/************************* SEARCH ****************************/
// find type of product
const search_spectifications_subcategory = '* FROM search_spectifications_subcategory';
const search_spectifications_brand = '* FROM search_spectifications_brand';
const search_spectifications_product = '* FROM search_spectifications_product';

// search by colors and sizes

const get_sizes_colors_bySubcategory = '* FROM get_sizes_colors_bySubcategory';
const get_sizes_colors_byBrand = '* FROM get_sizes_colors_byBrand';
const get_sizes_colors_byProduct = '* FROM get_sizes_colors_byProduct';

// search by sizes

const get_sizes_bySubcategory = '* FROM get_sizes_bySubcategory';
const get_sizes_byBrand = '* FROM get_sizes_byBrand';
const get_sizes_byProduct = '* FROM get_sizes_byProduct';

// search by colors

const get_colors_bySubcategory = '* FROM get_colors_bySubcategory';
const get_colors_byBrand = '* FROM get_colors_byBrand';
const get_colors_byProduct = '* FROM get_colors_byProduct';

// search by descriptions (extra)

const get_specifications_bySubcategory = '* FROM get_specifications_bySubcategory';
const get_specifications_byBrand = '* FROM get_specifications_byBrand';
const get_specifications_byProduct = '* FROM get_specifications_byProduct';

// search variants descriptions (only text)

const get_variants_details_bySubcategory = '* FROM get_variants_details_bySubcategory';
const get_variants_details_byBrand = '* FROM get_variants_details_byBrand';
const get_variants_details_byProduct = '* FROM get_variants_details_byProduct';

/************************* USERS *****************************/
// POST one
const addUserAdmin = 'addUserAdmin';

// POST one
const addUserClient = 'addUserClient';

// POST one
const signupUser = 'signupUser';

// GET one
const signinUser = 'SELECT * FROM signinUser($1)';

module.exports = {
    brand: {
        get_PRO_brands,
        add_PRO_brand,
        edit_PRO_brand,
        get_PRO_brand,
        delete_PRO_brand,
        activate_PRO_brand,
        deactivate_PRO_brand
    },
    category: {
        get_PRO_categorys,
        add_PRO_category,
        edit_PRO_category,
        get_PRO_category,
        delete_PRO_category,
        activate_PRO_category,
        deactivate_PRO_category
    },
    subcategory: {
        get_PRO_subcategorys,
        add_PRO_subcategory,
        edit_PRO_subcategory,
        get_PRO_subcategory,
        delete_PRO_subcategory,
        activate_PRO_subcategory,
        deactivate_PRO_subcategory
    },
    product: {
        add_product
    },
    variant: {
        add_PRO_variant,
        add_PRO_variant_specification_value,
        delete_PRO_variant_specification_value,
        delete_PRO_variant,
        variant_exist
    },
    specification: {
        add_PRO_specification,
        add_PRO_specification_value
    },
    photo: {
        get_numeration_photo,
        add_photo_variant
    },
    search: {
        search_spectifications_subcategory,
        search_spectifications_brand,
        search_spectifications_product,
        get_sizes_colors_bySubcategory,
        get_sizes_colors_byBrand,
        get_sizes_colors_byProduct,
        get_sizes_bySubcategory,
        get_sizes_byBrand,
        get_sizes_byProduct,
        get_colors_bySubcategory,
        get_colors_byBrand,
        get_colors_byProduct,
        get_specifications_bySubcategory,
        get_specifications_byBrand,
        get_specifications_byProduct,
        get_variants_details_bySubcategory,
        get_variants_details_byBrand,
        get_variants_details_byProduct
    },
    user: {
        addUserAdmin,
        addUserClient,
        signupUser,
        signinUser
    },
}