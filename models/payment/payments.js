'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class payments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    payments.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            autoIncrement: false,
            allowNull: false,
            primaryKey: true
        },
        angaza_id: DataTypes.STRING,
        third_party_reference: DataTypes.STRING,
        amount: DataTypes.DOUBLE,
        response_code: DataTypes.STRING,
        account_number: DataTypes.STRING,
        customer_name: DataTypes.STRING,
        country: DataTypes.STRING,
        transaction_id: DataTypes.STRING,
        msisdn: DataTypes.STRING,
        payment_description: DataTypes.STRING,
        createBy: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        response_desc: DataTypes.STRING,
        qid: DataTypes.STRING
    },
        {
            sequelize,
            freezeTableName: true,
            timestamps: false,
            schema: 'public',
            modelName: 'payments'
        });
    return payments;
};