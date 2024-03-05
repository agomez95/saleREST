const express = require('express');
const app = express();
const config = require('./config/main.config');
const cors = require('cors');

const errorHandlerMiddleware = require('./middlewares/error.middleware')

const userRouter = require('./routes/user.route');
const categoryRouter = require('./routes/category.route');
const subcategoryRouter = require('./routes/subcategory.route');
const brandRouter = require('./routes/brand.route');
const productRouter = require('./routes/product.route');
const variantRouter =  require('./routes/variant.route');
const specificationRouter = require('./routes/specification.route');
const searchRouter = require('./routes/search.route');

const serverStart = () => {
    try {        
        app.use(express.json());

        app.use(cors());

        app.use("/sales/api/user/",userRouter);
        app.use("/sales/api/category/",categoryRouter);
        app.use("/sales/api/subcategory/",subcategoryRouter);
        app.use("/sales/api/brand/",brandRouter);
        app.use("/sales/api/product/",productRouter);
        app.use("/sales/api/variant/",variantRouter);
        app.use("/sales/api/specification/",specificationRouter);
        app.use("/sales/api/search/",searchRouter);

        app.use(errorHandlerMiddleware);

        app.listen(config.PORT, () => {
            console.log(`SERVER RUN IN PORT: ${config.PORT}`);
        });
    } catch(error) {
        console.error(error);
    }
};

serverStart();