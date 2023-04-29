const Joi = require('@hapi/joi');
const SecretJWT = process.env.SECRET_SALT || 'top_secret';
const User = require('../models/index').user
const Business  = require('../models/index').busiless
const Role  = require('../models/index').role
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const moment = require('moment')
const { sendEmail } = require('../helpers/send_email');
const {
    MASTER_MODEL, RELATION_MODEL,
} = require('../constants');
const {
	create
} = require('../core/createARecord');
const {
    edit
} = require('../core/editARecord');
const jwt = require('jsonwebtoken');
const { getToken } = require('../core/token');
const { listRecords } = require('../core/listRecords');
const { findOneWithPopulate } = require('../core/findARecord');
const { isEmpty } = require('lodash');
const { request } = require('http');
const { Op } = require('sequelize');

const edit_me_schema = {
    load_early: Joi.boolean().optional(),
    email: Joi.string().email().optional().max(40),
    password: Joi.string().optional().max(20),
    new_password: Joi.string().min(5).max(20).when('password', {is: Joi.exist(), then: Joi.required()}),
};

const schema = {
    username: Joi.string().required().min(3).max(24),
    first_name: Joi.string().required().min(2).max(16),
    last_name: Joi.string().required().min(2).max(16),
    phone_number: Joi.string().required().min(8).max(16),
    email: Joi.string().email().required(),
    role_id: Joi.number().required().min(1).max(3),
    business_id: Joi.number().required().min(1).max(10000000),
    password: Joi.string().required().min(5).max(24),
};

const edit_schema = {
    is_enabled: Joi.boolean().optional(),
    business_id: Joi.number().optional().min(2).max(99999999),
    role_id: Joi.number().required().min(2).max(3),
    b_membership_verification_token: Joi.string().optional().allow(null, ''),
    b_membership_verification_token_expires: Joi.date().optional().allow(null),
    // name: Joi.string().optional().min(8).max(128),
    request_business_id: Joi.number().optional().valid(null),
};

const edit_me_schema_broker_signup = {
    request_business_id: Joi.number().required().min(0).max(99999999999999),
    name: Joi.string().required().min(5).max(128),
    contact_email: Joi.string().email().required(),
    phone: Joi.string().required().min(13).max(13),
};

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const internal_validation = [
    {
        model: User,
        field: 'email',
        message: [
			{
				"message": 'Email exists',
				"path": ["email"]
			}
		],
        type: MASTER_MODEL,
        will: true,
    },
    {
        model: User,
        field: 'phone_number',
        message: [
			{
				"message": 'Phone_number exists',
				"path": ["phone_number"]
			}
		],
        type: MASTER_MODEL,
        will: true,
    },{
        model: Business,
        field: 'business',
        fieldRelation: 'id',
		message: [
			{
				"message": 'Business doesn\'t exist',
				"path": ["business"]
			}
		],
        type: RELATION_MODEL,
        will: false,
    },{
        model: Business,
        field: 'request_business_id',
        fieldRelation: 'id',
		message: [
			{
				"message": 'Business doesn\'t exist',
				"path": ["business"]
			}
		],
        type: RELATION_MODEL,
        will: false,
    }
];


exports.edit_me = async (req, res) => {
    const {
        body,
        user
    } = req;

    let schema = edit_me_schema

    if(req.body.password || req.body.new_password){
        let _user = await User.scope('withPassword').findOne({where:{id: user.id}})
        const hash = await bcrypt.compare(req.body.password.trim(), _user.password);
        if(!hash){
            return res.status(409).json({data:{errors:[{message:'Wrong password.'}]}})
        } else {
            req.body.password = req.body.new_password
            delete req.body.new_password
        }
    }

    if(body.request_business_id && !isEmpty(user.business)){
        return res.status(422).json({
			errors: [
				{
					"message": 'You can not change your business.',
				}
			]
		})
    }

    if(body.request_business_id){
        schema = edit_me_schema_broker_signup
    }

    const result = await edit(user.id, User, body, schema, internal_validation, null, null, null, null, true);

    const { code, data } = result;

    res.status(code).json(data);
};


exports.get_me = async (req, res, next) => {
    try {
        res.status(200).json(req.user)
    } catch(err) {
        res.status(500).json({data:{errors:[{message:'Something went wrong.'}]}})
    }
};

exports.create = async (req, res) => {

	const {
		body,
	} = req;

	if(req.user.role.name==='administrator'){
        body.role_id = 2
        body.username = makeid(8);
        body.password = generatePassword()
    }

	const result = await create(User, body, schema, internal_validation);

	const { code, data } = result;

    if(code === 201){
        sendPasswordResetEmail(body)
    }
	
	res.status(code).json(data);

};

function generatePassword() {
    var length = 6,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    //return '123456'
    return retVal;
}


const allowed_fields_filters = [
    'name',
    'email',
    'business',
    'branch',
    'request_business_id'
]

const allowed_fields_list = [
    'name',
    'email',
    'phone',
]

const allowed_fields_search = [
    'name',
    'email',
    'phone',
    'business',
    'branch'
]


const default_search_fields = [
	'username'
]

exports.list = async (req, res, next) => {

	const {
		query
	} = req

	let masterFilter = [{
        id: {
            [Op.ne]: 1
        }
    }]

    let include = null

    if(req.user.role.name==='administrator'){
        include = [{model:Business}, {model:Role}]
    }
	
	let { code, data } = await listRecords({
		model: User,
		query,
		masterFilter,
        include,
        allowed_fields_filters,
        allowed_fields_list,
        allowed_fields_search,
        default_search_fields,
	})

	res.status(code).json(data)

};


exports.find = async (req, res) => {
    const {
		params: {
			id
		}
	} = req;

	let overwrite_condition = null

	const result = await findOneWithPopulate(id, User, [{model:Business},{model:Business}, {model:Role}], overwrite_condition, true);

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

	let overwrite_condition = {}

	const result = await edit(id, User, body, edit_schema, internal_validation, false, false, {}, overwrite_condition, true);

	const { code, data } = result;

	res.status(code).json(data);
};


async function sendPasswordResetEmail(user, req){
    try{
        user.reset_password_token = crypto.randomBytes(20).toString('hex');
        user.reset_password_expires = Date.now() + 3600000;
        let subject = "New Business Request";
        let to = user.email;
        let from = "noreply@weedzly.com";
        let link = "http://localhost:3000/reset-password?token="+user.reset_password_token;
        let html = `<p>Hello there!</p>
                    <p>You were added as owner of a business in WashBuddy.</p>
                    <p>Please click on the following <a href="${link}">link</a> to set your password.</p> 
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`; 
        
        try {
            await sendEmail({to, from, subject, html});
        } catch (er) {
            console.log(er)
        }
        return true;
    } catch (error) {
        return {message: error.message}
    }
}