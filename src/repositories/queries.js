function addRowLockOnFlights(flightId) {
    return `SELECT * FROM flights WHERE flights.id = ${flightId} FOR UPDATE;`
}

module.exports = {
    addRowLockOnFlights
}