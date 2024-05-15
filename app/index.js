const express = require("express");

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION 💥💥🚀 Shutting down ");
    console.log(err.name, err.message);
    process.exit(1);
});

const app = express();

require("./bootstrap")(app);
require("./routes")(app);
// require("./middleware")(app);

module.exports = (port) => {
    const server = app.listen(port, () => {
        console.log(`App is running on port: ${port}`);
    });
    process.on("unhandledRejection", (err) => {
        console.log("UNHANDLED REJECTION! 💥💥 Shuting down...");
        console.log(err.name, err.message);
        server.close(() => process.exit(1));
    });
};
