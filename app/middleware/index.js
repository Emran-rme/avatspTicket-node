module.exports = (app) => {
    app.all((err, req, res, next) => {
        res.status(err.status || 500).json({
            error: {
                message: err.message || "Internal Server Error",
            },
        });
    });
};
