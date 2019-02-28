const Plant = require('../models/plant');

module.exports = {
  getAllPlants: (req, res) => {
    Plant.find({}, (err, plants) => {
     if (err) {
       res.send(new Error(err));
     } else {
       res.status(200).json({
          message: "Plants Found",
          plants
       });
     }
    });
  },
  createNewPlant: (req, res) => {
    Plant.create(req.body, (err, plant) => {
      if (err)
        res.send(err);
      res.status(201).json(plant);
    });
  },
  updatePlantById: (req, res) => {
    Plant.findById(req.params.plant_id, (err, plant) => {
      if (err)
        res.send(err);
      for (key in req.body) {
        plant[key] = req.body[key];
      }

      plant.save((err, plant) => {
        if (err)
          res.send(err);
        res.json({
          message: "Plant Updated!",
          plant
        });
      });
    });
  },
  findPlantById: (req, res) => {
    Plant.findById(req.params.plant_id, (err, plant) => {
      if (err)
        res.send(err);
      res.status(200)
      res.json({
        message: "Plant Found!",
        plant
      });
    });
  },
  deleteOnePlant: (req, res) => {
    Plant.findByIdAndDelete(req.params._id, (err, plant) => {
      if (err)
        res.send(err);
      res.status(200)
      res.json({
        message: "Plant Deleted!",
        plant
      });
    });
  } 
}