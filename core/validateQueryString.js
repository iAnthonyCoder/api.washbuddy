const Joi = require('@hapi/joi')

exports.validateQueryString = async (fields, allowed_fields_filters='', allowed_fields_list='', allowed_fields_search='') => {

    const schema = Joi.object({
        sample: Joi.number().optional().min(1).max(100),
        page_size: Joi.number().optional().min(1).max(100),
        page_number: Joi.number().optional().min(1).max(10000000),
        starting_at: Joi.number().min(1).max(100000000).when('page', {
            is: Joi.exist(), 
            then: Joi.forbidden(), 
            otherwise: Joi.optional() 
        }),
        ending_at: Joi.number().min(1).max(100000000).when('page', {is: true, then: Joi.forbidden(), otherwise: Joi.optional() }),
        sort_field: Joi.string().optional().min(1).max(50),
        sort_order: Joi.string().valid('asc', 'desc'),
        filter_field: Joi.array().optional().items(Joi.string().valid(...allowed_fields_filters)),
        filter_type: Joi.array().optional().items(Joi.string().valid(...['eq', 'lt', 'gt', 'lte', 'gte', 'ne'])),
        filter_value: Joi.array().optional().items(Joi.string().max(100)),
        fields: Joi.array().optional().items(Joi.string().valid(...allowed_fields_list)),
        search: Joi.string().optional().min(1).max(128).allow('', null),
        search_field_type: Joi.string().optional(),
        // search_fields: Joi.array().optional().items(Joi.string().valid(...allowed_fields_search)),
        disjuntive_filters: Joi.boolean().optional(),
    });

    const validation = schema.validate(fields, {
        abortEarly: false,
        allowUnknown: false,
    });

    if (validation.error) {
        return {
            code: 422,
            data: {
                errors: validation.error.details
            },
        }
    } else {
        return validation.value
    }

}