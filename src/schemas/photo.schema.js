'use strict';

const Joi = require('joi');

const photoSchema = Joi.object({
    pro_variant_id: Joi.string().required()
});

module.exports = photoSchema;