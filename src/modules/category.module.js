const categoryService = require('../services/category.service');

const { CustomError } = require('../utils/moduleError');

const getCategorysModule = async () => {
    try {
        const result = await categoryService.getCategorysService();
        let response = {};
        

        if(result.response === 0) {
            response = {
                err_code: 0,
                status: 200,
                count: 0,
                message: 'NO CONTENT'
            };
        } else {
            response = {
                err_code: 0,
                status: 200,
                count: count,
                ...result
            };
        }

        return {...response};

    } catch (err) {
        throw new CustomError();
    }
};

module.exports = {
    getCategorysModule
}