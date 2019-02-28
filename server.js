const express = require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const { PORT, MONGODB_URI, FRONT_URL } = process.env
const BODYPARSER_OPTS = { extended: true }
const MONGODB_OPTS = { useCreateIndex: true, useNewUrlParser: true }
// TODO: set config 'https://murmuring-wave-39934.herokuapp.com'
const CORS_OPTS = {
  origin: FRONT_URL,
}

// Pull in the routes from the routes folder
const PlantRouter = require('./routes/plants');
const router = express.Router();

require('./models').connect(MONGODB_URI, MONGODB_OPTS)

// Load middleware actions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(process.env.NODE_ENV === "production" ? CORS_OPTS : {}));

// Attach middleware to router for actions on router
// This would be a good place to add Authentication
router.use((req, res, next) => {
  console.log("something is happening");
  next();
})

app.use('/api', PlantRouter);

app.listen(PORT,  () => {
  console.error(`listening on port ${PORT}`);
})