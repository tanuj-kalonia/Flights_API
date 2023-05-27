const express = require('express');

const { FlightController } = require('../../controllers')
const { FlightMiddleware } = require('../../middlewares');

const router = express.Router();

// create a Flight
router.post('/',
    FlightMiddleware.validateCreateRequest,
    FlightController.createFlight
)

module.exports = router;