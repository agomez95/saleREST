'use strict';

const searchQuery = require('../querys/search.query');

// the 1 is for only color, 2 is for only sizes, 3 is the both and 4 is only for text type
const queryMap = {
    brand: {
        1: {
            firstQuery: searchQuery.get_colors_byBrand,
            secondQuery: searchQuery.get_specifications_byBrand
        },
        2: {
            firstQuery: searchQuery.get_sizes_byBrand,
            secondQuery: searchQuery.get_specifications_byBrand
        },
        3: {
            firstQuery: searchQuery.get_sizes_colors_byBrand,
            secondQuery: searchQuery.get_specifications_byBrand
        },
        4: {
            firstQuery: searchQuery.get_variants_details_byBrand
        }
    },
    subcategory: {
        1: {
            firstQuery: searchQuery.get_colors_bySubcategory,
            secondQuery: searchQuery.get_specifications_bySubcategory
        },
        2: {
            firstQuery: searchQuery.get_sizes_bySubcategory,
            secondQuery: searchQuery.get_specifications_bySubcategory
        },
        3: {
            firstQuery: searchQuery.get_sizes_colors_bySubcategory,
            secondQuery: searchQuery.get_specifications_bySubcategory
        },
        4: {
            firstQuery: searchQuery.get_variants_details_bySubcategory
        }
    },
    product: {
        1: {
            firstQuery: searchQuery.get_colors_byProduct,
            secondQuery: searchQuery.get_specifications_byProduct
        },
        2: {
            firstQuery: searchQuery.get_sizes_byProduct,
            secondQuery: searchQuery.get_specifications_byProduct
        },
        3: {
            firstQuery: searchQuery.get_sizes_colors_byProduct,
            secondQuery: searchQuery.get_specifications_byProduct
        },
        4: {
            firstQuery: searchQuery.get_variants_details_byProduct
        }
    }
};

const resolveSearchQuery = (type, data) => {
    const option = data[0].specification_type;

    if(option === 0) return false;

    const queries = queryMap[type][option];

    return queries ? queries : false;
};

const resolveSearchBrandQuery = (data) => resolveSearchQuery('brand', data);
const resolveSearchSubcategoryQuery = (data) => resolveSearchQuery('subcategory', data);
const resolveSearchProductQuery = (data) => resolveSearchQuery('product', data);

module.exports = {
    resolveSearchBrandQuery,
    resolveSearchSubcategoryQuery,
    resolveSearchProductQuery
};
