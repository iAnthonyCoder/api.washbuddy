const SecretJWT = process.env.SECRET_SALT || 'top_secret';
const jwt = require('jsonwebtoken');
const { isEmpty } = require('lodash');
const _ = require('lodash');
const User = require('../models/index').user
const Role = require('../models/index').role
const Permission = require('../models/index').permission
const Business = require('../models/index').business

async function permissionsVerification(id, resource) {
    let user = null;
 
    if (_.isNumber(id) && !_.isEmpty(resource)) {
        
        try {

            
            user = JSON.stringify(await User.findOne(
                {
                    where:{
                        id
                    },
                    include: [
                        {
                            model: Role,
                            include:[
                                {
                                    
                                    model: Permission,
                                }
                            ]
                        },{
                            model: Business,
                        }
                    ],
                
                
                }
            ), null, 2);

            user = JSON.parse(user)

            if (!_.isEmpty(user)) {
              
                const validate = user.role.permissions.find(x => x.resource === resource)
            
                return {
                    allow: !isEmpty(validate) ? true : false,
                    user,
                }
            }
        } catch (er) {
            console.log(er)
        }
    }
    return {
        allow: false,
        user,
    }
}

function validatePermission(resource, anonymous) {
    
    return async function (req, res, next) {
        const token = req.headers['authorization'];

        if (token) {
            const [token_type, real_token] = token.split(' ');
            jwt.verify(_.trim(real_token), SecretJWT, async function (err, decoded) {
                if (err) {
                    return res.status(401).send({
                        message: 'Invalid Token'
                    });
                } else {

                    const validation = await permissionsVerification(decoded.id, resource);

                    if(_.isEmpty(validation.user)){
                        return res.status(401).json({ message: "User Doesn't exist" });
                    }
                  
                    if(!validation.user.is_enabled){
                        return res.status(401).json({ message: "User disabled" });
                    }

                    if (!validation.allow) {
                        return res.status(403).json({ message: "User doesn't have permissions for this resource." });
                    } else {
                        req.user = validation.user;
                        // console.log(req.user)
                        // if(req.user.request_business_id){
                        //     req.user.request_business = Object.assign({}, req.user.business)
                        //     delete req.user.business
                        // }
                        next();
                    }
                    
                }
            });
        } else {
            if(anonymous){
                req.verificatePermisssion = permissionsVerification.bind(null, req, res, []);
                next();
            } else {
                return res.status(403).json({ message: "User doesn't have permissions for this resource." });
            }
        }
    }
}

module.exports = validatePermission;
