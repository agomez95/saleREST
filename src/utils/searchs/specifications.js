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
            firstQuery = searchQuery.getColorsProductsByBrand;
            secondQuery = searchQuery.getDescriptionsProductsByBrand;
            return { firstQuery, secondQuery};
            break;
        case 2:
            firstQuery = searchQuery.getSizesProductsByBrand;
            secondQuery = searchQuery.getDescriptionsProductsByBrand;
            return { firstQuery, secondQuery};
            break;
        case 3:
            firstQuery = searchQuery.getSizesColorsProductsByBrand;
            secondQuery = searchQuery.getDescriptionsProductsByBrand;
            return { firstQuery, secondQuery};
            break;
        case 4:
            // text
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
            firstQuery = searchQuery.getColorsProductsBySubcategory;
            secondQuery = searchQuery.getDescriptionsProductsBySubcategory;
            return { firstQuery, secondQuery};
            break;
        case 2:
            firstQuery = searchQuery.getSizesProductsBySubcategory;
            secondQuery = searchQuery.getDescriptionsProductsBySubcategory;
            return { firstQuery, secondQuery};
            break;
        case 3:
            firstQuery = searchQuery.getSizesColorsProductsBySubcategory;
            secondQuery = searchQuery.getDescriptionsProductsBySubcategory;
            return { firstQuery, secondQuery};
            break;
        case 4:
            // text
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
            firstQuery = searchQuery.getColorsDataByProduct;
            secondQuery = searchQuery.getDescriptionsDataByProduct;
            return { firstQuery, secondQuery};
            break;
        case 2:
            firstQuery = searchQuery.getSizesDataByProduct;
            secondQuery = searchQuery.getDescriptionsDataByProduct;
            return { firstQuery, secondQuery};
            break;
        case 3:
            firstQuery = searchQuery.getSizesColorsDataByProduct;
            secondQuery = searchQuery.getDescriptionsDataByProduct;
            return { firstQuery, secondQuery};
            break;
        case 4:
            // text
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