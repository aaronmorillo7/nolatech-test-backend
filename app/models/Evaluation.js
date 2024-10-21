const mongoose = require("mongoose")

const { QuestionSchema } = require("./Question")

const EvaluationSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },
    name: {
        type: String,
        required: true,
    },
    questions: [QuestionSchema],
}, 
{
    timestamps: true,
})

const EvaluationModel = mongoose.model("Evaluation", EvaluationSchema)

module.exports = EvaluationModel