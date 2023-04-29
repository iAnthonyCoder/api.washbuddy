const {
    MASTER_MODEL,
    RELATION_MODEL,
    MULTI_FIELD_EXISTS,
} = require('../constants');
const _ = require('lodash');
const { Op } = require('sequelize');

/**.
 * search the field & validate.
 * @param {Object} data.
 * @param {array<string | object>} validations
 * example:
 * [
        {
            model: <MongooseModel>,
            field: <string | array<string> >,
            fieldRelation: <string | array<string> >, -> required only for MULTI_FIELD_EXISTS, RELATION_MODEL,
            message: 'response for fail',
            type: MASTER_MODEL,
            will: <boolean>
        }
 ]
 * @param {boolean} update if it is called from update, the value should true
 * @return {Promise<boolean>}
 * @public
 */
exports.validateFields =  async (data, validations, id = undefined) => {
    for (const index in validations) {
        const validation = validations[index];
        const {
            model,
            field,
            message,
            type,
            fieldRelation,
            will,
        } = validation;
        const condition = {};

        let count = undefined;
        let field_value = undefined;

        switch (type) {
            case MASTER_MODEL:
            case RELATION_MODEL:
                field_value = _.get(data, field);
                if (field_value) {
                    condition[fieldRelation || field] = field_value || null;
                }
                break;

            case MULTI_FIELD_EXISTS:
                field.map( (f, i) => {
                    field_value = _.get(data, f);
                    const field_name = fieldRelation[i];
                    if (field_value && field_name) {
                        condition[field_name] = field_value;
                    }
                });
                break;
        }

        if (!_.isEmpty(condition)) {
            if (id && type === MASTER_MODEL) {
                condition.id = {
                    [Op.ne]: id
                };
            }

            count = await model.count({
                where: {
                    ...condition
                }
            });
            if (_.isArray(field_value)) {
                count = field_value.length === count;
            }
            count = !!count;
        }

        if (count === will) {
            return {
                success: true,
                message,
                path:[field]
            }
        }
    }

    return {
        success: false,
    };
}
