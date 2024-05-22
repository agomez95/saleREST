'use strict';

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

module.exports = {
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
};