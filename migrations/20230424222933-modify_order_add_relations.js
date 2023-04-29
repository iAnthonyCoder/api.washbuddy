'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.addColumn(
				'orders',
				'user_id',
				{
					type: Sequelize.INTEGER,
					allowNull:true,
					references: {
						model: 'users',
						key: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'RESTRICT',
				},
			),
			queryInterface.addColumn(
				'orders',
				'business_id',
				{
					type: Sequelize.INTEGER,
					allowNull:true,
					references: {
						model: 'businesses',
						key: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'RESTRICT',
				},
			),
			queryInterface.addColumn(
				'orders',
				'city_id',
				{
					type: Sequelize.INTEGER,
					allowNull:true,
					references: {
						model: 'cities',
						key: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'RESTRICT',
				},
			),
			queryInterface.addColumn(
				'orders',
				'service_id',
				{
					type: Sequelize.INTEGER,
					allowNull:true,
					references: {
						model: 'services',
						key: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'RESTRICT',
				},
			),
		])
	},
	async down (queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.removeColumn('orders', 'user_id'),
			queryInterface.removeColumn('orders', 'business_id'),
			queryInterface.removeColumn('orders', 'city_id'),
			queryInterface.removeColumn('orders', 'service_id')
		]);
	}
};