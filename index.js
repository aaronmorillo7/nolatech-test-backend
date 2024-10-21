require('dotenv').config();
require("./app/db/connect")

const cors = require('cors');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const routes = require("./app/routes")

app.use(cors());

app.use("/api", routes)

app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
