const Joi = require('@hapi/joi');
const _ = require('lodash');
const {
    validateFields
} = require('./validateFields');

/**
 *
 * @return { Promise<{ code, data }> }
 */
exports.edit = async (
    id, 
    model, 
    data, 
    input_validation = {}, 
    internal_validation = {}, 
    overwrite_data = {}, 
    overwrite_condition = {}, 
    include_record = false,
    fieldsToDeleteBeforeSave = []
) => {

    input_validation = _getInterceptedByKeys(input_validation, data);
    const schema = Joi.object(input_validation);

    const validation = schema.validate(data, {
        abortEarly: false,
        allowUnknown: false,
    });

    data = validation.value;
    data = {...data, ...overwrite_data };
    const condition = {
        id,
        ...overwrite_condition
    };


    try {

        if (!validation.error && !_.isEmpty(internal_validation)) {
            const internal_validations = await validateFields(data, internal_validation, id);
            if (internal_validations.success) {
                return {
                    code: 409,
                    data: {
                        message: internal_validations.message
                    },
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

        const record = await model.update(
            data,
            {
                where: condition,
                individualHooks: true
            },
        );

        if (record && record[1].length > 0) {
            const response = {
                code: 200,
                data: {
                    id
                }
            };

            if (include_record) {
                response.data.record = record;
            }

            return response;
        } else {
            return {
                code: 404,
                data: {
                    message: 'record not found'
                }
            };
        }
    } catch(err) {
        const { message } = err;
        console.log(err)
        return {
            code: 500,
            data: {
                message
            }
        };
    }
};

/**
 * the fields used to update, this fields make a intersection between the sents and the fillables fields.
 * @return {array | object} list of the fields that can be updated.
 * @private
 */
function _getInterceptedByKeys(data, data_selected) {
    if (_.isObject(data)) {
        const _data = _.keys(data);
        const _data_selected = _.keys(data_selected);
        const intersection = _.intersection(_data, _data_selected);
        const output = {};
        for (const key of intersection) {
            output[key] = data[key];
        }
        return output;
    } else {
        return _.intersection(data, data_selected);
    }
    throw new Error(" Array | Object in parameters")
}




