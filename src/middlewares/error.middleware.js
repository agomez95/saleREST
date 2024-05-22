const { HttpError } = require('../utils/httpError');

/**
 * 
 * @param {error} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof HttpError) {
        //error personalizado
        console.error('------------------DETAILS BELOW-------------------');
        console.error(err.type);
        console.error('STATUS:', err.status);
        console.error('CÓDIGO DE ERROR:', err.code);
        console.error(err.message);
        
        res.status(err.status).json({
            err_code: 1,
            status: err.status,
            err_msg: 'ERROR, SEE LOGS',
        });
    } else {
        //error normal
        console.error('------------------DETAILS BELOW-------------------');
        console.error(err.type);
        console.error('STATUS:', err.status);
        console.error('CÓDIGO DE ERROR:', err.code);
    
        res.status(500).json({
            err_code: 1,
            status: 500,
            err_msg: 'ERROR, SEE LOGS',
        });
    }
};

module.exports = errorHandlerMiddleware;