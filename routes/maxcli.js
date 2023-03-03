const path = require('path');

const express = require('express');

const maxcontroller = require('../controllers/max');

const maxrouter = express.Router();

maxrouter.post('/displayCalc',maxcontroller.maxCli);


module.exports = maxrouter;
