'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.addColumn(
				'businesses',
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
			queryInterface.removeColumn('businesses', 'city_id'),
		]);
	}
};