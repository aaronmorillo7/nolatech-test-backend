const { required } = require("joi")
const mongoose = require("mongoose")

const QuestionSchema = new mongoose.Schema({
    score: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
    },
    title: {
        type: String,
        required: [true, "Es obligatorio"]
    },
    suggestion: {
        type: String,
    },
    category_name: {
        type: String,
        required: true,
    }
}, 
{
    timestamps: true,
})

const QuestionModel = mongoose.model("Question", QuestionSchema)

module.exports = { QuestionModel, QuestionSchema }