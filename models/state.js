'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class State extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.city, {
				foreignKey: {
          			name: 'state_id',
                    allowNull: false
        		}
			})
        }
    }
    State.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        abbreviation: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        sequelize,
        modelName: 'state',
        underscored: true
    });
    return State;
};