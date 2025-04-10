//importerar mongoose biliotek
const mongoose = require('mongoose');


//Skapar ett schema med krav för varje rätt
const dishSchema = new mongoose.Schema({
//listar dom olika fälten
  name: { type: String, required: true, unique: true },
  ingredients: [String],
  preparationSteps: [String],
  cookingTime: Number,
  origin: String,
  spiceLevel: String
});

//skapar en model som heter dish för att använda i resten av programmet
module.exports = mongoose.model('Dish', dishSchema);

