const mongoose = require('mongoose');

const { UserSchema } = require('../models/User');
const EmployeeSchema = require('../models/Employee');
const EvaluationSchema = require('../models/Evaluation');
const FeedbackSchema = require('../models/Feedback');
const QuestionSchema = require('../models/Question');

const db = require('./config');

mongoose.connect(`${db.host}/${db.name}`, db.opts).then(() => {
  console.log('Conectado a mongodb');
})
.catch((err) => {
  console.error('Ocurrió un error durante la conexión a la base de datos', err);
});;

mongoose.connection.on('connected', () => {
  /* mongoose.model('User', UserSchema);
  mongoose.model('Employee', EmployeeSchema);
  mongoose.model('Evaluation', EvaluationSchema);
  mongoose.model('Feedback', FeedbackSchema);
  mongoose.model('Question', QuestionSchema); */
});