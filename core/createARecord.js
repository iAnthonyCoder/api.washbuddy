const Joi = require('@hapi/joi');
const _ = require('lodash');
const {
    validateFields
} = require('./validateFields');


/**
 *
 * @return { Promise<{ code, data }> }
 */
exports.create = async (model, data, input_validation = {}, internal_validation = {}, overwrite_data = {}, include_record = false, fieldsToDeleteBeforeSave = []) => {
    console.log(data);
    const schema = Joi.object(input_validation);
    
    const validation = schema.validate(data, {
        abortEarly: false,
        allowUnknown: false,
    });

    data = validation.value;
    data = {...data, ...overwrite_data };
    
    try {
    
        if (!validation.error && !_.isEmpty(internal_validation)) {
            const internal_validations = await validateFields(data, internal_validation);
            if (internal_validations.success) {
         
                return {
                    code: 409,
                    data: {
                        errors: internal_validations.message
                    }
                }
            }
        } else if (validation.error) {
            return {
                code: 422,
                data: {
                    errors: validation.error.details
                },
            }
        }

        if(fieldsToDeleteBeforeSave.length > 0){
            fieldsToDeleteBeforeSave.map(x => delete data[x])
        }
        console.log(data);
        const record = await model.create(data);
       
        const {
            id
        } = record;
        const response = {
            code: 201,
            data: {
                id
            }
        };

        if (include_record) {
            response.data.record = record;
        }

        return response;
    } catch(err) {
        console.log(err)
        const { message } = err;
        return {
            code: 500,
            data: {
                message
            }
        };
    }
};




