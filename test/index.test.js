const mocha = require('mocha');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { 
  getAllPlants,
  createNewPlant,
  findPlantById,
  updatePlantById,
  deleteOnePlant
} = require('../controllers');

const Plant = require('../models/plant');
describe('plant tests', function() {
  let res = {};
  let sandbox;

  beforeEach(function(){
    sandbox = sinon.createSandbox();
    const spy = sinon.spy();
    res = {
      json: spy,
      status: sinon.stub().returns({json: spy})
    }
  })
  afterEach(function(){
    sandbox.restore();
  })

  it('should get all the plants', function(){
    let req = {
      query: {}
    }
    let expectedResult = {
      message: "Plants Found",
      plants: [
        {
          _id: "5c749b252cc5c68af739234e",
          commonName: "lavender",
          scientificName: "Lavandula spica",
          edible: true,
          picUrl: "https://en.wikipedia.org/wiki/File:Single_lavendar_flower02.jpg\n",
          createdAt: "2019-02-26T01:49:25.138Z",
        },
        {
          _id: "5c749b9a2cc5c68af739234f",
          commonName: "lamb's quarters",
          scientificName: "Chenopodium berlandieri",
          edible: true,
          picUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Chenopodium_berlandieri_NPS-1.jpg/440px-Chenopodium_berlandieri_NPS-1.jpg\n",
          createdAt: "2019-02-26T01:51:22.126Z",
        }
      ]
    }
    sandbox.stub(Plant, 'find').yields(null, expectedResult);
    getAllPlants(req, res);
    sinon.assert.calledWith(res.status, sinon.match(200))
  })

  it('should create a plant', () => {
    const _id = new mongoose.Types.ObjectId()
    const createdAt = new Date()
    let req = {
      body:  {
        commonName: "lavender",
        scientificName: "Lavandula spica",
        edible: true,
        picUrl: "https://en.wikipedia.org/wiki/File:Single_lavendar_flower02.jpg\n",
        createdAt,
        _id
      },
    };
    let expectedResult = {
      message : "Plant Saved",
      plant: req.body
    };
    sandbox.stub(Plant, 'create').yields(null, expectedResult);
    createNewPlant(req, res);
    
    sinon.assert.calledWith(Plant.create, req.body);
    sinon.assert.calledWith(res.status, sinon.match(201))
    sinon.assert.calledWith(res.json, sinon.match(expectedResult))
  })

  it('should delete a plant', function(){
    const _id = new mongoose.Types.ObjectId()
    let req = {
      params: {
        _id
      }
    };
    let expectedResult = {
      commonName: "lavender",
      scientificName: "Lavandula spica",
      edible: true,
      picUrl: "https://en.wikipedia.org/wiki/File:Single_lavendar_flower02.jpg\n",
      createdAt: new Date(),
      _id
    };

    sandbox.stub(Plant, 'findByIdAndDelete').yields(null, expectedResult);
    deleteOnePlant(req, res);
    sinon.assert.calledWith(Plant.findByIdAndDelete, req.params._id);
  })
})
