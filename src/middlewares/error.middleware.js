const { HttpError } = require('../errors/httpError');
const { HTTP_RESPONSES } = require('../common/constans');
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
        console.error(err.message);
    
        res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({
            err_code: 1,
            status: HTTP_RESPONSES.INTERNAL_SERVER_ERROR,
            err_msg: 'ERROR, SEE LOGS',
        });
    }
};

module.exports = errorHandlerMiddleware;