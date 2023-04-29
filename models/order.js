'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.status, {
                onDelete: 'RESTRICT',
                through: 'order_statuses',
                foreignKey: 'order_id',
            })
        }
    }
    Order.init({
		type: {
	  		type: DataTypes.ENUM('pickup_delivery', 'fluff_fold'),
	  		allowNull: false
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false
	  	},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false
	  	},
		phone_number: {
			type: DataTypes.STRING,
			allowNull: false
	  	},
		address: {
			type: DataTypes.STRING,
			allowNull: false
	  	},
		address_line_two: {
			type: DataTypes.STRING,
	  	},
		zip_code: {
			type: DataTypes.STRING,
			allowNull: false
	  	},
		detergent_type: {
			type: DataTypes.ENUM('tide', 'gain', 'all_free_clear'),
			allowNull: false
	  	},
		fabric_softener: {
			type: DataTypes.ENUM('downy', 'all_free_clear', 'none'),
			allowNull: false
	  	},
		bleach_options_white_clothes: {
			type: DataTypes.ENUM('dont_use_bleach', 'clorox'),
			allowNull: false
	  	},
		water_temperature_dark_loads: {
			type: DataTypes.ENUM('hot', 'warm', 'cold'),
			allowNull: false
	  	},
		water_temperature_white_loads: {
			type: DataTypes.ENUM('hot', 'warm', 'cold'),
			allowNull: false
	  	},
		water_temperature_white_loads: {
			type: DataTypes.ENUM('hot', 'medium', 'low', 'permanent_press'),
			allowNull: false
	  	},
		water_temperature_white_loads: {
			type: DataTypes.ENUM('bounce_dryer_sheets', 'no_dryer_sheet'),
			allowNull: false
	  	},
		special_laundry_instructions: {
			type: DataTypes.STRING,
	  	},
		pickup_drop_off_instructions: {
			type: DataTypes.STRING,
	  	},
		total_laudromat: {
			type: DataTypes.FLOAT,
	  	},
		total: {
			type: DataTypes.FLOAT,
	  	},
		delivery_fee: {
			type: DataTypes.FLOAT,
	  	},
		internal_revenue: {
			type: DataTypes.FLOAT,
	  	}
    }, {
    	sequelize,
    	modelName: 'order',
		underscored: true
    });
    return Order;
};