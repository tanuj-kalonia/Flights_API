const express = require('express');

const { AirplaneController } = require('../../controllers')
const { AirplaneMiddleware } = require('../../middlewares');

const router = express.Router();

// create an airplane
router.post('/',
    AirplaneMiddleware.validateCreateRequest,
    AirplaneController.createAirplane
)

// get all the airplanes from the db
router.get('/', AirplaneController.getAirplanes)

module.exports = router;