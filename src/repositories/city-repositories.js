const CrudRepository = require('./crud-repository');
const { City } = require('../models');

class CityRepository extends CrudRepository {
    constructor() {
        // Pass the model to the parent class
        super(City);
    }
}

module.exports = CityRepository;