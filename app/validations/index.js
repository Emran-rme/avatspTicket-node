const { check } = require("express-validator");

class Validation {
    RegisterValidate() {
        return [
            check("fullName")
                .trim()
                .escape()
                .not()
                .isEmpty()
                .withMessage("نام و نام خانوادگی نباید خالی باشد")
                .bail(),
            check("email")
                .trim()
                .escape()
                .not()
                .isEmpty()
                .withMessage("آدرس ایمیل نباید خالی باشد")
                .isEmail()
                .withMessage("ساختار ایمیل صحیح نمی باشد")
                .bail(),
            check("password")
                .isStrongPassword({
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 0,
                    returnScore: false,
                    pointsPerUnique: 1,
                    pointsPerRepeat: 0.5,
                    pointsForContainingLower: 10,
                    pointsForContainingUpper: 10,
                    pointsForContainingNumber: 10,
                    pointsForContainingSymbol: 10,
                })
                .withMessage(
                    "گذرواژه باید حداقل 8 کارکتر و ترکیبی از حروف بزرگ و کوچک و اعداد اینگلیسی باشد"
                )
                .bail(),
            check("confirm_password")
                .notEmpty()
                .withMessage("تکرار رمز عبور نباید خالی باشد")
                .custom((value, { req }) => {
                    if (value !== req.body.password) {
                        throw new Error("رمزعبور و تکرار آن برابر نیست");
                    }
                    return true;
                }),
        ];
    }
}
module.exports = new Validation();
