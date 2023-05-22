const { StatusCodes } = require('http-status-codes');
const { CityService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');


/**
 * 
 * POST request, we will reciece the data of airplane
 * Data : {modelNumber : 'Airbus A380, capacity : 180}
 */

// POST : /api/v1/airplanes
async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name
        });

        SuccessResponse.data = city;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse)

    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)   // from AppError
            .json(ErrorResponse)
    }
}

async function getCities(req, res) {
    try {
        const cities = await CityService.getCities();

        SuccessResponse.data = cities;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)   // from AppError
            .json(ErrorResponse)
    }
}

async function getCity(req, res) {
    try {
        const city = await CityService.getCity(req.params.id);
        SuccessResponse.data = city;

        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)   // from AppError
            .json(ErrorResponse)
    }
}

async function destroyCity(req, res) {
    try {
        const city = await CityService.destroyCity(req.params.id);

        SuccessResponse.data = city;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)   // from AppError
            .json(ErrorResponse)
    }
}
async function updateCity(req, res) {
    try {
        const data = req.body;
        console.log(data);
        const city = await CityService.updateCity(req.params.id, data); ``

        SuccessResponse.data = city;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);

    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)   // from AppError
            .json(ErrorResponse)
    }
}
module.exports = {
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity
}