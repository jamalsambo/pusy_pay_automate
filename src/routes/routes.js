"use strict";

const express = require("express");
const router = express.Router();
const payment = require('../modules/payment/router');
const push = require('../modules/push/router');

router.use('/payment', payment);
router.use('/push', push);

module.exports = router;