'use strict';

const { search } = require('../db/querys.db');

// the 1 is for only color, 2 is for only sizes, 3 is the both and 4 is only for text type
const queryMap = {
    brand: {
        1: {
            firstQuery: search.FN_GET_COL_BRAND,
            secondQuery: search.FN_GET_SPEC_BRAND
        },
        2: {
            firstQuery: search.FN_GET_SIZ_BRAND,
            secondQuery: search.FN_GET_SPEC_BRAND
        },
        3: {
            firstQuery: search.FN_GET_SIZ_COL_BRAND,
            secondQuery: search.FN_GET_SPEC_BRAND
        },
        4: {
            firstQuery: search.FN_GET_VARIANTS_DETAILS_BRAND
        }
    },
    subcategory: {
        1: {
            firstQuery: search.FN_GET_COL_SUBCAT,
            secondQuery: search.FN_GET_SPEC_SUBCAT
        },
        2: {
            firstQuery: search.FN_GET_SIZ_SUBCAT,
            secondQuery: search.FN_GET_SPEC_SUBCAT
        },
        3: {
            firstQuery: search.FN_GET_SIZ_COL_SUBCAT,
            secondQuery: search.FN_GET_SPEC_SUBCAT
        },
        4: {
            firstQuery: search.FN_GET_VARIANTS_DETAILS_SUBCAT
        }
    },
    product: {
        1: {
            firstQuery: search.FN_GET_COL_PRODUCT,
            secondQuery: search.FN_GET_SPEC_PRODUCT
        },
        2: {
            firstQuery: search.FN_GET_SIZ_PRODUCT,
            secondQuery: search.FN_GET_SPEC_PRODUCT
        },
        3: {
            firstQuery: search.FN_GET_SIZ_COL_PRODUCT,
            secondQuery: search.FN_GET_SPEC_PRODUCT
        },
        4: {
            firstQuery: search.FN_GET_VARIANTS_DETAILS_PRODUCT
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
