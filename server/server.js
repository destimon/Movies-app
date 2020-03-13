const express = require('express');
const app = express();

app.listen('3000', () => {
  console.log('Servers is up');
})

app.get('/', (req, res) => {
  res.send('Hi');
})