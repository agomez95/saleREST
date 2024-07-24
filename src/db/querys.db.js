
/************************* BRANDS ****************************/
// GET all
const FN_GET_BRANDS = 'SELECT * FROM FN_GET_BRANDS();';

// POST one
const FN_ADD_BRAND = 'FN_ADD_BRAND';

// PUT one
const FN_EDIT_BRAND = 'FN_EDIT_BRAND';

// GET one
const FN_GET_BRAND = 'FN_GET_BRAND';

// PUT one
const FN_DEL_BRAND = 'FN_DEL_BRAND';

// PUT one
const FN_ACT_BRAND = 'FN_ACT_BRAND';

// PUT one
const FN_DEACT_BRAND = 'FN_DEACT_BRAND';

/************************* CATEGORY ****************************/
// GET all
const FN_GET_CATEOGRYS = 'SELECT * FROM FN_GET_CATEOGRYS();';

// POST one
const FN_ADD_CATEGORY = 'FN_ADD_CATEGORY';

// PUT one
const FN_EDIT_CATEGORY = 'FN_EDIT_CATEGORY';

// GET one
const FN_GET_CATEGORY = 'FN_GET_CATEGORY';

// PUT one
const FN_DEL_CATEGORY = 'FN_DEL_CATEGORY';

// PUT one
const FN_ACT_CATEGORY = 'FN_ACT_CATEGORY';

// PUT one
const FN_DEACT_CATEGORY = 'FN_DEACT_CATEGORY';

/************************* SUBCATEGORYS ****************************/
// GET all
const FN_GET_SUBCATEGORYS = 'SELECT * FROM FN_GET_SUBCATEGORYS();';

// POST one
const FN_ADD_SUBCATEGORY = 'FN_ADD_SUBCATEGORY';

// PUT one
const FN_EDIT_NA_SUBCATEGORY = 'FN_EDIT_NA_SUBCATEGORY';

// PUT one
const FN_EDIT_CAT_SUBCATEGORY = 'FN_EDIT_CAT_SUBCATEGORY';

// GET one
const FN_GET_SUBCATEGORY = 'FN_GET_SUBCATEGORY';

// PUT one
const FN_DEL_SUBCATEGORY = 'FN_DEL_SUBCATEGORY';

// PUT one
const FN_ACT_SUBCATEGORY = 'FN_ACT_SUBCATEGORY';

// PUT one
const FN_DEACT_SUBCATEGORY = 'FN_DEACT_SUBCATEGORY';

/************************* PRODUCTS ****************************/
// POST one
const FN_ADD_PRODUCT = 'FN_ADD_PRODUCT';

/************************* VARIANTS && VARIANT SPECIFICATION VALUES ****************************/
// POST one
const FN_ADD_VARIANT = 'FN_ADD_VARIANT';

// DELETE one
const FN_DEL_VARIANT = 'FN_DEL_VARIANT';

// POST one
const FN_ADD_VARIANT_SPEC_VAL = 'FN_ADD_VARIANT_SPEC_VAL';

// DELETE many
const FN_DEL_VARIANT_SPEC_VAL = 'FN_DEL_VARIANT_SPEC_VAL';

// GET true or false
const FN_VARIANT_EXIST = 'SELECT FN_VARIANT_EXIST($1)';

/************************* SPECIFICATIONS ****************************/
// POST one
const FN_ADD_SPEC = 'FN_ADD_SPEC';

// POST one
const FN_ADD_SPEC_VAL = 'FN_ADD_SPEC_VAL';

/************************* PHOTOS ****************************/
// GET true or false
const FN_GET_NUMERATION_PHOTO = 'SELECT FN_GET_NUMERATION_PHOTO($1)';
const FN_ADD_PHOTO_VAR = 'FN_ADD_PHOTO_VAR';

/************************* SEARCH ****************************/
// SEARCH type of product
const FN_SEARCH_SPECS_SUBCAT = '* FROM FN_SEARCH_SPECS_SUBCAT';
const FN_SEARCH_SPECS_BRAND = '* FROM FN_SEARCH_SPECS_BRAND';
const FN_SEARCH_SPECS_PRODUCT = '* FROM FN_SEARCH_SPECS_PRODUCT';

// GET colors and sizes
const FN_GET_SIZ_COL_SUBCAT = '* FROM FN_GET_SIZ_COL_SUBCAT';
const FN_GET_SIZ_COL_BRAND = '* FROM FN_GET_SIZ_COL_BRAND';
const FN_GET_SIZ_COL_PRODUCT = '* FROM FN_GET_SIZ_COL_PRODUCT';

// GET sizes
const FN_GET_SIZ_SUBCAT = '* FROM FN_GET_SIZ_SUBCAT';
const FN_GET_SIZ_BRAND = '* FROM FN_GET_SIZ_BRAND';
const FN_GET_SIZ_PRODUCT = '* FROM FN_GET_SIZ_PRODUCT';

// GET colors
const FN_GET_COL_SUBCAT = '* FROM FN_GET_COL_SUBCAT';
const FN_GET_COL_BRAND = '* FROM FN_GET_COL_BRAND';
const FN_GET_COL_PRODUCT = '* FROM FN_GET_COL_PRODUCT';

// SEARCH specifications by (extra)
const FN_GET_SPEC_SUBCAT = '* FROM FN_GET_SPEC_SUBCAT';
const FN_GET_SPEC_BRAND = '* FROM FN_GET_SPEC_BRAND';
const FN_GET_SPEC_PRODUCT = '* FROM FN_GET_SPEC_PRODUCT';

// SEARCH variants details by (only text)
const FN_GET_VARIANTS_DETAILS_SUBCAT = '* FROM FN_GET_VARIANTS_DETAILS_SUBCAT';
const FN_GET_VARIANTS_DETAILS_BRAND = '* FROM FN_GET_VARIANTS_DETAILS_BRAND';
const FN_GET_VARIANTS_DETAILS_PRODUCT = '* FROM FN_GET_VARIANTS_DETAILS_PRODUCT';

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
        FN_GET_BRANDS,
        FN_ADD_BRAND,
        FN_EDIT_BRAND,
        FN_GET_BRAND,
        FN_DEL_BRAND,
        FN_ACT_BRAND,
        FN_DEACT_BRAND
    },
    category: {
        FN_GET_CATEOGRYS,
        FN_ADD_CATEGORY,
        FN_EDIT_CATEGORY,
        FN_GET_CATEGORY,
        FN_DEL_CATEGORY,
        FN_ACT_CATEGORY,
        FN_DEACT_CATEGORY
    },
    subcategory: {
        FN_GET_SUBCATEGORYS,
        FN_ADD_SUBCATEGORY,
        FN_EDIT_NA_SUBCATEGORY,
        FN_EDIT_CAT_SUBCATEGORY,
        FN_GET_SUBCATEGORY,
        FN_DEL_SUBCATEGORY,
        FN_ACT_SUBCATEGORY,
        FN_DEACT_SUBCATEGORY
    },
    product: {
        FN_ADD_PRODUCT
    },
    variant: {
        FN_ADD_VARIANT,
        FN_DEL_VARIANT,
        FN_ADD_VARIANT_SPEC_VAL,
        FN_DEL_VARIANT_SPEC_VAL,
        FN_VARIANT_EXIST
    },
    specification: {
        FN_ADD_SPEC,
        FN_ADD_SPEC_VAL
    },
    photo: {
        FN_GET_NUMERATION_PHOTO,
        FN_ADD_PHOTO_VAR
    },
    search: {
        FN_SEARCH_SPECS_SUBCAT,
        FN_SEARCH_SPECS_BRAND,
        FN_SEARCH_SPECS_PRODUCT,
        FN_GET_SIZ_COL_SUBCAT,
        FN_GET_SIZ_COL_BRAND,
        FN_GET_SIZ_COL_PRODUCT,
        FN_GET_SIZ_SUBCAT,
        FN_GET_SIZ_BRAND,
        FN_GET_SIZ_PRODUCT,
        FN_GET_COL_SUBCAT,
        FN_GET_COL_BRAND,
        FN_GET_COL_PRODUCT,
        FN_GET_SPEC_SUBCAT,
        FN_GET_SPEC_BRAND,
        FN_GET_SPEC_PRODUCT,
        FN_GET_VARIANTS_DETAILS_SUBCAT,
        FN_GET_VARIANTS_DETAILS_BRAND,
        FN_GET_VARIANTS_DETAILS_PRODUCT
    },
    user: {
        addUserAdmin,
        addUserClient,
        signupUser,
        signinUser
    },
}