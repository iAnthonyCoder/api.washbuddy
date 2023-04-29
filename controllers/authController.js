const Joi = require('@hapi/joi');
const User  = require('../models/index').user
const Role  = require('../models/index').role
const Business  = require('../models/index').business
const { validateFields } = require('../core/validateFields');
const {
    MASTER_MODEL, RELATION_MODEL
} = require('../constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {
    create,
} = require('../core/createARecord');
const { getToken } = require('../core/token');


const internal_validation = [
    { 
        model: User,
        field: 'email',
        message: 'Email not found',
        type: MASTER_MODEL,
        will: false,
    },
];

const internal_validation_sing_up = [
    {
        model: Role,
        field: 'role_id',
        fieldRelation: 'id',
        message: [
			{
				"message": 'Role doesn\'t exist',
				"path": ["role"]
			}
		],
        type: RELATION_MODEL,
        will: false,
    },
    {
        model: User,
        field: 'email',
        message: [
			{
				"message": 'Email already registered',
				"path": ["email"]
			}
		],
        type: MASTER_MODEL,
        will: true,
    },
    {
        model: User,
        field: 'username',
        message: [
			{
				"message": 'Username taken',
				"path": ["username"]
			}
		],
        type: MASTER_MODEL,
        will: true,
    },
];

const register_schema = {
    email: Joi.string().email().required().max(40),
    role_id: Joi.number().required(),
    password: Joi.string().required().min(5).max(24),
    username: Joi.string().required().min(3).max(16).regex(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+$/),
};

exports.login = async (req, res) => {
  
    try {
        const {
            body
        } = req;
    
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
    
        const validation = schema.validate(body, {
            abortEarly: false,
            allowUnknown: false,
        });
    
        if (!validation.error && !_.isEmpty(internal_validation)) {
            const internal_validations = await validateFields(body, internal_validation);
            if (internal_validations.success) {
                return res.status(401).json({errors:[{message:'Incorrect credentials'}]})
            }
        } else if (validation.error) {
            return res.status(401).json({errors:[{message:'Incorrect credentials'}]})
        }
      
        const {
            email,
            password,
        } = body;
        
        const user = await getUserByEmail(email);
    
        const hash = await bcrypt.compare(password, user.password);
      
        if(!hash) {
            return res.status(401).json({errors:[{message:'Incorrect credentials'}]})
        } else {
    
            const accessToken = await getToken(user)
        
            return res.status(200).json({
                data: {
                    accessToken
                }
            });
    
        }
    } catch (er){
        return res.status(500).json();
    }

};

exports.register = async (req, res) => {

    const {
        body,
    } = req;

    const role = await Role.findOne({
        where:{
            default:1
        }
    })

    body.role_id = role.id

    const result = await create(User, body, register_schema, internal_validation_sing_up, {}, true);
    
    const { code, data } = result;

    res.status(code).json(data);
};

async function getUserByEmail(email) {
    return User.scope('withPassword').findOne(
        {
            where:{
                email
            },
            include:[
                {
                    model: Business,
                }
            ]
        }
    );
}

