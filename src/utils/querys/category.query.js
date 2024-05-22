'use strict';

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

module.exports = {
    get_PRO_categorys,
    add_PRO_category,
    edit_PRO_category,
    get_PRO_category,
    delete_PRO_category,
    activate_PRO_category,
    deactivate_PRO_category
}