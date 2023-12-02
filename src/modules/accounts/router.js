'use strict';
const express = require('express');
const router = express.Router();
const {accounts} = require('./controller');

router.get('/', accounts)

module.exports = router;