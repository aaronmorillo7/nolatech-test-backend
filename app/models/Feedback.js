const mongoose = require("mongoose")

const FeedbackSchema = new mongoose.Schema({
    evaluation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Evaluation",
    },
    text: {
        type: String,
    },
}, 
{
    timestamps: true,
})

const FeedbackModel = mongoose.model("Feedback", FeedbackSchema)

module.exports = FeedbackModel