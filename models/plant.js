const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  commonName: String,
  scientificName: String,
  createdAt: Date,
  modifiedAt: Date,
  edible:  Boolean,
  picUrl: String,
});

plantSchema.pre('save', function(next) {
  const plant = this;

  if (this.isNew) {
    plant.createdAt = new Date();
  } else {
    plant.modifiedAt = new Date();
  }
  return next();
});

module.exports = mongoose.model('Plant', plantSchema);