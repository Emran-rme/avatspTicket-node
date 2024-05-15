const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

module.exports.projection = (request) =>
    request.fields.split(",").reduce((total, current) => {
        return { [current]: 1, ...total };
    }, {});

module.exports.validationErrors = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => ({
            message: error.msg,
            field: error.path,
        }));
        return errorMessages;
    }
};

module.exports.hashPassword = (password) => {
    const hashPassword = bcrypt.hashSync(password, 10);
    return hashPassword;
};
