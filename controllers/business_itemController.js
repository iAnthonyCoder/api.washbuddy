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
const Item = require('../models/index').item;
const Business_item  = require('../models/index').business_item
const Business  = require('../models/index').business

const schema = {
	price: Joi.number().required().min(0).max(100000),
	business_id: Joi.number().required().min(1).max(10000000),
	item_id: Joi.number().required().min(1).max(100),
};

const edit_schema = {
	price: Joi.number().required().min(0).max(100000),
};


const internal_validation = [
    {
        model: Business,
        field: 'business_id',
        fieldRelation: 'id',
        message: [
			{
				"message": 'Business doesn\'t exist',
			}
		],
        type: RELATION_MODEL,
        will: false,
    },
	{
        model: Item,
        field: 'item_id',
        fieldRelation: 'id',
        message: [
			{
				"message": 'Item doesn\'t exist',
			}
		],
        type: RELATION_MODEL,
        will: false,
    },
	{
        model: Business_item,
        field: ['item_id', 'business_id'],
        fieldRelation: ['item_id', 'business_id'],
        message: [
			{
				"message": 'You already added this item',
			}
		],
        type: MULTI_FIELD_EXISTS,
        will: true,
    },
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
		model: Business_item,
		query,
		allowed_fields_sort,
		default_sort_config,
		default_search_fields,
        include: [
            {
				model: Item,
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

	const result = await findOneWithPopulate(id, Business_item, [
        {
            model: Item,
        }
    ]);

	const { code, data } = result;

	res.status(code).json(data);
};

exports.create = async (req, res) => {
	const {
		body,
	} = req;

	body.business_id = req.user.business.id

	const result = await create(Business_item, body, schema, internal_validation);

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

	const result = await edit(id, Business_item, body, edit_schema, []);

	const { code, data } = result;

	res.status(code).json(data);
};


exports.remove = async (req, res) => {
	const {
		params: {
			id
		}
	} = req;
 
	const result = await destroy(id, Business_item);

	const { code, data } = result;

	res.status(code).json(data);
};