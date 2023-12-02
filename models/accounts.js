'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  accounts.init({
    angaza_id: {
      type: DataTypes.STRING,
      autoIncrement: false,
      allowNull: false,
      primaryKey: true
    },
    account_number: DataTypes.STRING,
    account_status: DataTypes.STRING,
    date_of_latest_payment_utc: DataTypes.DATE,
    date_of_disablement_utc: DataTypes.DATE,
    registration_date_utc: DataTypes.DATE,
    owner_msisdn: DataTypes.STRING,
    country: DataTypes.STRING,
    owner_name: DataTypes.STRING,
    hour_price: DataTypes.DOUBLE
  },
    {
      sequelize,
      freezeTableName: true,
      timestamps: false,
      schema: 'angaza_mozambique',
      modelName: 'accounts'
    });
  return accounts;
};