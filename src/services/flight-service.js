// Service use Repositoris to interact with the db
// All sort of buisness ligic is written here
// controllers passes the request to servies
// controller -> services -> repos -> db

const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error')
const { Op } = require('sequelize');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight Object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let customSortFilter = [];
    // trips = BOM-DEL
    if (query.trips) {
        // [departureAirportId, arrivalAirportId]  = [BOM,DEL]
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    // Price filter => price = min-max
    if (query.price) {
        let upperPriceLimit = 20000;
        [minPrice, maxPrice] = query.price.split("-");
        if (maxPrice == undefined) {
            maxPrice = upperPriceLimit
        }
        customFilter.price = {
            [Op.between]: [minPrice, maxPrice]
        }
    }

    // trvellers
    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }

    // date filter
    if (query.tripDate) {
        let endingDateTime = " 23:59:59";
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingDateTime]
        }
    }

    // sort filter - &sort=price_ASC,departureTime_DESC
    if (query.sort) {
        const params = query.sort.split(","); // array of diffrent sorts paramters - [price_ASC, departureTime_DESC]
        const sortFilters = params.map(param => param.split("_")) // array of sort filter - [[price,ASC], [departureTime,DESC]]
        customSortFilter = sortFilters
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter, customSortFilter);
        return flights;

    } catch (error) {
        console.log(error);
        throw new AppError('Cannot Fetch all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id) {
    try {
        // fetches all the airports from the database
        const flight = await flightRepository.get(id);
        return flight;

    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The Requested flight not found', error.statusCode);
        }
        // the most probable error -> not able to connect to db
        throw new AppError('Cannot fetch data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}; 