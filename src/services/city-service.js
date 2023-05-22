const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error')

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        // data is passed to the parent class of airplaneRepositores that has a create func
        const city = await cityRepository.create(data);
        return city;

    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new City Object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getCities() {
    try {
        // data is passed to the parent class of airplaneRepositores that has a create func
        const cities = await cityRepository.getAll();
        return cities;

    } catch (error) {
        // the most probable error -> not able to connect to db
        console.log(error)
        throw new AppError('Cannot fetch data of all the Cities', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity(id) {
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The requested City not found', StatusCodes.NOT_FOUND)
        }
        throw new AppError('Cannot fetch data of all the Cities', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id) {
    try {
        // fetches all the airplanes from the database
        const city = await cityRepository.destroy(id);
        return city;

    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The Requested City not found in the db', error.statusCode);
        }
        // the most probable error -> not able to connect to db
        throw new AppError('Cannot fetch data of the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id, data) {
    try {
        // fetches all the airplanes from the database
        const city = await cityRepository.update(id, data);
        return city;

    } catch (error) {
        // Input not given or plane not found
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
        throw new AppError('Cannot fetch data of the City', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity
};