const _ = require('lodash');
const { validateQueryString } = require('./validateQueryString')
const moment = require('moment');
const { isEmpty } = require('lodash');
const sequelize = require('sequelize');
const Op = require('sequelize').Op

 exports.listRecords = async ({
    model, 
    query,
    include,
    attributes = null,
    subQuery = null,
    group = [],
    masterFilter = [],
    allowed_fields_filters,
    allowed_fields_list,
    allowed_fields_search,
    valid_sort_fields,
    allowed_fields_sort,
    default_sort_config = ['id', 'ASC'],
    extra_sort_fields = [],
    default_search_fields
}) => {

    let where = {}
    
    const queryFields = await validateQueryString(query, allowed_fields_filters, allowed_fields_list, allowed_fields_search)
    delete queryFields.search_field_type
    if(queryFields.code === 422){
        return queryFields
    }

    const pageOptions = pageOptionsValidator(queryFields)
    if(pageOptions.error){
        return {
            code: 422,
            data: {
                data: {
                    message: pageOptions.error
                }
            }
        };
    }

    const order = sortingOptionsValidator(queryFields, model, extra_sort_fields, allowed_fields_sort, default_sort_config)
    if(order.error){
        return {
            code: 422,
            data: {
                data: {
                    message: order.error
                }
            }
        };
    }

    const fields = fieldsValidator(query.fields, allowed_fields_list)
    if(fields.error){
        return {
            code: 422,
            data: {
                data: {
                    message: fields.error
                }
            }
        };
    }
    
    const search = searchValidator(query.search, query.search_field, default_search_fields)
    if(search.error){
        return {
            code: 422,
            data: {
                data: {
                    message: search.error
                }
            }
        };
    }
   
    if(search.filter){
        where = Object.assign(where, search.filter)
    }
    
    
    const filters = filtersParser(queryFields, model)
    if(filters.error){
        return {
            code: 422,
            data: {
                data: {
                    message: filters.error
                }
            }
        };
    }

    where = Object.assign(where, filters)

    if(masterFilter.length > 0){
        where = {
            [Op.and]:[
                where,
                masterFilter
            ],
        }
    }

    const { 
        offset, 
        limit, 
        current_page, 
        page_size 
    } = pageOptions

    try {

       
        let result = await model.findAndCountAll({
            ...(subQuery != null && {subQuery}),
            where,
            attributes,
            // having: sequelize.where(sequelize.fn('AVG', sequelize.col('reviews.rating'))),
            include,
            offset,
            order,
            group,
            limit,
            distinct: true
            // raw: true
        })

        let _count = null

        //THIS IS ADDED TO BRING TOTAL COUNT WHEN SUBQUERY IS FOUND, ADDED IN LIST OF BUSINESSES IN ORDER TO SHOW AVG AND COUNT OF REVIEW, PLEASE FIX LATER

        if(subQuery != null){
            _count = await model.count({
                where,
            })
        }
    
        return {
            code: 200,
            data:{
                data: result.rows,
                total: _count || result.count[0]['count'], 
                starting_at: offset >= 0  ? offset + 1 : 1,
                current_page: current_page,
                page_size: page_size
            }
        }

    } catch (er){
        console.log(er)
    }

}

const convertRulers = (value) => {
    
    switch (value) {
        case 'Date': 
            return moment(query.filter_value[i]).utc(0).toDate()
            break;
    //moment().format();                          // 2021-11-10T10:26:23-04:00
        default:
            break;
    }
}


const filtersParser = (query, model) => {

    

    if(query.filter_field && query.filter_type && query.filter_value){
        if((query.filter_field.length != query.filter_value.length) || (query.filter_field.length != query.filter_type.length)){
            return {
                error: 'Missing filter params',
            };
        }
        if(query.disjuntive_filters && query.filter_field.length === 1){
            return {
                error: 'In order to use conjuntive filters, you must have at least 2 filters groups',
            };
        }
        let filter = query.filter_field.map((x, i)=> {
            let type = model.rawAttributes[x].type.key
            return {
                [x]:{
                    [Op[query.filter_type[i]]]: type === 'Date' && query.filter_type[i].includes('gt') 
                                                                ? moment(query.filter_value[i]).utc(0).startOf('day').toDate()
                                            : type === 'Date' && query.filter_type[i].includes('lt')
                                                                ? moment(query.filter_value[i]).utc(0).endOf('day').toDate() : query.filter_value[i]
                }
            }
        })
        return {
            [query.disjuntive_filters ? Op.or : Op.and]: filter
        }
    } else if(query.filter_field || query.filter_type || query.filter_value){
        return {
            error: 'Missing filter params.',
        }; 
    } else {
        return []
    }
}


const searchValidator = (search, search_field, default_search_fields) => {

    const filters = {};

    default_search_fields.forEach((item) => (filters[item] = {
        [Op.like]: "%" + search + "%"
    }));

    
    if(search && search.length >= 1){
        return {
            filter:{
                [Op.or]: filters
            }
        }
     
    } else {
        return {}
    }
}

const pageOptionsValidator = (query) => {

    let pageOptions = Object.assign({
        sample: null,
        page_size: 24,
        page_number: null,
        starting_at: null,
        ending_at: null
    }, query)

    let skip = null

    if(pageOptions.starting_at){
        skip = pageOptions.starting_at-1
    } else if(pageOptions.page_number) {
        const page_number = pageOptions.page_number ? query.page_number-1 : 0
        const page_size = pageOptions.page_size
        skip =  page_number * page_size
    } 

    if(pageOptions.sample){
        return [
            { 
                $sample: { page_size: pageOptions.sample } 
            }
        ]
    } else {
        return {
            ...(skip) && {
                offset: skip
            },
            ...(pageOptions.page_size) && {
                limit: pageOptions.page_size,
                current_page: (skip / pageOptions.page_size) + 1,
                page_size: pageOptions.page_size
            },
            
        }
    }
}


const fieldsValidator = (fields, allowed_fields_list) => {
    if(fields && fields.length > 0){
        let _fields = {}
        fields.map(x => {
            _fields[x] = 1
        })
        return [
            {
                '$project': _fields
            }
        ]
    } else if(allowed_fields_list && allowed_fields_list.length > 0) {
        let _fields = {}
        allowed_fields_list.map(x => {
            _fields[x] = 1
        })
        return [
            {
                '$project': _fields
            }
        ]
    } else {
        return []
    }
}


const sortingOptionsValidator = (queryParams, model, extra_sort_fields, allowed_fields_sort = [], default_sort_config) => {
    
    if(queryParams.sort_field || queryParams.sort_order){
        if(!queryParams.sort_field && !queryParams.sort_order){
            return {
                error: 'SortField and SortOrder are required to create a custom sort',
            }; 
        } else if(!allowed_fields_sort.includes(queryParams.sort_field) && (!model.rawAttributes[queryParams.sort_field] || !extra_sort_fields.includes(queryParams.sort_field))){
            return {
                error: 'Invalid sort field',
            }; 
        }
    }
    if(queryParams.sort_field && queryParams.sort_order) {
        return [[queryParams.sort_field, queryParams.sort_order.toUpperCase()]]
    } else {
        return [default_sort_config]
    }
}