'use strict';
const { create,transactionStatus } = require('./repositories');
const { removeSpecialCharacters } = require('../shortcode');
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ&@');

module.exports = {
    create: async (amount, msisdn, angaza_id) => {
        var sanitizedString = shortid.generate(6)
        const shortcode = removeSpecialCharacters(sanitizedString);
        const owner_msisdn = msisdn;
        const msisdnFormatad = owner_msisdn.slice(1);

        try {
            const response = await create(amount, msisdnFormatad, angaza_id, 'SW' + shortcode);
            return response
        } catch (error) {
            return error
        }
    }
}