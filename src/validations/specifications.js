'use strict';

const { search } = require('../db/querys.db');

// the 1 is for only color, 2 is for only sizes, 3 is the both and 4 is only for text type
const queryMap = {
    brand: {
        1: {
            firstQuery: search.get_colors_byBrand,
            secondQuery: search.get_specifications_byBrand
        },
        2: {
            firstQuery: search.get_sizes_byBrand,
            secondQuery: search.get_specifications_byBrand
        },
        3: {
            firstQuery: search.get_sizes_colors_byBrand,
            secondQuery: search.get_specifications_byBrand
        },
        4: {
            firstQuery: search.get_variants_details_byBrand
        }
    },
    subcategory: {
        1: {
            firstQuery: search.get_colors_bySubcategory,
            secondQuery: search.get_specifications_bySubcategory
        },
        2: {
            firstQuery: search.get_sizes_bySubcategory,
            secondQuery: search.get_specifications_bySubcategory
        },
        3: {
            firstQuery: search.get_sizes_colors_bySubcategory,
            secondQuery: search.get_specifications_bySubcategory
        },
        4: {
            firstQuery: search.get_variants_details_bySubcategory
        }
    },
    product: {
        1: {
            firstQuery: search.get_colors_byProduct,
            secondQuery: search.get_specifications_byProduct
        },
        2: {
            firstQuery: search.get_sizes_byProduct,
            secondQuery: search.get_specifications_byProduct
        },
        3: {
            firstQuery: search.get_sizes_colors_byProduct,
            secondQuery: search.get_specifications_byProduct
        },
        4: {
            firstQuery: search.get_variants_details_byProduct
        }
    }
};

const resolvesearch = (type, data) => {
    const option = data[0].specification_type;

    if(option === 0) return false;

    const queries = queryMap[type][option];

    return queries ? queries : false;
};

const resolveSearchBrandQuery = (data) => resolvesearch('brand', data);
const resolveSearchSubcategoryQuery = (data) => resolvesearch('subcategory', data);
const resolveSearchProductQuery = (data) => resolvesearch('product', data);

module.exports = {
    resolveSearchBrandQuery,
    resolveSearchSubcategoryQuery,
    resolveSearchProductQuery
};
