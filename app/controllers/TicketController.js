const AppError = require("../helpers/AppError");
const controller = require("./controller");

class Ticket extends controller {
    async index(req, res, next) {
        try {
            const result = await this.Ticket.find({}, this.projection(req))
                .sort({ createdAt: -1 })
                .lean();

            if (result.length > 0) {
                return this.response({
                    res,
                    code: 200,
                    data: result,
                    message: "اطلاعات دریافت شد",
                });
            }
            throw new AppError("اطلاعاتی یافت نشد", 404);
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        const { id: _id } = req.params;
        
        try {
            if (!_id) {
                throw new AppError("شناسه مورد نیاز است", 400);
            }

            const result = await this.Ticket.findById(
                _id,
                this.projection(req)
            );

            if (result) {
                return this.response({
                    res,
                    code: 200,
                    data: result,
                    message: "اطلاعات دریافت شد",
                });
            }

            throw new AppError("اطلاعاتی یافت نشد", 404);
        } catch (error) {
            next(error);
        }
    }

    async store(req, res, next) {
        const { title, description } = req.body;
        try {
            const newTicket = new this.Ticket({
                user: "6641fe89470be4e94cc3f800",
                title,
                description,
            });

            await newTicket.save();

            return this.response({
                res,
                code: 201,
                message: "تیکت شما ثبت شد",
            });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new Ticket();
