const CrudRepository = require('./crud-repository');
const { Airplane } = require('../models');

class AirplaneRepository extends CrudRepository {
    constructor() {
        // Pass the model to the parent class
        super(Airplane);
    }
}

module.exports = AirplaneRepository;