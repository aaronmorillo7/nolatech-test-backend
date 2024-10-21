const mongoose = require('mongoose');
const db = require('./config');

mongoose.connect(`${db.host}/${db.name}`, db.opts).then(() => {
  console.log('Conectado a mongodb');
})
.catch((err) => {
  console.error('Ocurrió un error durante la conexión a la base de datos', err);
});