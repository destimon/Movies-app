const mongoose = require('mongoose');

const Film = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    default: 'Unnamed'
  },
  date: {
    type: Date,
    default: Date.now
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