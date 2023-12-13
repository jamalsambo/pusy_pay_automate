'use strict';
const { create } = require('../push/controller');
const { register, find } = require('./repositories');
const { accounts } = require('../accounts/repositories');
const { api } = require('../api');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const mozambiqueTimeZone = 'Africa/Maputo';
const cron = require('node-cron');

// Agendamento para executar a tarefa todos os dias às 12:00
cron.schedule('30 16 * * *', async () => {
    const uuid = uuidv4();
    var qid = null;
    const nowInMozambique = moment.tz(mozambiqueTimeZone).format('YYYY-MM-DD HH:mm:ss');

    try {
        const acc = await accounts();

        function* reader() {
            for (let i = 0; i < acc.length; i++) {
                yield acc[i]
            }
        }

        const iterator = reader();

        let line = iterator.next();


        // processing
        while (!line.done) {
            const padrao = /^(\+25885|\+25884)/;
            const monthlyPayment = (line.value.hour_price * 24) * 30;
            const amount = Number(monthlyPayment.toFixed(0));
            const angaza_id = line.value.angaza_id;
            const msisdn = line.value.owner_msisdn;
            const account_number = line.value.account_number;
            const customer_name = line.value.owner_name;

            if (padrao.exec(msisdn)) {

                const exec = await create(amount, msisdn, angaza_id);

                const data = {
                    angaza_id: angaza_id,
                    third_party_reference: exec.output_ThirdPartyReference,
                    amount: amount,
                    response_code: exec.output_ResponseCode,
                    account_number: account_number,
                    customer_name: customer_name,
                    country: 'MZ',
                    transaction_id: exec.output_TransactionID,
                    msisdn: msisdn,
                    payment_description: 'Mensalidade',
                    createBy: 'System',
                    createdAt: nowInMozambique,
                    response_desc: exec.output_ResponseDesc
                };

                if (exec.output_ResponseCode == 'INS-0') {
                    const dataToAngaza = {
                        amount: amount,
                        msisdn: msisdn,
                        account_qid: angaza_id,
                        external_xref: exec.output_TransactionID
                    }

                    const paygAngaza = await api(`payments/${uuid}`, dataToAngaza, "PUT");
                    if (paygAngaza.qid) {
                        qid = paygAngaza.qid;
                        await register(data, qid)
                    } else {
                        await register(data, qid)
                    }
                } else {
                    await register(data, qid)
                }


            }

            line = iterator.next();
        }

    } catch (error) {
        console.log(error)
    }
});