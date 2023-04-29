'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.addColumn(
				'business_items',
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
				'business_items',
				'item_id',
				{
					type: Sequelize.INTEGER,
					allowNull:true,
					references: {
						model: 'items',
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
			queryInterface.removeColumn('business_items', 'business_id'),
      queryInterface.removeColumn('business_items', 'item_id'),
		]);
	}
};