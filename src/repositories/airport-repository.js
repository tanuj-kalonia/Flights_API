const CrudRepository = require('./crud-repository');
const { Airport } = require('../models');

class AirportRepository extends CrudRepository {
    constructor() {
        // Pass the model to the parent class
        super(Airport);
    }
}

module.exports = AirportRepository;