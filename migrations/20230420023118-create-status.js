'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('statuses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.ENUM(
                    'placed',
				    'driver_pick',
				    'driver_picked_up',
				    'processed',
				    'washing',
				    'bagged',
				    'delivery',
				    'delivered', 
				    'dropped_off', 
				    'ready_pickup',
				    'picked_up'
                ),
				allowNull: false
            },
            description: {
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
        await queryInterface.dropTable('statuses');
    }
};