'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.role, {
                onDelete: 'RESTRICT',
                through: 'role_permissions',
                foreignKey: 'permission_id',
            })
        }
    }
    Permission.init({
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        resource: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'permission',
        underscored: true
    });
    return Permission;
};