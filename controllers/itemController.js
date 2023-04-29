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
const Item  = require('../models/index').item

const schema = {
	name: Joi.string().required().min(2).max(60),
};


const internal_validation = [

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
		model: Item,
		query,
		allowed_fields_sort,
		default_sort_config,
		default_search_fields,
	})

	res.status(code).json(data)
}

exports.find = async (req, res) => {
	const { 
		params: {
			id
		}, 
	} = req;

	const result = await findOneWithPopulate(id, Item);

	const { code, data } = result;

	res.status(code).json(data);
};

exports.create = async (req, res) => {
	const {
		body,
	} = req;

	const result = await create(Item, body, schema, internal_validation);

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

	const result = await edit(id, Item, body, schema, internal_validation);

	const { code, data } = result;

	res.status(code).json(data);
};


exports.remove = async (req, res) => {
	const {
		params: {
			id
		}
	} = req;

	const result = await destroy(id, Item);

	const { code, data } = result;

	res.status(code).json(data);
};