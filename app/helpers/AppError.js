module.exports = class AppError extends Error {
    constructor(message, statusCode) {
        console.log(statusCode);
        super(message);
        this.statusCode = statusCode;
        this.status = String(statusCode).startsWith("4")
            ? "fail"
            : String(statusCode).startsWith("3")
            ? "redirect"
            : "error";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
};
