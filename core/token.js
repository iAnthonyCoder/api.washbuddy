const database = require('../models/index')
const User = database.users
const SecretJWT = process.env.SECRET_SALT || 'top_secret';
const jwt = require('jsonwebtoken');


exports.getToken = async (user) => {

    let _user = {
        id: user.id,
        email: user.email
    }

    const token = jwt.sign(_user, SecretJWT, {
        expiresIn: '1y',
        algorithm: 'HS256',
    });

    return token
    
};

