const { Sequelize } = require('sequelize');
const CrudRepository = require('./crud-repository');
const { Flight, Airplane, Airport, City } = require('../models');
const db = require('../models')
const { addRowLockOnFlights } = require('../repositories/queries');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    // custom fun to get flights according to the filters]
    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail',
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    // on is used to join on custom col
                    // by default, it joins on the id property of the model used
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        })
        return response;
    }

    async updateRemainingSeats(flightId, seats, dec = true) {
        // this line takes row-level-lock to avoid  update of a same seats by diffrent users 
        await db.sequelize.query(addRowLockOnFlights(flightId));
        const flight = await Flight.findByPk(flightId);
        if (parseInt(dec)) {
            await flight.decrement('totalSeats', { by: seats });
        } else {
            await flight.increment('totalSeats', { by: seats });
        }

        return flight;
        // after executing this queery, it wwould decrement the seats wouldn't return the update results
    }

}

/* 
    With the above filter and sort filter, we are getting the following response

    "data": [
        {
            "id": 8,
            "flightNumber": "DL-324",
            "airplaneId": 3,
            "departureAirportId": "DEL",
            "arrivalAirportId": "BLR",
            "arrivalTime": "2023-05-28T14:00:00.000Z",
            "departureTime": "2023-05-28T11:30:00.000Z",
            "price": 1500,
            "boardingGate": null,
            "totalSeats": 457,
            "createdAt": "2023-05-27T07:34:19.000Z",
            "updatedAt": "2023-05-27T07:34:19.000Z"
        }
    ]
    In the above response, we are only getting departure,arrival,city id. We are not getting threir individual details.
    We also want to inculde the departure, arrival airport along with city.

    To do so, we wish to inculude their details from their respective tabes, hence we need to join the tables
    To join tables in sequelize, we need to use the 'inculde' keyword which is an array of tables we wish to join on
    
*/

module.exports = FlightRepository;