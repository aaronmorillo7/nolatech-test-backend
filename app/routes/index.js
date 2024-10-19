const routes = require('express').Router();
const bodyParser = require('body-parser');

const authRoutes = require("./auth")

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

routes.use((req, res, next) => {
  console.log(`Resource requested: ${req.method} ${req.originalUrl}`);
  next();
});

routes.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Hello world!' });
});

routes.use("/auth", authRoutes)

module.exports = routes;