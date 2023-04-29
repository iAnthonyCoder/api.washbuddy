'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  	async up(queryInterface, Sequelize) {
  		await queryInterface.createTable('businesses', {
  	  	  	id: {
  	  	  	  	allowNull: false,
  	  	  	  	autoIncrement: true,
  	  	  	  	primaryKey: true,
  	  	  	  	type: Sequelize.INTEGER
  	  	  	},
  	  	  	name: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},
			is_enabled: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			address: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			address_line_two: {
				type: Sequelize.STRING,
			},
			zip_code: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phone_number: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			website: {
				type: Sequelize.STRING,
				unique: true,
			},
			can_fluff_fold_service: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			can_dry_cleaning: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			can_pickup_delivery: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			can_rug_cleaning: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			can_shoe_cleaning: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			can_commercial_wash_fresh: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			cur_pickup_delivery_service: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			cur_other_admin_software: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			cities_wish_to_cover: {
				type: Sequelize.STRING,
			},
			how_did_you_hear: {
				type: Sequelize.STRING,
			},
			location: {
				type: Sequelize.GEOMETRY('POINT'),
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
  	  	await queryInterface.dropTable('businesses');
  	}
};