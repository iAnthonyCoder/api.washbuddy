'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  	class Business extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasOne(models.user, {
				foreignKey: {
          			name: 'business_id',
        		}
			})
			this.belongsTo(models.city, {
				onDelete: 'RESTRICT',
				foreignKey: {
				  	name: 'city_id',
				}
			})
			this.hasMany(models.business_item, {
				foreignKey: {
          			name: 'business_id',
          			allowNull: false
        		}
			})
			this.hasMany(models.item_order, {
				foreignKey: {
          			name: 'order_id',
          			allowNull: false
        		}
			})
		}
  	}
  	Business.init({
		name: {
            type: DataTypes.STRING,
            unique: true,
			allowNull: false,
        },
		is_enabled: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address_line_two: DataTypes.STRING,
		zip_code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone_number: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		website: {
			type: DataTypes.STRING,
			unique: true,
		},
		can_fluff_fold_service: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		can_dry_cleaning: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		can_pickup_delivery: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		can_rug_cleaning: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		can_shoe_cleaning: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		can_commercial_wash_fresh: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		cur_pickup_delivery_service: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		cur_other_admin_software: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		cities_wish_to_cover: {
			type: DataTypes.STRING,
		},
		how_did_you_hear: {
			type: DataTypes.STRING,
		},
		location: {
			type: DataTypes.GEOMETRY('POINT'),
		}
  	}, {
		sequelize,
		modelName: 'business',
		underscored: true
  	});
  	return Business;
};