'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Status extends Model {
      	/**
      	 * Helper method for defining associations.
      	 * This method is not a part of Sequelize lifecycle.
      	 * The `models/index` file will call this method automatically.
      	 */
      	static associate(models) {
			this.belongsToMany(models.order, {
                onDelete: 'RESTRICT',
                through: 'order_statuses',
                foreignKey: 'status_id',
            })
      	}
    }
    Status.init({
      	status: {
      	  	type: DataTypes.ENUM(
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
			allowNull: false,
			unique: true
      	},
      	description: {
      	  	type: DataTypes.STRING,
      	  	allowNull: false,
			unique: true
      	}
    }, {
    	sequelize,
    	modelName: 'status',
		underscored: true
    });
    return Status;
};