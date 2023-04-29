'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class City extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
        static associate(models) {
            this.hasMany(models.user, {
				foreignKey: {
          			name: 'city_id',
        		}
			})
            this.hasMany(models.business, {
				foreignKey: {
          			name: 'city_id',
        		}
			})
            this.belongsTo(models.state, {
				onDelete: 'RESTRICT',
				foreignKey: {
				  	name: 'state_id',
				  	allowNull: false
				}
			})
            this.belongsToMany(models.service, {
                onDelete: 'RESTRICT',
                through: 'city_services',
                foreignKey: 'city_id',
            })
        }
    }
    City.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'city',
        underscored: true
    });
    return City;
};