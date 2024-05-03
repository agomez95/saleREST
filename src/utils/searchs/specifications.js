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
            firstQuery = searchQuery.getColorsProductsByBrand;
            secondQuery = searchQuery.getDescriptionsProductsByBrand;
            return { firstQuery, secondQuery};
            break;
        case 2:
            // this kind of specifications BY BRAND is ONLY FOR SIZE
            firstQuery = searchQuery.getSizesProductsByBrand;
            secondQuery = searchQuery.getDescriptionsProductsByBrand;
            return { firstQuery, secondQuery};
            break;
        case 3:
            // this kind of specifications BY BRAND is FOR COLOR AN SIZE
            firstQuery = searchQuery.getSizesColorsProductsByBrand;
            secondQuery = searchQuery.getDescriptionsProductsByBrand;
            return { firstQuery, secondQuery};
            break;
        case 4:
            // this kind is for only TEXT TYPE
            firstQuery = searchQuery.getVariantsDescriptionsProductsByBrand;
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
            firstQuery = searchQuery.getColorsProductsBySubcategory;
            secondQuery = searchQuery.getDescriptionsProductsBySubcategory;
            return { firstQuery, secondQuery};
            break;
        case 2:
            // this kind of specifications BY SUBCATEGORY is ONLY FOR SIZE
            firstQuery = searchQuery.getSizesProductsBySubcategory;
            secondQuery = searchQuery.getDescriptionsProductsBySubcategory;
            return { firstQuery, secondQuery};
            break;
        case 3:
            // this kind of specifications BY SUBCATEGORY is FOR COLOR AN SIZE
            firstQuery = searchQuery.getSizesColorsProductsBySubcategory;
            secondQuery = searchQuery.getDescriptionsProductsBySubcategory;
            return { firstQuery, secondQuery};
            break;
        case 4:
            // this kind is for only TEXT TYPE
            firstQuery = searchQuery.getVariantsDescriptionsProductsBySubcategory;
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
            firstQuery = searchQuery.getColorsDataByProduct;
            secondQuery = searchQuery.getDescriptionsDataByProduct;
            return { firstQuery, secondQuery};
            break;
        case 2:
            // this kind of specifications BY PRODUCT is ONLY FOR SIZE
            firstQuery = searchQuery.getSizesDataByProduct;
            secondQuery = searchQuery.getDescriptionsDataByProduct;
            return { firstQuery, secondQuery};
            break;
        case 3:
            // this kind of specifications BY PRODUCT is FOR COLOR AN SIZE
            firstQuery = searchQuery.getSizesColorsDataByProduct;
            secondQuery = searchQuery.getDescriptionsDataByProduct;
            return { firstQuery, secondQuery};
            break;
        case 4:
            // this kind is for only TEXT TYPE
            firstQuery = searchQuery.getVariantsDescriptionsDataByProduct;
            return { firstQuery };
            break;
    }
};

module.exports = {
    resolveSearchBrandQuery,
    resolveSearchSubcategoryQuery,
    resolveSearchProductQuery
};