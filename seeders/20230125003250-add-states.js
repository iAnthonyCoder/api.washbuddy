'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('states', [
            // {
            //     name: 'ALABAMA',
            //     abbreviation: 'AL',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'FLORIDA',
            //     abbreviation: 'FL',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },      
            // {
            //     name: 'GEORGIA',
            //     abbreviation: 'GA',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },      
            // {
            //     name: 'KENTUCKY',
            //     abbreviation: 'KY',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'MISSISSIPPI',
            //     abbreviation: 'MS',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },      
            // {
            //     name: 'NORTH CAROLINA',
            //     abbreviation: 'NC',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },      
            // {
            //     name: 'SOUTH CAROLINA',
            //     abbreviation: 'SC',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'TENNESSEE',
            //     abbreviation: 'TN',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'CONNECTICUT',
            //     abbreviation: 'CT',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'DELAWARE',
            //     abbreviation: 'DE',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'DISTRICT OF COLUMBIA',
            //     abbreviation: 'DC',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'MAINE',
            //     abbreviation: 'ME',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'MARYLAND',
            //     abbreviation: 'MD',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'MASSACHUSETTS',
            //     abbreviation: 'MA',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'NEW HAMPSHIRE',
            //     abbreviation: 'NH',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'NEW JERSEY',
            //     abbreviation: 'NJ',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'NEW YORK',
            //     abbreviation: 'NY',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'PENNSYLVANIA',
            //     abbreviation: 'PA',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'RHODE ISLAND',
            //     abbreviation: 'RI',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'VERMONT',
            //     abbreviation: 'VT',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'VIRGINIA',
            //     abbreviation: 'VA',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'WEST VIRGINIA',
            //     abbreviation: 'WV',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'ALASKA',
            //     abbreviation: 'AK',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'ARIZONA',
            //     abbreviation: 'AZ',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            {
                name: 'CALIFORNIA',
                abbreviation: 'CA',
                created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
                updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            // {
            //     name: 'HAWAII',
            //     abbreviation: 'HI',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'IDAHO',
            //     abbreviation: 'ID',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'NEVADA',
            //     abbreviation: 'NV',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'OREGON',
            //     abbreviation: 'OR',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'WASHINGTON',
            //     abbreviation: 'WA',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'ILLINOIS',
            //     abbreviation: 'IL',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'INDIANA',
            //     abbreviation: 'IN',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'IOWA',
            //     abbreviation: 'IA',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'KANSAS',
            //     abbreviation: 'KS',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'MICHIGAN',
            //     abbreviation: 'MI',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'MINNESOTA',
            //     abbreviation: 'MN',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'MISSOURI',
            //     abbreviation: 'MO',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'NEBRASKA',
            //     abbreviation: 'NE',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'OHIO',
            //     abbreviation: 'OH',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'WISCONSIN',
            //     abbreviation: 'WI',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'ARKANSAS',
            //     abbreviation: 'AR',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'COLORADO',
            //     abbreviation: 'CO',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'LOUISIANA',
            //     abbreviation: 'LA',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'MONTANA',
            //     abbreviation: 'MT',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'NEW MEXICO',
            //     abbreviation: 'NM',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'NORTH DAKOTA',
            //     abbreviation: 'ND',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'OKLAHOMA',
            //     abbreviation: 'OK',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'TEXAS',
            //     abbreviation: 'TX',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'UTAH',
            //     abbreviation: 'UT',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'SOUTH DAKOTA',
            //     abbreviation: 'SD',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // },
            // {
            //     name: 'WYOMING',
            //     abbreviation: 'WY',
            //     created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            //     updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            // }
    	], {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('states', null, {});
    }
};