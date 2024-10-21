const EvaluationModel = require("../models/Evaluation");

const getEvaluationsByEmployee = async (request, response) => {
  if (request.user.role == 3)
    return response.status(200).json({
      success: true,
      evaluations: [],
    });

  try {
    const evaluations = await EvaluationModel.find({
      employee: request.params.id,
    })
      .populate("questions")
      .lean()
      .exec();

    return response.json({
      success: true,
      evaluations: evaluations,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "No se han podido obtener los datos.",
      error: error.details,
    });
  }
};

const getEvaluation = async (request, response) => {
  if (request.user.role == 3)
    return response.status(200).json({
      success: true,
      evaluations: [],
    });

  try {
    const evaluation = await EvaluationModel.findOne({
      _id: request.params.id,
    })
      .populate("questions")
      .lean()
      .exec();

    return response.json({
      success: true,
      evaluation: evaluation,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "No se han podido obtener los datos.",
      error: error.details,
    });
  }
};

const createEvaluation = async (request, response) => {
  try {
    const newEvaluation = new EvaluationModel({
      employee: request.body.employee,
      name: request.body.name,
      questions: request.body.questions,
    });

    await newEvaluation.save();

    return response.status(201).json({ success: true, message: "success" });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.details,
    });
  }
};

const editEvaluation = async (request, response) => {
  try {
    const evaluation = await EvaluationModel.findById(request.params.id);
    console.log(request.params.id)

    if (!evaluation) return response.status(404).json({ message: "Se no encontró la evaluación" });

    evaluation.name = request.body.name || evaluation.name
    evaluation.questions = request.body.questions || evaluation.questions

    await evaluation.save();

    return response.status(201).json({ success: true, message: "success" });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.details,
    });
  }
};

const getEmployees = async (request, response) => {
  if (request.user.role == 3)
    return response.status(200).json({
      success: true,
      employees: [],
    });

  try {
    const employees = await Employee.find().populate("user").lean().exec();

    return response.json({
      success: true,
      employees: employees,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: "No se han podido obtener los datos.",
      error: error.details,
    });
  }
};

module.exports = { getEmployees };

module.exports = {
  getEvaluationsByEmployee,
  getEvaluation,
  createEvaluation,
  editEvaluation,
};
