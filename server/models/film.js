const mongoose = require('mongoose');
 
const Film = new mongoose.Schema({
  id: Number,
  name: String,
  date: Date,
  type: String,
  actors: [
    {
      firstName: String,
      secondName: String,
    }
  ]
});

const FilmModel = mongoose.model('Film', Film);

module.exports = FilmModel;