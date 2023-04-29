'use strict';

    let administrator_permissions = []

    let owner_permissions = [
        'user.get_me',
        'user.edit_me',
        'business.read',
        'businesses.read',
        'business.edit',
        'order.read',
        'orders.read',
        'order.edit',
        'status.read',
        'statuses.read',
        'item.read',
        'items.read',
        'business_item.create',
        'business_item.read',
        'business_items.read',
        'business_item.edit',
        'business_item.destroy',
        'services.read',
        'service.read',
        'cities.read',
        'city.read',
        'states.read',
        'state.read',
    ]

    let customer_permissions = [
        'user.get_me',
        'user.edit_me',
        'order.create',
        'order.edit',
        'services.read',
        'service.read',
        'cities.read',
        'city.read',
        'states.read',
        'state.read',
        'item.read',
        'items.read'
    ]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {

        try {
            await queryInterface.bulkInsert('roles', [
                {
                    name: 'administrator',
                    description: 'Role for Administrator of system.',
                    created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                    updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                    default: false
                },
                {
                    name: 'owner',
                    description: 'Role for Business Owner',
                    created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                    updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                    default: false
                },
                {
                    name: 'customer',
                    description: 'Role for Guest User',
                    created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                    updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                    default: true
                }
            ], {})
        } catch (er) {
            console.log('Roles weren`t created');
        }
        
      
        await queryInterface.sequelize.query("create table if not exists role_permissions(permission INT, role INT, FOREIGN KEY (permission) REFERENCES permissions(id) ON UPDATE CASCADE ON DELETE RESTRICT, FOREIGN KEY (role) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE RESTRICT)")

        let _permissions = await queryInterface.sequelize.query('select * from permissions');

        let _roles = await queryInterface.sequelize.query('select * from roles');

        _permissions = _permissions[0]

        _roles = _roles[0]

        const _admin_permissions = _permissions.map(x => {
            return {
                role_id: _roles.find(y => y.name === 'administrator').id,
                permission_id: x.id,
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        })

        const _owner_permissions = _permissions
            .filter(x => owner_permissions.find(y => y === x.resource))
            .map(x => {
                return {
                    role_id: _roles.find(y => y.name === 'owner').id,
                    permission_id: x.id,
                    updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                    created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                }
            })

        const _customer_permissions = _permissions
            .filter(x => customer_permissions.find(y => y === x.resource))
            .map(x => {
                return {
                    role_id: _roles.find(y => y.name === 'customer').id,
                    permission_id: x.id,
                    updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                    created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                }
            })
      
      

        let all_permissions = [
            ..._admin_permissions,
            ..._owner_permissions,
            ..._customer_permissions
        ]

       

        try {
            await queryInterface.bulkInsert('role_permissions', all_permissions, {})
        } catch (er){
            console.log('Role_Permissions weren`t created');
        }
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('roles', null, {});
    }
};
