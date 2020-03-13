const Film = require('../models/film')

module.exports = function(app) {

  app.get('/', (req, res) => {
    res.send('Hi');
  })

  // 1. Добавить фильм
  app.post('/add', (req, res) => {
    let newModel = new Film();

    newModel.name = req.query.name;
    newModel.actors = [
      {
        firstName: 'Dmitry',
        secondName: 'Cherendieiv',
      }
    ];
    newModel.save((err) => {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        res.status(200);
      }
      res.end();
    })
  })

  // 2. Удалить фильм
  app.post('/delete', (req, res) => {
    Film.deleteOne({ name: 'justTesting' }, (err) => {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        res.status(200);
      }
      res.end();
    })
  })

}