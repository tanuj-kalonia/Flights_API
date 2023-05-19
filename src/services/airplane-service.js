// Service use Repositoris to interact with the db
// All sort of buisness ligic is written here
// controllers passes the request to servies
// controller -> services -> repos -> db

const { AirplaneRepository } = require('../repositories');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        // data is passed to the parent class of airplaneRepositores that has a create func
        const airplane = await airplaneRepository.create(data);
        return airplane;

    } catch (error) {
        throw error;
    }
}

module.exports = { createAirplane };