const { CustomError } = require('../utils/moduleError');

/**
 * 
 * @param {error} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomError) {
        //error personalizado
        console.error('------------------DETAILS BELOW-------------------');
        console.error('ERROR:', err.message);
        console.error(err.status);
        
        res.status(err.status).json({
            err_code: 1,
            status: err.status,
            err_msg: 'ERROR, SEE LOGS',
        });
    } else {
        //error normal
        console.error('------------------DETAILS BELOW-------------------');
        console.error('ERROR:', err.message);
        console.error(err.status);

        res.status(500).json({
            err_code: 1,
            status: 500,
            err_msg: 'ERROR, SEE LOGS',
        });
    }
};

module.exports = errorHandlerMiddleware;