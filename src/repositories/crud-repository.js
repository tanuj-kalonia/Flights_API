// only the repo files will talk to the database
// all sort of querries that are repetitive, will be handled by these repo files

// This curd file will handle all the crud operations by creating utility func
// This will help to segregate the logic and crud op

// service -> Repo

const { Logger } = require('../config')

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    // 1. create funtion
    // data -> object => {name, id, data,...}
    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    // 2. delete from table -> destoy
    async destroy(data) {
        try {
            const response = await this.model.destroy({
                where: { id: data } // delete from table where id = 'data'
            });
            return response;
        } catch (error) {
            Logger.error('Someting went wrong in the CRUD repo : destroy fun')
            throw error;
        }
    }

    // 3. get from table
    // data -> primary key or id => pass the id, and get the user
    async get(data) {
        try {
            const response = await this.model.findByPk(data);
            return response;
        } catch (error) {
            Logger.error('Someting went wrong in the CRUD repo : get fun')
            throw error;
        }
    }

    // 4. get the entire table
    // select * from table
    async getAll() {
        try {
            const response = await this.model.findAll();  // return an array of all the tupples
            return response;
        } catch (error) {
            Logger.error('Someting went wrong in the CRUD repo : getAll fun')
            throw error;
        }
    }
    // 5. Update the table
    // Update the user data with the given data who have this id;
    async update(id, data) {
        try {
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });  // return an array of all the tupples
            return response;
        } catch (error) {
            Logger.error('Someting went wrong in the CRUD repo : update fun')
            throw error;
        }
    }
}

module.exports = CrudRepository;