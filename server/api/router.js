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

  // 3. Показать информацию о фильме
  app.get('/films/:name', (req, res) => {
    Film.findOne({ name: req.params.name }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200)
        res.json(data);
      }
    })
  })

  app.get('/show', (req, res) => {
    if (req.query.name) {
      Film.findOne({ name: req.query.name }, (err, data) => {
        if (err) {
          console.log(err);
        }
        res.json(data);
      }) 
    }
    else if (req.query.asc) {
      if (req.query.asc === 'alpha') {
        Film.find({}).sort({ name: 'asc' }).exec((err, data) => {
          if (err) {
            console.log(err);
            res.status(500);
          } else {
            res.json(data);
          }
        })
      }
    }
    else if (req.query.actor) {
      Film.find({ 'actors.firstName': req.query.actor }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.json(data);
        }
      })
    }
  })

}