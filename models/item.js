'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
           
            this.hasMany(models.business_item, {
				foreignKey: {
          			name: 'item_id',
          			allowNull: false
        		}
			})
        }
    }
    Item.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        underscored: true,
        modelName: 'item'
    });
    return Item;
};