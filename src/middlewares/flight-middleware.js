const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { DateTimeHelper } = require('../utils/helpers');

function validateCreateRequest(req, res, next) {
    console.log(req.body);
    if (!req.body.flightNumber) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["The parameter 'flightNumber' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.airplaneId) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["The parameter 'airplaneId' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.departureAirportId) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["The parameter 'departureAirportId' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.arrivalAirportId) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["The parameter 'arrivalAirportId' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.arrivalTime) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["The parameter 'arrivalTime' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.departureTime) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["The parameter 'departureTime' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.price) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["The parameter 'price' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.totalSeats) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["The parameter 'totalSeats' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (DateTimeHelper.compareTime(req.body.departureTime, req.body.arrivalTime) == false) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["ArrivalTime can't be smaller than departureTime!!"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }

    next();
}

function validateUpdateSeatRequest(req, res, next) {
    if (!req.body.seats) {
        ErrorResponse.message = "Something went wrong while updating flight";
        ErrorResponse.error = new AppError(["The parameter 'Seat' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    next();
}
module.exports = { validateCreateRequest, validateUpdateSeatRequest }