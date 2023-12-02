const mpesa = require('mpesa-node-api');

exports.create = async (amount, msisdn,transactionRef, ref) => {
    return await mpesa.initiate_c2b(amount, msisdn, transactionRef, ref)   
};

exports.transactionStatus = async (thirdparty_ref, query_ref) => {
    return await mpesa.initiate_transaction_status(thirdparty_ref, query_ref)   
}

