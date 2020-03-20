const mongoose = require('mongoose');

const Film = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    default: 'Unnamed'
  },
  date: {
    type: Number,
    min: [ 1850, 'Too low release year' ],
    max: [ 2020, 'Too high release year' ]
  },
  type: { 
    type: String,
    enum: ['VHS', 'DVD', 'Blu-Ray']
  },
  actors: [
    {
      firstName: String,
      secondName: String,
    }
  ]
});

const FilmModel = mongoose.model('Film', Film);

module.exports = FilmModel;