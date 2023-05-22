const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if (!req.body.name) {

        ErrorResponse.message = "Something went wrong while creating airplane";

        ErrorResponse.error = new AppError(["The parameter 'name' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)

        return res.json(ErrorResponse)
    }
    next();
}

module.exports = { validateCreateRequest }