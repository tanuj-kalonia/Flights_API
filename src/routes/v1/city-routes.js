const express = require('express');

const { CityController } = require('../../controllers')
const { CityMiddleware } = require('../../middlewares');

const router = express.Router();

// create a city
router.post('/',
    CityMiddleware.validateCreateRequest,
    CityController.createCity
)

// get all the Cities from the db
router.get('/', CityController.getCities);

// get a City
// GET : /api/v1/cities/:id
router.get('/:id', CityController.getCity);
router.delete('/:id', CityController.destroyCity);

// Patch : /api/v1/airplanes/:id
router.patch('/:id', CityController.updateCity);

module.exports = router;