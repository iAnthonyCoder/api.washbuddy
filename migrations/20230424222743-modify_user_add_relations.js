'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.addColumn(
				'users',
				'role_id',
				{
					type: Sequelize.INTEGER,
					allowNull:true,
					references: {
						model: 'roles',
						key: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'RESTRICT',
				},
			),
			queryInterface.addColumn(
				'users',
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
				'users',
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
		])
	},
	async down (queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.removeColumn('users', 'role_id'),
			queryInterface.removeColumn('users', 'business_id'),
			queryInterface.removeColumn('users', 'city_id')
		]);
	}
};