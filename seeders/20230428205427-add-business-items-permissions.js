'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('permissions', [
            {
                name: 'Read Business_items',
                description: 'Allow to read business_items.',
                resource: 'business_items.read',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'Read a Business_item',
                description: 'Allow to read a business_item.',
                resource: 'business_item.read',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'Edit Business_item',
                description: 'Allow to edit a business_item.',
                resource: 'business_item.edit',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'Create Business_item',
                description: 'Allow to create a business_item.',
                resource: 'business_item.create',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'Destroy Business_item',
                description: 'Allow to destroy a business_item.',
                resource: 'business_item.destroy',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        ], {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('permissions', null, {});
    }
};
