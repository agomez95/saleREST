// Desc: Validate schema from data FormData

const { HTTP_RESPONSES } = require('../common/constans');

module.exports = (schema) => {
    return (req) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const details = error.details.map(d => d.message);
            const err = { message: details[0], status: HTTP_RESPONSES.BAD_REQUEST};
            return err;
        }

        return false;
    };
};