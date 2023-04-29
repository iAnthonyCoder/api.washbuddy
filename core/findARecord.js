/**
 *
 * @return { Promise<{ code, data }> }
 */
exports.findOneWithPopulate = async (id, model, include, overwrite_condition = {}, required_id = true, fields=false, group=false) => {
    try {
        // _id = (required_id)? _id: {};

        const condition = (required_id)
            ? { id, ...overwrite_condition } 
            : (id) 
            ? { id, ...overwrite_condition } 
            : {...overwrite_condition }
         
        const record = await model.findOne({
            where: condition,
            ...(fields && {attributes: fields}),
            ...(include && {include: include}),
            ...(group && {group: group}),
        });
        
        if (record) {
            return response = {
                code: 200,
                data: record
            };
        } else {
            return {
                code: 404,
                data: {
                    message: 'record not found'
                }
            };
        }
    } catch(err) {
        console.log(err)
        const { message } = err;
        return {
            code: 500,
            data: {
                message: message.includes('Cast to ObjectId') 
                    ? 'Incorrect _id sintax.' : message
            }
        };
    }
};




