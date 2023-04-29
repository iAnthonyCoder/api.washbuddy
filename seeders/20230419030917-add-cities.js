'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('cities', [
            {
                name: 'LOS ANGELES',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'NORTH HOLLYWOOD',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'VAN NUYS',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },     
            {
                name: 'NORTHRIDGE',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'CANOGA PARK',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },   
            {
                name: 'RESEDA',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },   
            {
                name: 'ENCINO',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },   
            {
                name: 'GRANADA HILLS',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },   
            {
                name: 'SYLMAR',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },   
            {
                name: 'PACOIMA',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },   
            {
                name: 'SUNLAND',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },   
            {
                name: 'BURBANK',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },   
            {
                name: 'STUDIO CITY',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'WOODLAND HILLS',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'CHATSWORTH',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'GLENDALE',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'PASADENA',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'SANTA MONICA',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'INGLEWOOD',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'HAWTHORNE',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'TORRANCE',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'CARSON',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'COMPTON',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'ALHAMBRA',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'ARCADIA',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'EL MONTE',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'DOWNEY',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'NORWALK',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'LONG BEACH',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'WEST COVINA',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'WEST COVINA',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'EL MONTE',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            {
                name: 'ALHAMBRA',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
    	], {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('states', null, {});
    }
};