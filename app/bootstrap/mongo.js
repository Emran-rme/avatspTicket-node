const mongoose = require("mongoose");

const { MONGO_DB_NAME, MONGO_HOST, MONGO_PORT } = process.env;

const startMongoDB = () => {
    mongoose
        .connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`)
        .then(() => console.log("Connected!"))
        .catch((error) => console.log(error.message));
};

module.exports = startMongoDB;
