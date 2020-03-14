const mongoose = require('mongoose');
const ObjectID = require('mongoose').ObjectId;

const Film = new mongoose.Schema({
  id: ObjectID, // not sure is that needed
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