/**
 *
 * @return { Promise<{ code, data }> }
 */
exports.countRecords = async ({model, condition, include}) => {
    try {

        const record = await model.count({
            where: condition,
        });

        return response = {
            code: 200,
            data: {
                count: record
            }
        };

        // else {
        //     return {
        //         code: 404,
        //         data: {
        //             message: 'record not found'
        //         }
        //     };
        // }
    } catch(err) {
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




