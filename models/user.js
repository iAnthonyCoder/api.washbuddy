'use strict';
const {
	Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.role, {
				onDelete: 'RESTRICT',
				foreignKey: {
				  	name: 'role_id',
				  	allowNull: false
				}
			}),
			this.belongsTo(models.business, {
				onDelete: 'RESTRICT',
				foreignKey: {
				  	name: 'business_id',
				}
			})
			this.belongsTo(models.city, {
				onDelete: 'RESTRICT',
				foreignKey: {
				  	name: 'city_id',
				}
			})
		}
	}
	User.init({
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone_number: {
			type: DataTypes.STRING,
			unique: true
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true
		},
		address_line_two: {
			type: DataTypes.STRING,
			allowNull: true
		},
		zip_code: {
			type: DataTypes.STRING,
			allowNull: true
		},
		picture: DataTypes.STRING,
		verification_token: DataTypes.STRING,
		verification_token_expires: DataTypes.STRING,
		reset_password_token: DataTypes.STRING,
		reset_password_expires: DataTypes.STRING,
		is_verified: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		is_enabled: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		},
		last_session: DataTypes.DATE,
		last_ip_session: DataTypes.STRING,
	}, {
		hooks: {
			beforeSave: async (user, options) => {
				
				if(user.first_name){
					user.first_name = user.first_name.toUpperCase()
				}

				if(user.last_name){
					user.last_name = user.last_name.toUpperCase()
				}

				if(user.address){
					user.address = user.address.toUpperCase()
				}

				if(user.address_line_two){
					user.address_line_two = user.address_line_two.toUpperCase()
				}

				if(user.password){
				  	const hash = await bcrypt.hash(user.password.trim(), 10);
				  	user.password = hash
				}
			},
		},
		defaultScope: {
		  	attributes: { 
				exclude: [
				  	'password', 
				  	'reset_password_expires', 
				  	'reset_password_token', 
				  	'verification_token',
				  	'verification_token_expires',
				  	'last_ip_session',
				  	'last_session'
				],
		  	},
		},
		scopes: {
		  	withPassword: {
				attributes: { },
		  	}
		},
		sequelize,
		modelName: 'user',
		underscored: true,
	});
	return User;
};