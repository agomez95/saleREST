'use strict';

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

module.exports = {
    get_PRO_subcategorys,
    add_PRO_subcategory,
    edit_PRO_subcategory,
    get_PRO_subcategory,
    delete_PRO_subcategory,
    activate_PRO_subcategory,
    deactivate_PRO_subcategory
}