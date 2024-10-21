const Feedback = require("../models/Feedback")

const createFeedback = async (request, response) => {
    try {
        const newFeedback = new Feedback({
            evaluation: request.body.evaluation,
            text: request.body.text,
            score: request.body.score,
        })

        await newFeedback.save()

        return response.json({
            success: true,
        })
    
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "No se han podido obtener los datos.",
            error: error.details,
        })
    }
}

module.exports = { createFeedback }