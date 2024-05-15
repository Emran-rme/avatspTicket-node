const { hashPassword } = require("../helpers");
const AppError = require("../helpers/AppError");
const controller = require("./controller");

class Users extends controller {
    async index(req, res, next) {
        try {
            const usersProjection = {
                __v: 0,
                updatedAt: 0,
                password: 0,
            };
            const result = await this.User.find({}, usersProjection)
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

    async store(req, res, next) {
        const { fullName, email, password } = req.body;
        try {
            const foundUser = await this.User.findOne({ email }).exec();
            if (!foundUser) {
                const newUser = new this.User({
                    fullName,
                    email,
                    password: hashPassword(password),
                });

                await newUser.save();

                return this.response({
                    res,
                    code: 201,
                    message: "کاربر جدید اضافه شد",
                });
            }
            return this.response({
                res,
                statusValue: false,
                code: 400,
                message: "ایمیل تکراری است",
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new Users();
