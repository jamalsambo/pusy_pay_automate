const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { payments } = require('../../../models/payment');

exports.register = async (data, qid) => {
    const update = {};

    if(data.angaza_id) update.angaza_id = data.angaza_id
    if(data.third_party_reference) update.third_party_reference = data.third_party_reference
    if(data.amount) update.amount = data.amount
    if(data.response_code) update.response_code = data.response_code
    if(data.account_number) update.account_number = data.account_number
    if(data.customer_name) update.customer_name = data.customer_name
    if(data.country) update.country = data.country
    if(data.transaction_id) update.transaction_id = data.transaction_id
    if(data.msisdn) update.msisdn = data.msisdn
    if(data.payment_description) update.payment_description = data.payment_description
    if(data.createBy) update.createBy = data.createBy
    if(data.createdAt) update.createdAt = data.createdAt
    if(data.response_desc) update.response_desc = data.response_desc
    if(qid) update.qid = qid
    
    const { id } = await payments.create(update);
    return id ? id : 0
},

exports.find = async (data) => {
    const search = {};
    const startTime = Date.parse(data.to+'T00:00:00');
    const endTime = Date.parse(data.from+'T23:59:59');
    if (data.id) search.id  = data.id;
    if (data.angaza_id) search.angaza_id  = data.angaza_id;
    if (data.customer) search.customer_name  = { [Op.like]: `%${data.customer}%` } ; 
    if (data.amount) search.amount  = data.amount
    if (data.account_number) search.account_number  = data.account_number
    if (data.msisdn) search.msisdn  = data.msisdn;
    if (data.createBy) search.createBy  = data.createBy;
    if (data.status) search.response_code  = data.status;
    if (data.to) search.createdAt =  { [Op.between]: [startTime, endTime] }

    return await payments.findAll({where: search});
}
