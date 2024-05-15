const path = require("node:path");

const express = require("express");
const cors = require("cors");
const cookiParser = require("cookie-parser");

const startMongo = require("./mongo");

module.exports = (app) => {
    startMongo();
    app.use(cors());
    app.use(express.json());
    app.use(cookiParser());
    app.use(express.static(path.join(__dirname, "../../public")));
};
