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

async function getAirplanes() {
    try {
        // fetches all the airplanes from the database
        const airplanes = await airplaneRepository.getAll();
        return airplanes;

    } catch (error) {
        // the most probable error -> not able to connect to db
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// get a single airplane bt giving primary key to indentify the airplane tupple
async function getAirplane(id) {
    try {
        // fetches all the airplanes from the database
        const airplane = await airplaneRepository.get(id);
        return airplane;

    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The Requested airplane not found', error.statusCode);
        }
        // the most probable error -> not able to connect to db
        throw new AppError('Cannot fetch data of the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane
}; 