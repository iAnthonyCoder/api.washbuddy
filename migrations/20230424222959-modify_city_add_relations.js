'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.addColumn(
				'cities',
				'state_id',
				{
					type: Sequelize.INTEGER,
					allowNull:true,
					references: {
						model: 'states',
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
			queryInterface.removeColumn('cities', 'state_id'),
		]);
	}
};