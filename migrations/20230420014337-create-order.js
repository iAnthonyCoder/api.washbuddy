'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('orders', {
		  	id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
		  	},
		  	type: {
				type: Sequelize.ENUM('pickup_delivery', 'fluff_fold'),
				allowNull: false
		  	},
		  	first_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
		  	last_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
		  	phone_number: {
				type: Sequelize.STRING,
				allowNull: false
			},
		  	address: {
				type: Sequelize.STRING,
				allowNull: false
			},
		  	address_line_two: {
				type: Sequelize.STRING,
			},
		  	zip_code: {
				type: Sequelize.STRING,
				allowNull: false
			},
		  	detergent_type: {
				type: Sequelize.ENUM('tide', 'gain', 'all_free_clear'),
				allowNull: false
			},
		  	fabric_softener: {
				type: Sequelize.ENUM('downy', 'all_free_clear', 'none'),
				allowNull: false
			},
		  	bleach_options_white_clothes: {
				type: Sequelize.ENUM('dont_use_bleach', 'clorox'),
				allowNull: false
			},
		  	water_temperature_dark_loads: {
				type: Sequelize.ENUM('hot', 'warm', 'cold'),
				allowNull: false
			},
		  	water_temperature_white_loads: {
				type: Sequelize.ENUM('hot', 'warm', 'cold'),
				allowNull: false
			},
		  	water_temperature_white_loads: {
				type: Sequelize.ENUM('hot', 'medium', 'low', 'permanent_press'),
				allowNull: false
			},
		  	water_temperature_white_loads: {
				type: Sequelize.ENUM('bounce_dryer_sheets', 'no_dryer_sheet'),
				allowNull: false
			},
		  	special_laundry_instructions: {
				type: Sequelize.STRING,
			},
		  	pickup_drop_off_instructions: {
				type: Sequelize.STRING,
			},
		  	total_laudromat: {
				type: Sequelize.FLOAT,
				allowNull: false
			},
		  	total: {
				type: Sequelize.FLOAT,
				allowNull: false
			},
		  	delivery_fee: {
			  	type: Sequelize.FLOAT,
				allowNull: false
			},
		  	internal_revenue: {
			  	type: Sequelize.FLOAT,
				allowNull: false
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
		await queryInterface.dropTable('orders');
  	}
};