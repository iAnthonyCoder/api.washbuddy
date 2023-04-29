'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  	class Role extends Model {
		/**
		* Helper method for defining associations.
		* This method is not a part of Sequelize lifecycle.
		* The `models/index` file will call this method automatically.
		*/
		static associate(models) {
			this.belongsToMany(models.permission, {
				onDelete: 'RESTRICT',
      			through: 'role_permissions',
      			foreignKey: 'role_id',
      		})
			this.hasMany(models.user, {
				foreignKey: {
          			name: 'role_id',
          			allowNull: false
        		}
			})
		}
  	}
  	Role.init({
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
		default: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}

  	}, {
		sequelize,
		modelName: 'role',
		underscored: true
  	});
  	return Role;
};