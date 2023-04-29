'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class City_service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
          
        }
    }
    City_service.init({
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'city_service',
        underscored: true
    });
    return City_service;
};