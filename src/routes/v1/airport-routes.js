const express = require('express');

const { AirportController } = require('../../controllers')
const { AirportMiddleware } = require('../../middlewares');

const router = express.Router();

// create an Airport
router.post('/',
    AirportMiddleware.validateCreateRequest,
    AirportController.createAirport
)

// get all the Airports from the db
router.get('/', AirportController.getAirports)

// get an airplane
// GET : /api/v1/Airports/:id
router.get('/:id', AirportController.getAirport);
router.delete('/:id', AirportController.destroyAirport);

// Patch : /api/v1/Airports/:id
router.patch('/:id', AirportController.updateAirport);

module.exports = router;