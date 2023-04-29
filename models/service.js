'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.city, {
                onDelete: 'RESTRICT',
                through: 'city_services',
                foreignKey: 'service_id',
            })
            
        }
    }
    Service.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        sequelize,
        modelName: 'service',
        underscored: true
    });
    return Service;
};