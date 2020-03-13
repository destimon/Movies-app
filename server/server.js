const express = require('express');
const mongoose = require('mongoose');

const app = express();

require('./api/router')(app);

mongoose.connect('mongodb://localhost/filmdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => { 
  console.log('Mongoose connected to host')
  app.listen('3000', () => { console.log('Servers is up'); })
})
.catch((err) => {
  console.log(err)
})