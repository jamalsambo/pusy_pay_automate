const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { accounts } = require('../../../models');
const moment = require('moment');
const mozambiqueTimeZone = 'Africa/Maputo';

exports.accounts = async () => {
    const nowInMozambique = moment.tz(mozambiqueTimeZone).format('YYYY-MM-DD');
    const startTime = Date.parse(nowInMozambique+' 00:00:00');
    const endTime = Date.parse(nowInMozambique+' 23:59:59'); 

    return await accounts.findAll({
        where: {
            [Op.or]: [
                { account_status: 'DISABLED' }, // Todas as contas com status "disabled"
                {
                    account_status: 'ENABLED',
                    date_of_disablement_utc: {
                        [Op.between]: [startTime, endTime],
                    },
                },
            ]
        },
        limit: 10
    });
}