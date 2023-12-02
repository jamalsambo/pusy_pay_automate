'use strict';

const express = require('express');
const router = express.Router();

// main router
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node API Push Payment",
        version: "0.0.1"
    });
});

module.exports = router;