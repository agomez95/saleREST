const express = require('express');
const app = express();
const config = require('./config/main.config');
const cors = require('cors');

const errorHandlerMiddleware = require('./middlewares/error.middleware')

const categoryRouter = require('./routes/category.route');

const serverStart = () => {
    try {        
        app.use(express.json());

        app.use(cors());

        app.use("/sales/api/category/",categoryRouter);

        app.use(errorHandlerMiddleware);

        app.listen(config.PORT, () => {
            console.log(`SERVER RUN IN PORT: ${config.PORT}`);
        });
    } catch(error) {
        console.error(error);
    }
};

serverStart();