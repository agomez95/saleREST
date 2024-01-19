'use strict';

// find type of product

const searchSpecificationsBySubcategory = '* FROM searchSpecificationsBySubcategory';
const searchSpecificationsByBrand = '* FROM searchSpecificationsByBrand';
const searchSpecificationsByProduct = '* FROM searchSpecificationsByProduct';

// search by colors and sizes

const getSizesColorsProductsByBrand = '* FROM getSizesColorsProductsByBrand';
const getSizesColorsProductsBySubcategory = '* FROM getSizesColorsProductsBySubcategory';
const getSizesColorsDataByProduct = '* FROM getSizesColorsDataByProduct';

// search by sizes

const getSizesProductsByBrand = '* FROM getSizesProductsByBrand';
const getSizesProductsBySubcategory = '* FROM getSizesProductsBySubcategory';
const getSizesDataByProduct = '* FROM getSizesDataByProduct';

// search by colors

const getColorsProductsByBrand = '* FROM getColorsProductsByBrand';
const getColorsProductsBySubcategory = '* FROM getColorsProductsBySubcategory';
const getColorsDataByProduct = '* FROM getColorsDataByProduct';

// search by descriptions (extra)

const getDescriptionsProductsByBrand = '* FROM getDescriptionsProductsByBrand';
const getDescriptionsProductsBySubcategory = '* FROM getDescriptionsProductsBySubcategory';
const getDescriptionsDataByProduct = '* FROM getDescriptionsDataByProduct';

// search variants descriptions (only text)

const getVariantsDescriptionsProductsByBrand = '* FROM getVariantsDescriptionsProductsByBrand';
const getVariantsDescriptionsProductsBySubcategory = '* FROM getVariantsDescriptionsProductsBySubcategory';
const getVariantsDescriptionsDataByProduct = '* FROM getVariantsDescriptionsDataByProduct';

module.exports = {
    searchSpecificationsBySubcategory,
    searchSpecificationsByBrand,
    searchSpecificationsByProduct,

    getSizesColorsProductsByBrand,
    getSizesColorsProductsBySubcategory,
    getSizesColorsDataByProduct,

    getSizesProductsByBrand,
    getSizesProductsBySubcategory,
    getSizesDataByProduct,

    getColorsProductsByBrand,
    getColorsProductsBySubcategory,
    getColorsDataByProduct,

    getDescriptionsProductsByBrand,
    getDescriptionsProductsBySubcategory,
    getDescriptionsDataByProduct,

    getVariantsDescriptionsProductsByBrand,
    getVariantsDescriptionsProductsBySubcategory,
    getVariantsDescriptionsDataByProduct
};