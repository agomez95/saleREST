'use strict';

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

module.exports = {
    get_PRO_brands,
    add_PRO_brand,
    edit_PRO_brand,
    get_PRO_brand,
    delete_PRO_brand,
    activate_PRO_brand,
    deactivate_PRO_brand
}