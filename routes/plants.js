const express = require('express');
const mongoose = require('mongoose');
const app = express();

const router = express.Router();
const { 
  getAllPlants,
  createNewPlant,
  findPlantById,
  updatePlantById,
  deleteOnePlant
} = require('../controllers');

router.route('/plants')
  .get(getAllPlants)
  .post(createNewPlant)

router.route('/plants/:plant_id')
  .get(findPlantById)
  .put(updatePlantById)
  .delete(deleteOnePlant)

module.exports = router;
    