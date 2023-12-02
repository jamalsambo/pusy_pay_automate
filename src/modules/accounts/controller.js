'use strict';
const { accounts } = require('./repositories');

module.exports = {
    accounts: async (req, res) => {
        try {
            const exec = await accounts();
            if (exec) {
                res.json({ status: 1, data: exec })
            } else {
                res.json({ status: 2, data: null })
            }
        } catch (error) {
            res.json({ status: 5, data: error })
        }
    }
}