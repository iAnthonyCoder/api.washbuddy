'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item_order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.order, {
				onDelete: 'RESTRICT',
				foreignKey: {
				  	name: 'order_id',
				  	allowNull: false
				}
			})
            this.belongsTo(models.business_item, {
				onDelete: 'RESTRICT',
				foreignKey: {
				  	name: 'business_item_id',
				  	allowNull: false
				}
			})
        }
    }
    Item_order.init({
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'item_order',
        underscored: true
    });
    return Item_order;
};