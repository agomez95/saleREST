// Desc: Middleware to validate schema of request body or params

const { HTTP_RESPONSES } = require('../common/constans');

module.exports = (schema) => {
    return (req, res, next) => {
        let data = {};
        
        if(req.body) {
            data = schema.validate(req.body);
        } else {
            data = schema.validate(req.req);
        }

        let { error } = data;

        if(error) {
            let details = error.details.map(d => d.message);
            res.status(HTTP_RESPONSES.BAD_REQUEST).json({            
                err_code: 1,
                status: HTTP_RESPONSES.BAD_REQUEST,
                err_msg: 'ERROR, SEE LOGS',
            });

            console.error('------------------DETAILS BELOW-------------------');
            console.error('STATUS:', HTTP_RESPONSES.BAD_REQUEST);
            console.error(`ERROR: ${details[0]}`)

            return;
        } else {
            next();
        }        
    };
};