const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');


/**
 * 
 * POST request, we will reciece the data of airplane
 * Data : {modelNumber : 'Airbus A380, capacity : 180}
 */

// POST : /api/v1/flights
/* req.body : {
        flightNumber
        airplaneId
        departureAirportId
        arrivalAirportId
        arrivalTime
        departureTime
        price
        boardingGate
        totalSeats
}

*/
async function createFlight(req, res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats,
        });
        SuccessResponse.data = flight;

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

async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)

    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)   // from AppError
            .json(ErrorResponse)
    }
}
async function getFlight(req, res) {
    try {
        const flight = await FlightService.getFlight(req.params.id);

        SuccessResponse.data = flight;
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
    createFlight,
    getAllFlights,
    getFlight
}