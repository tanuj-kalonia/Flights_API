const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if (!req.body.name) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["The parameter 'name' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res.json(ErrorResponse)
    }
    if (!req.body.code) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["The parameter 'code' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res.json(ErrorResponse)
    }
    if (!req.body.cityId) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["The parameter 'cityId' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res.json(ErrorResponse)
    }
    next();
}

module.exports = { validateCreateRequest }