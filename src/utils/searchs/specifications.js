'use strict';

const searchQuery = require('../querys/search.query');

const resolveSearchBrandQuery = (data) => {
    const option = data[0].specification_type;

    let firstQuery = '';
    let secondQuery = '';

    switch(option) {
        case 0:
            return false;
            break;
        case 1:
            // this kind of specifications BY BRAND is ONLY FOR COLOR
            firstQuery = searchQuery.get_colors_byBrand;
            secondQuery = searchQuery.get_specifications_byBrand;
            return { firstQuery, secondQuery};
            break;
        case 2:
            // this kind of specifications BY BRAND is ONLY FOR SIZE
            firstQuery = searchQuery.get_sizes_byBrand;
            secondQuery = searchQuery.get_specifications_byBrand;
            return { firstQuery, secondQuery};
            break;
        case 3:
            // this kind of specifications BY BRAND is FOR COLOR AN SIZE
            firstQuery = searchQuery.get_sizes_colors_byBrand;
            secondQuery = searchQuery.get_specifications_byBrand;
            return { firstQuery, secondQuery};
            break;
        case 4:
            // this kind is for only TEXT TYPE
            firstQuery = searchQuery.get_variants_details_byBrand;
            return { firstQuery };
            break;
    }
};

const resolveSearchSubcategoryQuery = (data) => {
    const option = data[0].specification_type;

    let firstQuery = '';
    let secondQuery = '';

    switch(option) {
        case 0:
            return false;
            break;
        case 1:
            // this kind of specifications BY SUBCATEGORY is ONLY FOR COLOR
            firstQuery = searchQuery.get_colors_bySubcategory;
            secondQuery = searchQuery.get_specifications_bySubcategory;
            return { firstQuery, secondQuery};
            break;
        case 2:
            // this kind of specifications BY SUBCATEGORY is ONLY FOR SIZE
            firstQuery = searchQuery.get_colors_bySubcategory;
            secondQuery = searchQuery.get_specifications_bySubcategory;
            return { firstQuery, secondQuery};
            break;
        case 3:
            // this kind of specifications BY SUBCATEGORY is FOR COLOR AN SIZE
            firstQuery = searchQuery.get_sizes_colors_bySubcategory;
            secondQuery = searchQuery.get_specifications_bySubcategory;
            return { firstQuery, secondQuery};
            break;
        case 4:
            // this kind is for only TEXT TYPE
            firstQuery = searchQuery.get_variants_details_bySubcategory;
            return { firstQuery };
            break;
    }
};

const resolveSearchProductQuery = (data) => {
    const option = data[0].specification_type;

    let firstQuery = '';
    let secondQuery = '';

    switch(option) {
        case 0:
            return false;
            break;
        case 1:
            // this kind of specifications BY PRODUCT is ONLY FOR COLOR
            firstQuery = searchQuery.get_colors_byProduct;
            secondQuery = searchQuery.get_specifications_byProduct;
            return { firstQuery, secondQuery};
            break;
        case 2:
            // this kind of specifications BY PRODUCT is ONLY FOR SIZE
            firstQuery = searchQuery.get_sizes_byProduct;
            secondQuery = searchQuery.get_specifications_byProduct;
            return { firstQuery, secondQuery};
            break;
        case 3:
            // this kind of specifications BY PRODUCT is FOR COLOR AN SIZE
            firstQuery = searchQuery.get_sizes_colors_byProduct;
            secondQuery = searchQuery.get_specifications_byProduct;
            return { firstQuery, secondQuery};
            break;
        case 4:
            // this kind is for only TEXT TYPE
            firstQuery = searchQuery.get_variants_details_byProduct;
            return { firstQuery };
            break;
    }
};

module.exports = {
    resolveSearchBrandQuery,
    resolveSearchSubcategoryQuery,
    resolveSearchProductQuery
};