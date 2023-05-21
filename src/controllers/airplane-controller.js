const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');


/**
 * 
 * POST request, we will reciece the data of airplane
 * Data : {modelNumber : 'Airbus A380, capacity : 180}
 */
async function createAirplane(req, res) {
    try {
        const { modelNumber, capacity } = req.body;

        const airplane = await AirplaneService.createAirplane({ modelNumber, capacity });

        SuccessResponse.data = airplane;
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
async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();

        SuccessResponse.data = airplanes;
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
    createAirplane,
    getAirplanes
}