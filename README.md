# Flights_API

### This is a Monolith based project and is based on MVC arch.

1. Created `Create` funtion in the CRUD repo

2. Added `Error` Class to handle the errors, gives better Error handling while consuming the API's at frontend

3. Implimented CRUD API's for `Airplane` Routes (/api/vi/airplanes)

4. Created Migrations for City table

```
    npx sequelize model:generate --name <Table Name> --attributes <Table Attributes>:<DataType>
    npm sequelize db:migrate

```

5. Implimented CRUD API's for `City` Routes (/api/v1/cities)

### `Work in Progress`
