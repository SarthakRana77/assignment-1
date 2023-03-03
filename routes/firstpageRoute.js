const path = require('path');
const {check}=require('express-validator/check');
const express = require('express');

const Controller = require('../controllers/controller');

const router = express.Router();

router.get('/', Controller.getAgent_client);
router.post('/check-client',Controller.postUpdateClient);
router.get('/check-client',Controller.getFp);
router.post('/update-client',Controller.postUc);
router.post('/update-success',Controller.postClientSuccessupdated);


module.exports = router;
