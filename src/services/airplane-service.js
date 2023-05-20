// Service use Repositoris to interact with the db
// All sort of buisness ligic is written here
// controllers passes the request to servies
// controller -> services -> repos -> db

const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error')

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        // data is passed to the parent class of airplaneRepositores that has a create func
        const airplane = await airplaneRepository.create(data);
        return airplane;

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new airplane Object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { createAirplane }; 