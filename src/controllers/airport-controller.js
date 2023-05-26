const { StatusCodes } = require('http-status-codes');
const { AirportService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');


/**
 * 
 * POST request, we will reciece the data of airplane
 * Data : {modelNumber : 'Airbus A380, capacity : 180}
 */

// POST : /api/v1/airports
async function createAirport(req, res) {
    try {
        const { name, code, address, cityId } = req.body;

        const airport = await AirportService.createAirport({ name, code, address, cityId });

        SuccessResponse.data = airport;
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

// GET all the planes
// GET : /api/v1/airports
async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();

        SuccessResponse.data = airports;
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

// GET a single airport by giving primary key as params
// /api/v1/airports/:id
async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);

        SuccessResponse.data = airport;
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

/// delete : /api/v1/airports/:id
async function destroyAirport(req, res) {
    try {
        const airport = await AirportService.destroyAirport(req.params.id);

        SuccessResponse.data = airport;
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
async function updateAirport(req, res) {
    try {
        const data = req.body;

        const airport = await AirportService.updateAirport(req.params.id, data);

        SuccessResponse.data = airport;
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
module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}