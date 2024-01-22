'use strict';

const listProductsTwoQuerys = (dataProducts, dataSpecs, type) => {
    
    let products = [];
    let spec = type[0].specification_type;

    switch(spec) {
        case 1:
            // DO PRODUCTS 
            for(let row of dataProducts) {
                if (products.length === 0) {
                    let product = {
                        code: 0,
                        name: '',
                        cost: 0,
                        brand: {
                            code: 0,
                            name: ''
                        },
                        category: {
                            code: 0,
                            name: '',
                        },
                        subCategory: {
                            code: 0,
                            name: ''
                        },
                        variants: [],
                        descriptions: []
                    };
                    
                    product.code = Number(row.product_code);
                    product.name = row.product;
                    product.cost = Number(row.product_cost);
                    product.brand.code = Number(row.brand_code);
                    product.brand.name = row.brand;
                    product.category.code = Number(row.category_code);
                    product.category.name = row.category;
                    product.subCategory.code = Number(row.subcategory_code);
                    product.subCategory.name = row.subcategory;

                    let variant = {
                        code: 0,
                        name: '',
                        stock: 0,
                        isAvailable: true,
                        color: '',
                        createdAt: ''
                    };
                    
                    variant.code = Number(row.product_variant_id);
                    variant.name = row.product_variant;
                    variant.stock = Number(row.product_stock);
                    if(!row.available) variant.isAvailable = false;
                    variant.color = row.color;
                    variant.createdAt = row.creation_date;

                    product.variants.push(variant);
                    products.push(product);
                } else {
                    let product = products.find(product => product.name === row.product);

                    if (product) {
                        let variant = {
                            code: 0,
                            name: '',
                            stock: 0,
                            isAvailable: true,
                            color: '',
                            createdAt: ''
                        };
                        
                        variant.code = Number(row.product_variant_id);
                        variant.name = row.product_variant;
                        variant.stock = Number(row.product_stock);
                        if(!row.available) variant.isAvailable = false;
                        variant.color = row.color;
                        variant.size = row.size,
                        variant.createdAt = row.creation_date;

                        product.variants.push(variant);
                    } else {
                        let productNew = {
                            code: 0,
                            name: '',
                            cost: 0,
                            brand: {
                                code: 0,
                                name: ''
                            },
                            category: {
                                code: 0,
                                name: '',
                            },
                            subCategory: {
                                code: 0,
                                name: ''
                            },
                            variants: [],
                            descriptions: []
                        };
                        
                        productNew.code = Number(row.product_code);
                        productNew.name = row.product;
                        productNew.cost = Number(row.product_cost);
                        productNew.brand.code = Number(row.brand_code);
                        productNew.brand.name = row.brand;
                        productNew.category.code = Number(row.category_code);
                        productNew.category.name = row.category;
                        productNew.subCategory.code = Number(row.subcategory_code);
                        productNew.subCategory.name = row.subcategory;

                        let variant = {
                            code: 0,
                            name: '',
                            stock: 0,
                            isAvailable: true,
                            color: '',
                            createdAt: ''
                        };
                        
                        variant.code = Number(row.product_variant_id);
                        variant.name = row.product_variant;
                        variant.stock = Number(row.product_stock);
                        if(!row.available) variant.isAvailable = false;
                        variant.color = row.color;
                        variant.createdAt = row.creation_date;

                        productNew.variants.push(variant);

                        products.push(productNew);
                    }
                }
            }
            
            // DO SPECS
            for(let row of dataSpecs) {
                let product = products.find(product => product.code === row.product_code);

                if(product) {
                    let description = product.descriptions.find(description => description.name === row.name);

                    if (!description) {
                        let newDescription = {
                            product_code: row.product_code, 
                            name: row.name,
                            information: row.information
                        };
                        
                        product.descriptions.push(newDescription);
                    }
                }
            }
            
            return products;
            break;
        case 2:
                // DO PRODUCTS 
                for(let row of dataProducts) {
                    if (products.length === 0) {
                        let product = {
                            code: 0,
                            name: '',
                            cost: 0,
                            brand: {
                                code: 0,
                                name: ''
                            },
                            category: {
                                code: 0,
                                name: '',
                            },
                            subCategory: {
                                code: 0,
                                name: ''
                            },
                            variants: [],
                            descriptions: []
                        };
                        
                        product.code = Number(row.product_code);
                        product.name = row.product;
                        product.cost = Number(row.product_cost);
                        product.brand.code = Number(row.brand_code);
                        product.brand.name = row.brand;
                        product.category.code = Number(row.category_code);
                        product.category.name = row.category;
                        product.subCategory.code = Number(row.subcategory_code);
                        product.subCategory.name = row.subcategory;
    
                        let variant = {
                            code: 0,
                            name: '',
                            stock: 0,
                            isAvailable: true,
                            size: 0,
                            createdAt: ''
                        };
                        
                        variant.code = Number(row.product_variant_id);
                        variant.name = row.product_variant;
                        variant.stock = Number(row.product_stock);
                        if(!row.available) variant.isAvailable = false;
                        variant.size = row.size,
                        variant.createdAt = row.creation_date;
    
                        product.variants.push(variant);
                        products.push(product);
                    } else {
                        let product = products.find(product => product.name === row.product);
    
                        if (product) {
                            let variant = {
                                code: 0,
                                name: '',
                                stock: 0,
                                isAvailable: true,
                                size: 0,
                                createdAt: ''
                            };
                            
                            variant.code = Number(row.product_variant_id);
                            variant.name = row.product_variant;
                            variant.stock = Number(row.product_stock);
                            if(!row.available) variant.isAvailable = false;
                            variant.size = row.size,
                            variant.createdAt = row.creation_date;
    
                            product.variants.push(variant);
                        } else {
                            let productNew = {
                                code: 0,
                                name: '',
                                cost: 0,
                                brand: {
                                    code: 0,
                                    name: ''
                                },
                                category: {
                                    code: 0,
                                    name: '',
                                },
                                subCategory: {
                                    code: 0,
                                    name: ''
                                },
                                variants: [],
                                descriptions: []
                            };
                            
                            productNew.code = Number(row.product_code);
                            productNew.name = row.product;
                            productNew.cost = Number(row.product_cost);
                            productNew.brand.code = Number(row.brand_code);
                            productNew.brand.name = row.brand;
                            productNew.category.code = Number(row.category_code);
                            productNew.category.name = row.category;
                            productNew.subCategory.code = Number(row.subcategory_code);
                            productNew.subCategory.name = row.subcategory;
    
                            let variant = {
                                code: 0,
                                name: '',
                                stock: 0,
                                isAvailable: true,
                                size: 0,
                                createdAt: ''
                            };
                            
                            variant.code = Number(row.product_variant_id);
                            variant.name = row.product_variant;
                            variant.stock = Number(row.product_stock);
                            if(!row.available) variant.isAvailable = false;
                            variant.size = row.size,
                            variant.createdAt = row.creation_date;
    
                            productNew.variants.push(variant);
    
                            products.push(productNew);
                        }
                    }
                }
                
                // DO SPECS
                for(let row of dataSpecs) {
                    let product = products.find(product => product.code === row.product_code);

                    if(product) {
                        let description = product.descriptions.find(description => description.name === row.name);

                        if (!description) {
                            let newDescription = {
                                product_code: row.product_code, 
                                name: row.name,
                                information: row.information
                            };
                            
                            product.descriptions.push(newDescription);
                        }
                    }
                }
                
                return products;
                break;
        case 3:
            // DO PRODUCTS 
            for(let row of dataProducts) {
                if (products.length === 0) {
                    let product = {
                        code: 0,
                        name: '',
                        cost: 0,
                        brand: {
                            code: 0,
                            name: ''
                        },
                        category: {
                            code: 0,
                            name: '',
                        },
                        subCategory: {
                            code: 0,
                            name: ''
                        },
                        variants: [],
                        descriptions: []
                    };
                    
                    product.code = Number(row.product_code);
                    product.name = row.product;
                    product.cost = Number(row.product_cost);
                    product.brand.code = Number(row.brand_code);
                    product.brand.name = row.brand;
                    product.category.code = Number(row.category_code);
                    product.category.name = row.category;
                    product.subCategory.code = Number(row.subcategory_code);
                    product.subCategory.name = row.subcategory;

                    let variant = {
                        code: 0,
                        name: '',
                        stock: 0,
                        isAvailable: true,
                        color: '',
                        size: 0,
                        createdAt: ''
                    };
                    
                    variant.code = Number(row.product_variant_id);
                    variant.name = row.product_variant;
                    variant.stock = Number(row.product_stock);
                    if(!row.available) variant.isAvailable = false;
                    variant.color = row.color;
                    variant.size = row.size,
                    variant.createdAt = row.creation_date;

                    product.variants.push(variant);
                    products.push(product);
                } else {
                    let product = products.find(product => product.name === row.product);

                    if (product) {
                        let variant = {
                            code: 0,
                            name: '',
                            stock: 0,
                            isAvailable: true,
                            color: '',
                            size: 0,
                            createdAt: ''
                        };
                        
                        variant.code = Number(row.product_variant_id);
                        variant.name = row.product_variant;
                        variant.stock = Number(row.product_stock);
                        if(!row.available) variant.isAvailable = false;
                        variant.color = row.color;
                        variant.size = row.size,
                        variant.createdAt = row.creation_date;

                        product.variants.push(variant);
                    } else {
                        let productNew = {
                            code: 0,
                            name: '',
                            cost: 0,
                            brand: {
                                code: 0,
                                name: ''
                            },
                            category: {
                                code: 0,
                                name: '',
                            },
                            subCategory: {
                                code: 0,
                                name: ''
                            },
                            variants: [],
                            descriptions: []
                        };
                        
                        productNew.code = Number(row.product_code);
                        productNew.name = row.product;
                        productNew.cost = Number(row.product_cost);
                        productNew.brand.code = Number(row.brand_code);
                        productNew.brand.name = row.brand;
                        productNew.category.code = Number(row.category_code);
                        productNew.category.name = row.category;
                        productNew.subCategory.code = Number(row.subcategory_code);
                        productNew.subCategory.name = row.subcategory;

                        let variant = {
                            code: 0,
                            name: '',
                            stock: 0,
                            isAvailable: true,
                            color: '',
                            size: 0,
                            createdAt: ''
                        };
                        
                        variant.code = Number(row.product_variant_id);
                        variant.name = row.product_variant;
                        variant.stock = Number(row.product_stock);
                        if(!row.available) variant.isAvailable = false;
                        variant.color = row.color;
                        variant.size = row.size,
                        variant.createdAt = row.creation_date;

                        productNew.variants.push(variant);

                        products.push(productNew);
                    }
                }
            }
            
            // DO SPECS
            for(let row of dataSpecs) {
                let product = products.find(product => product.code === row.product_code);

                if(product) {
                    let description = product.descriptions.find(description => description.name === row.name);

                    if (!description) {
                        let newDescription = {
                            product_code: row.product_code, 
                            name: row.name,
                            information: row.information
                        };
                        
                        product.descriptions.push(newDescription);
                    }
                }
            }
            
            return products;
            break;
    }
};

const listProductsOneQuery = (dataProductsSpecs) => {
    let products = [];

    // DO PRODUCTS 
    for(let row of dataProductsSpecs) {
        if (products.length === 0) {
            let product = {
                code: 0,
                name: '',
                cost: 0,
                brand: {
                    code: 0,
                    name: ''
                },
                category: {
                    code: 0,
                    name: '',
                },
                subCategory: {
                    code: 0,
                    name: ''
                },
                variants: [],
                descriptions: []
            };
            
            product.code = Number(row.product_code);
            product.name = row.product;
            product.cost = Number(row.product_cost);
            product.brand.code = Number(row.brand_code);
            product.brand.name = row.brand;
            product.category.code = Number(row.category_code);
            product.category.name = row.category;
            product.subCategory.code = Number(row.subcategory_code);
            product.subCategory.name = row.subcategory;

            let variant = {
                code: 0,
                name: '',
                stock: 0,
                isAvailable: true,
                createdAt: ''
            };
            
            variant.code = Number(row.product_variant_id);
            variant.name = row.product_variant;
            variant.stock = Number(row.product_stock);
            if(!row.available) variant.isAvailable = false;
            variant.createdAt = row.creation_date;

            product.variants.push(variant);
            products.push(product);
        } else {
            let product = products.find(product => product.name === row.product);

            if (!product) {
                let productNew = {
                    code: 0,
                    name: '',
                    cost: 0,
                    brand: {
                        code: 0,
                        name: ''
                    },
                    category: {
                        code: 0,
                        name: '',
                    },
                    subCategory: {
                        code: 0,
                        name: ''
                    },
                    variants: [],
                    descriptions: []
                };
                
                productNew.code = Number(row.product_code);
                productNew.name = row.product;
                productNew.cost = Number(row.product_cost);
                productNew.brand.code = Number(row.brand_code);
                productNew.brand.name = row.brand;
                productNew.category.code = Number(row.category_code);
                productNew.category.name = row.category;
                productNew.subCategory.code = Number(row.subcategory_code);
                productNew.subCategory.name = row.subcategory;

                let variant = {
                    code: 0,
                    name: '',
                    stock: 0,
                    isAvailable: true,
                    createdAt: ''
                };
                
                variant.code = Number(row.product_variant_id);
                variant.name = row.product_variant;
                variant.stock = Number(row.product_stock);
                if(!row.available) variant.isAvailable = false;
                variant.createdAt = row.creation_date;

                productNew.variants.push(variant);

                products.push(productNew);
            }
        }
    }

    // DO SPECS
    for(let row of dataProductsSpecs) {
        let product = products.find(product => product.code === row.product_code);

        if(product) {
            let description = product.descriptions.find(description => description.name === row.name);

            if (!description) {
                let newDescription = {
                    product_code: row.product_code, 
                    name: row.name,
                    information: row.information
            };
                        
            product.descriptions.push(newDescription);
            }
        }
    }
    
    return products;
};

module.exports = {
    listProductsTwoQuerys,
    listProductsOneQuery
};