const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
    department: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
}, 
{
    timestamps: true,
})

const EmployeeModel = mongoose.model("Employee", EmployeeSchema)

module.exports = EmployeeModel