const express = require('express');

const { FlightController } = require('../../controllers')
const { FlightMiddleware } = require('../../middlewares');

const router = express.Router();

// create a Flight
router.post('/',
    FlightMiddleware.validateCreateRequest,
    FlightController.createFlight
)

// /api/v1/flights?queeries
router.get('/', FlightController.getAllFlights)

// / api / v1 / flights / : id -> get
router.get('/:id', FlightController.getFlight)

module.exports = router;