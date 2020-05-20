const express = require('express');
let RegistrationsController = require('../controllers/registrations');
let router = express.Router();

router.get('/singup',RegistrationsController.new);
router.route('/users').post(RegistrationsController.create);
module.exports = router;
