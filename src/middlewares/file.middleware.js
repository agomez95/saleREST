// Descripción: Middleware para validar la subida de archivos

const { HTTP_RESPONSES } = require('../common/constans');

const multer = require('multer');
const { verificator } = require('../config/photo.config');

module.exports = (req, res, next) => {
    verificator(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // err.message: Unexpected field
            // err.code: 'LIMIT_UNEXPECTED_FILE'
            // err.field: 'photos' aqui va el nombre del campo erroneo
            res.status(HTTP_RESPONSES.BAD_REQUEST).json({            
                err_code: 1,
                status: HTTP_RESPONSES.BAD_REQUEST,
                err_msg: 'ERROR, SEE LOGS',
            });

            console.error('------------------DETAILS BELOW-------------------');
            console.error('STATUS:', HTTP_RESPONSES.BAD_REQUEST);
            console.error(`ERROR: '${err.message}' IN FIELD '${err.field}'`)

            return;
        } else if (err) {
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({            
                err_code: 1,
                status: HTTP_RESPONSES.INTERNAL_SERVER_ERROR,
                err_msg: 'ERROR, SEE LOGS',
            });

            console.error('------------------DETAILS BELOW-------------------');
            console.error('STATUS:', HTTP_RESPONSES.INTERNAL_SERVER_ERROR);
            console.error(`ERROR: ${err.message}`)

            return;
        }

        if (!req.file) {
            console.error('------------------DETAILS BELOW-------------------');
            console.error('STATUS:', HTTP_RESPONSES.INTERNAL_SERVER_ERROR);
            console.error(`ERROR: FILE IS REQUIRED`)

            return res.status(HTTP_RESPONSES.BAD_REQUEST).json({
                err_code: 1,
                status: HTTP_RESPONSES.BAD_REQUEST,
                err_msg: 'ERROR, SEE LOGS',
            });
        }

        next();
    });
};
