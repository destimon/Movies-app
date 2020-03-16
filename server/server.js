const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { error, info } = require('pretty-console-logs');
const app = express();

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./api/router')(app);

mongoose.connect('mongodb://localhost/filmdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => { 
    info('Mongoose connected to host');
    app.listen('3000', () => { info('Servers is up'); });
  })
  .catch((err) => {
    error(err);
  });