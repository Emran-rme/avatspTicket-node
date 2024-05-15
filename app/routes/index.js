const V1Routers = require("./v1");

module.exports = (app) => {
    app.use("/api/v1", V1Routers);
};
