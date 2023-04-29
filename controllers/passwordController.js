const User = require('../models/index').user
const Op = require('sequelize').Op
// const sendEmail = require('./helpers/authHelper');
const crypto = require('crypto');
const { sendEmail } = require('../helpers/send_email');
const Joi = require('@hapi/joi');

const reset_schema = Joi.object({
    token: Joi.string().required().min(5).max(128),
    new_password: Joi.string().required().min(5).max(24),
    confirm_new_password: Joi.ref('new_password')
});

exports.forgot = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        console.log(User);
        console.log('@#@#@#@');
        const user = await User.scope('withPassword').findOne({where:{
            email,
        }});
        console.log(user);
        if(user.reset_password_expires > Date.now()){
            return res.status(422).json({
                data:{
                    message: 'Too many requests. Try again later...'
                }
            })
            
        }
        if(!user) return res.status(401).json(
            res.status(200).json()
        )
        user.reset_password_token = crypto.randomBytes(20).toString('hex');
        user.reset_password_expires = Date.now() + 3600000;
        await user.save();
        if(!await sendPasswordResetEmail(user)){
            return res.status(409).json({
                data:{
                    message: 'Email service is disabled.'
                }
            })
        }
        res.status(200).json();
    } catch (error) {
        console.log(error);
        res.status(200).json()
    }
}


exports.validate = async (req, res) => {
        
    try {
        const token = req.params.token;
        const user = await User.findOne({resetPasswordToken: token});
        if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'});
        res.status(200).json({message: 'Valid token.'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};


exports.reset = async (req, res) => {
    try {
        var validation = await reset_schema.validate(req.body);
        if (validation.error) {
            return res.status(422).json({
                errors: validation.error.details
            })
        }

        const { 
            token,
            new_password,
        } = validation.value;

        const user = await User.findOne({
            where: {
                reset_password_token: token, 
                reset_password_expires: { 
                    [Op.gt]: Date.now()
                }
            }
        });
        if (!user) return res.status(401).json({
            data:{
                message: 'Password reset token is invalid or expired.'
            }
        });
        user.password = new_password;
        user.reset_password_token = null;
        user.reset_password_expires = null;
        user.is_verified = true;
        await user.save();

        res.status(200).json({message: 'Your password has been updated.'});

    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

async function sendPasswordResetEmail(user, req){
    try{
       
        let subject = "Password change request";
        let to = user.email;
        let from = "noreply@weedzly.com";
        let link = "http://localhost:3000/reset-password?token="+user.reset_password_token;
        let html = `<p>Hello there!</p>
                    <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
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