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

// get an airplane
// GET : /api/v1/airplanes/:id
router.get('/:id', AirplaneController.getAirplane);
router.delete('/:id', AirplaneController.destroyAirplane);

// Patch : /api/v1/airplanes/:id
router.patch('/:id', AirplaneController.updateAirplane);

module.exports = router;