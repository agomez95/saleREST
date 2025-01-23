'use strict';

class Product {
    constructor(row) {
        this.name = row.product;
        this.code = row.pro_code;
        this.description = row.pro_description;
        this.long_description = row.pro_long_description;
        this.brand = {
            id: Number(row.brand_code),
            name: row.brand
        };
        this.category = {
            id: Number(row.category_code),
            name: row.category
        };
        this.subCategory = {
            id: Number(row.subcategory_code),
            name: row.subcategory,
        };
        this.variants = [];
        this.specifications = [];
    }

    addVariant(row, specType) {
        const variant = new Variant(row, specType);
        this.variants.push(variant);
    }

    addSpecification(row) {
        if (!this.specifications.find(specification => specification.value === row.value) && row.specification === 'TEXT') {
            this.specifications.push({
                value: row.value
            });
        }
    }
}

class Variant {
    constructor(row, specType) {
        this.code = Number(row.pro_variant_id);
        this.stock = Number(row.pro_stock);
        this.cost = Number(row.pro_cost);
        this.isAvailable = row.available;
        switch (specType) {
            case 1:
                this.color = row.color;
                break;
            case 2:
                this.size = row.size;
                break;
            case 3:
                this.color = row.color;
                this.size = row.size;
                break; 
        }
        this.createdAt = row.creation_date;
    }
}

const addVariantToProduct = (products, row, specType) => {
    let product = products.find(product => product.name === row.product);

    if (!product) {
        product = new Product(row);
        products.push(product);
    }

    product.addVariant(row, specType);
};

const addSpecificationsToProducts = (products, dataSpecs) => {
    for (let row of dataSpecs) {
        let product = products.find(product => product.code === row.pro_code);
        if (product) {
            product.addSpecification(row);
        }
    }
};

const listProductsTwoQuerys = (dataProducts, dataSpecs, type) => {
    let products = [];
    const specType = type[0].specification_type;

    for (let row of dataProducts) {
        addVariantToProduct(products, row, specType);
    }

    addSpecificationsToProducts(products, dataSpecs);

    return products;
};

const listProductsOneQuery = (dataProductsSpecs) => {
    let products = [];

    for (let row of dataProductsSpecs) {
        addVariantToProduct(products, row, 3);
    }

    addSpecificationsToProducts(products, dataProductsSpecs);

    return products;
};

module.exports = {
    listProductsTwoQuerys,
    listProductsOneQuery
};
