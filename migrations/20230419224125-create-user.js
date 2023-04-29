'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('users', {
	      	id: {
	        	allowNull: false,
	        	autoIncrement: true,
	        	primaryKey: true,
	        	type: Sequelize.INTEGER
	      	},
	      	username: {
	        	type: Sequelize.STRING,
	        	unique: true,
	        	allowNull: false
	      	},
	      	first_name: {
	        	type: Sequelize.STRING
	     	},
	      	last_name: {
	        	type: Sequelize.STRING
	      	},
	      	email: {
	        	type: Sequelize.STRING,
	       		allowNull: false,
	      	},
	      	password: {
	        	type: Sequelize.STRING,
	        	allowNull: false
	      	},
	      	phone_number: {
	        	type: Sequelize.STRING,
	        	unique: true
	      	},
	      	address: {
	        	type: Sequelize.STRING
	      	},
	      	address_line_two: {
	        	type: Sequelize.STRING
	      	},
	      	zip_code: {
	        	type: Sequelize.STRING
	      	},
	      	picture: {
	        	type: Sequelize.STRING
	      	},
	      	verification_token: {
	        	type: Sequelize.STRING
	      	},
	      	verification_token_expires: {
	       		type: Sequelize.STRING
	      	},
	      	reset_password_token: {
	        	type: Sequelize.STRING
	      	},
	      	reset_password_expires: {
	        	type: Sequelize.STRING
	      	},
	      	is_verified: {
	        	type: Sequelize.BOOLEAN,
	        	allowNull: false,
	        	defaultValue: false
	      	},
	      	is_active: {
	        	type: Sequelize.BOOLEAN,
	        	allowNull: false,
	        	defaultValue: false
	      	},
	      	is_enabled: {
	        	type: Sequelize.BOOLEAN,
	        	allowNull: false,
	        	defaultValue: true
	      	},
	      	last_session: {
	        	type: Sequelize.DATE
	      	},
	      	last_ip_session: {
	        	type: Sequelize.STRING
	      	},
	      	created_at: {
	        	allowNull: false,
	        	type: Sequelize.DATE
	      	},
	     	updated_at: {
	        	allowNull: false,
	        	type: Sequelize.DATE
	      	}
	    });
	},
	async down(queryInterface, Sequelize) {
	    await queryInterface.dropTable('users');
	}
};