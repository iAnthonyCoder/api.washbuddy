'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  	class Business_item extends Model {
  	  	/**
  	  	 * Helper method for defining associations.
  	  	 * This method is not a part of Sequelize lifecycle.
  	  	 * The `models/index` file will call this method automatically.
  	  	 */
  	  	static associate(models) {
			this.hasMany(models.item_order, {
				foreignKey: {
          			name: 'business_item_id',
					allowNull: false,
        		}
			})
			this.belongsTo(models.business, {
				onDelete: 'RESTRICT',
				foreignKey: {
				  	name: 'business_id',
				  	allowNull: false
				}
			})
			this.belongsTo(models.item, {
				onDelete: 'RESTRICT',
				foreignKey: {
				  	name: 'item_id',
				  	allowNull: false
				}
			})
  	  	}
  	}
  	Business_item.init({
  	  	price: {
			type: DataTypes.FLOAT,
			allowNull: false
		}
  	}, {
  	  	sequelize,
  	  	modelName: 'business_item',
		underscored: true
  	});
  	return Business_item;
};