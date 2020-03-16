const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { error, info } = require('pretty-console-logs');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/filmdb';

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./api/router')(app);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    if (process.env.NODE_ENV !== 'test')
      info(`Mongoose connected | URI:${MONGODB_URI} |`);
    app.listen(PORT, HOST, () => { 
      if (process.env.NODE_ENV !== 'test')
        info(`Servers is up | HOST:${HOST} | PORT:${PORT} |`); });
  })
  .catch((err) => {
    error(err);
  });

module.exports = app;