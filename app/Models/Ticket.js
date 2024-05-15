const { Schema, model, models } = require("mongoose");

const ticketSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);

const Ticket = models.Ticket || model("Ticket", ticketSchema);

module.exports = Ticket;
