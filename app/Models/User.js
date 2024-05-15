const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
    {
        email: { type: String, unique: true, required: true },
        fullName: { type: String, required: true },
        password: String,
        userImg: String,
        roles: {
            User: {
                type: Number,
                default: 2001,
            },
            Admin: Number,
        },
        refreshToken: [String],
    },
    {
        timestamps: true,
    }
);

const User = models.User || model("User", userSchema);

module.exports = User;
