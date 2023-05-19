const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');

/**
 * 
 * POST request, we will reciece the data of airplane
 * Data : {modelNumber : 'Airbus A380, capacity : 180}
 */
async function createAirplane(req, res) {
    try {
        const { modelNumber, capacity } = req.body;
        console.log(req.body);

        const airplane = await AirplaneService.createAirplane({ modelNumber, capacity });

        // console.log(airplane)

        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                message: "Successfully created an airplane",
                data: airplane,
                error: {}

            })
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: "Something went wrong while creating the airplane",
                data: {},
                error: error

            })
    }
}

module.exports = {
    createAirplane
}