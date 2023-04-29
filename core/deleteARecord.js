exports.destroy = async (id, model, overwrite_condition = {}, onlyOwner = false, userId = null) => {
    const condition = { id, ...overwrite_condition };
    try {
        const record = await model.findOne({where:condition});

        if(onlyOwner){

            if(!userId){
                return {
                    code: 409,
                    data: {
                        message: 'user id was not passed to delete function'
                    }
                };
            }

            if(!record.user_id){
                return {
                    code: 409,
                    data: {
                        message: 'the record does not have any attached user'
                    }
                };
            }

            if(record.user_id != userId){
                return {
                    code: 409,
                    data: {
                        message: 'you do not have permission to delete this record'
                    }
                };
            }

        }
        
        if (record) {
            await record.destroy();
            return {
                code: 200,
                data: {
                    id: record.id
                }
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
        const { message } = err;
        return {
            code: 500,
            data: {
                message
            }
        };
    }

};
