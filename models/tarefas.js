'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class taferas extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    taferas.init({
        taferas: DataTypes.STRING
    },
        {
            sequelize,
            freezeTableName: true,
            timestamps: false,
            schema: 'public',
            modelName: 'taferas'
        });
    return taferas;
};