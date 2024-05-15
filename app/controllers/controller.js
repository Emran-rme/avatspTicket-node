const autoBind = require("auto-bind");

const User = require("../Models/User");

const { projection: projectionQuery } = require("../helpers");
const { validationResult } = require("express-validator");
const Ticket = require("../Models/Ticket");

module.exports = class {
    constructor() {
        this.commonProjection = { __v: 0 };
        this.User = User;
        this.Ticket = Ticket;
        autoBind(this);
    }

    #hasNextPage(pages, page) {
        return page < pages;
    }

    #hasPrevPage(page) {
        return page > 1;
    }

    meta(pages, page) {
        return {
            pages,
            page,
            nextPage: this.#hasNextPage(pages, page)
                ? "page=" + (page + 1)
                : null,
            prevPage: this.#hasPrevPage(page) ? "page=" + (page - 1) : null,
        };
    }

    projection(req) {
        return req.query.fields
            ? projectionQuery(req.query)
            : this.commonProjection;
    }

    validationBody(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => ({
                message: error.msg,
                field: error.path,
            }));
            res.status(422).json(errorMessages);
            return false;
        }
        return true;
    }

    validate(req, res, next) {
        if (!this.validationBody(req, res)) {
            return;
        }
        next();
    }

    response({
        res,
        code = 200,
        statusValue = true,
        message = null,
        data = [],
        meta = {},
    }) {
        return res.status(code).json({
            code,
            ["status"]: statusValue ? "success" : "error",
            message,
            base_url: "http://localhost:5000",
            data,
            meta,
        });
    }
};
