const Joi = require('@hapi/joi');
const {
	create
} = require('../core/createARecord');
const {
	destroy
} = require('../core/deleteARecord');
const { RELATION_MODEL, MULTI_FIELD_EXISTS, MASTER_MODEL } = require('../constants');
const { edit } = require('../core/editARecord');
const { listRecords } = require('../core/listRecords');
const { findOneWithPopulate } = require('../core/findARecord');
const User = require('../models/index').user;
const Business  = require('../models/index').business
const City  = require('../models/index').city

const schema = {
	name: Joi.string().required().min(2).max(60),
    email: Joi.string().email(),
    phone_number: Joi.string().required().min(8).max(16),
    address: Joi.string().required().min(4).max(40),
    address_line_two: Joi.string().optional().max(40).allow(null, ''),
    city_id: Joi.number().required().min(0).max(100),
	zip_code: Joi.string().required().min(3).max(15),
};


const internal_validation = [
    {
        model: City,
        field: 'city_id',
        fieldRelation: 'id',
        message: [
			{
				"message": 'City doesn\'t exist',
			}
		],
        type: RELATION_MODEL,
        will: false,
    }
]

const allowed_fields_sort = [
	'createdAt',
]

const default_sort_config = [
	'createdAt', 'DESC'
]

const default_search_fields = [
	'id'
]



exports.list = async (req, res) => {
	const {
		query
	} = req

	let { code, data } = await listRecords({
		model: Business,
		query,
		allowed_fields_sort,
		default_sort_config,
		default_search_fields,
        include: [
            {
				model: City,
			}
        ]
	})

	res.status(code).json(data)
}

exports.find = async (req, res) => {
	const { 
		params: {
			id
		}, 
	} = req;

	const result = await findOneWithPopulate(id, Business, [
        {
            model: City,
        },{
            model: User,
        }
    ]);

	const { code, data } = result;

	res.status(code).json(data);
};

exports.create = async (req, res) => {
	const {
		body,
	} = req;

	const result = await create(Business, body, schema, internal_validation);

	const { code, data } = result;

	res.status(code).json(data);
};

exports.edit = async (req, res) => {
	const {
		body,
		params: {
			id
		}
	} = req;

	const result = await edit(id, Business, body, schema, internal_validation);

	const { code, data } = result;

	res.status(code).json(data);
};


exports.remove = async (req, res) => {
	const {
		params: {
			id
		}
	} = req;
    console.log(id);
	const result = await destroy(id, Business);

	const { code, data } = result;
    console.log(data);
	res.status(code).json(data);
};