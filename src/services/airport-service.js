// Service use Repositoris to interact with the db
// All sort of buisness ligic is written here
// controllers passes the request to servies
// controller -> services -> repos -> db

const { StatusCodes } = require('http-status-codes');
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error')

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        // data is passed to the parent class of airportRepositores that has a create func
        const airport = await airportRepository.create(data);
        return airport;

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new airport Object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        // fetches all the airports from the database
        const airports = await airportRepository.getAll();
        return airports;

    } catch (error) {
        // the most probable error -> not able to connect to db
        throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// get a single airport bt giving primary key to indentify the airport tupple
async function getAirport(id) {
    try {
        // fetches all the airports from the database
        const airport = await airportRepository.get(id);
        return airport;

    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The Requested airport not found', error.statusCode);
        }
        // the most probable error -> not able to connect to db
        throw new AppError('Cannot fetch data of the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// delete an airport
async function destroyAirport(id) {
    try {
        // fetches all the airports from the database
        const airport = await airportRepository.destroy(id);
        return airport;

    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The Requested airport can not be deleted', error.statusCode);
        }
        // the most probable error -> not able to connect to db
        throw new AppError('Cannot fetch data of the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// update an airport
async function updateAirport(id, data) {
    try {
        // fetches all the airports from the database
        const airport = await airportRepository.update(id, data);
        return airport;

    } catch (error) {
        // Input not given or plane not found
        console.log(error);
        if (error.statusCode === StatusCodes.BAD_REQUEST || error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(error.explanation, error.statusCode);
        }

        // if capacity excessds the limit
        if (error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        // the most probable error -> not able to connect to db
        throw new AppError('Cannot fetch data of the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport,
}; 