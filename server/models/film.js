const mongoose = require('mongoose');
const ObjectID = require('mongoose').ObjectID;

const Film = new mongoose.Schema({
  id: ObjectID,
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