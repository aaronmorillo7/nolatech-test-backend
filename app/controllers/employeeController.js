const Employee = require("../models/Employee")

const getEmployees = async (request, response) => {
    if (request.user.role == 3) return response.status(200).json({
        success: true,
        employees: []
    })

    try {
        const employees = await Employee.find().populate("user").lean().exec()

        return response.json({
            success: true,
            employees: employees
        })
    
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            message: "No se han podido obtener los datos.",
            error: error.details,
        })
    }
}

module.exports = { getEmployees }