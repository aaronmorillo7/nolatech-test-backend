const mongoose = require("mongoose")

const FeedbackSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    score: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
    }
}, 
{
    timestamps: true,
})

const FeedbackModel = mongoose.model("Feedback", FeedbackSchema)

module.exports = FeedbackModel