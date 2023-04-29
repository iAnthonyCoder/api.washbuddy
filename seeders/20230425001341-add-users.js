'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('users', [
			{
                username: 'mike',
                first_name: 'Michael',
                last_name: 'Ekimyan',
                email: 'michaelekimyan@gmail.com',
                password: 'admin',
				created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                role_id: 1,
                is_verified: true,
                is_enabled: true,
			},
            {
                username: 'anthony',
                first_name: 'Anthony',
                last_name: 'Medina',
                email: 'anthonymedina958@gmail.com',
                password: 'admin',
				created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                role_id: 1,
                is_verified: true,
                is_enabled: true,
			}
		])
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', null, {});
	}
};
