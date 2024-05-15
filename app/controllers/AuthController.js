const { hashPassword } = require("../helpers");
const AppError = require("../helpers/AppError");
const controller = require("./controller");

class Auth extends controller {
    async registerUser(req, res, next) {
        const { fullName, email, password } = req.body;

        try {
            let foundUser = await this.User.findOne({ email }).exec();
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
                    message: "ثبت نام انجام شد برای ادامه وارد پنل شوید",
                });
            }
            throw new AppError("شما قبلا ثبت نام کرده اید وارد شوید", 400);
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req, res, next) {
        const { email, password } = req.body;
        const cookies = req.cookies;
        try {
            let foundUser = await this.User.findOne({ email }).exec();
            if (foundUser) {
                const match = await matchPassword(password, foundUser.password);
                if (!match)
                    return this.response({
                        res,
                        code: 401,
                        statusValue: false,
                        message:
                            "شماره تلفن همراه یا رمزعبور شما صحیح نمی باشد",
                    });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new Auth();
