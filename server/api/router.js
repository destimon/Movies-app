const Film = require('../models/film')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const formidable = require('formidable');

function handleError(err, res) {
  console.log(err);
  res.status(500);
}

module.exports = function(app) {

  app.get('/', (req, res) => {
    res.send('Hi');
  })

  // 1. Add film
  app.post('/add', (req, res) => {
    let newModel = new Film();

    newModel.name = req.query.name;
    newModel.date = req.query.date;
    newModel.type = req.query.type;
    newModel.actors = req.body.actors;
    newModel.save((err) => {
      if (err) {
        handleError(err, res);
      } else {
        res.status(200);
      }
      res.end();
    })
  })

  // 2. Delete film
  app.delete('/delete/:name', (req, res) => {
    Film.deleteOne({ name: req.params.name }, (err) => {
      if (err) {
        handleError(err, res);
      } else {
        res.status(200);
      }
      res.end();
    })
  })

  // 3. Show info about film
  app.get('/films/:name', (req, res) => {
    Film.findOne({ name: req.params.name }, (err, data) => {
      if (err) {
        handleError(err, res);
      } else {
        res.status(200)
        res.json(data);
      }
    })
  })

  app.get('/show', (req, res) => {
    if (req.query.name) {
      // 5. Find film by name
      Film.findOne({ name: req.query.name }, (err, data) => {
        if (err) {
          handleError(err, res);
        }
        res.json(data);
      }) 
    }
    else if (req.query.asc) {
      // 4. Show films sorted in alphabetical order
      if (req.query.asc === 'alpha') {
        Film.find({}).sort({ name: 'asc' }).exec((err, data) => {
          if (err) {
            handleError(err, res);
          } else {
            res.json(data);
          }
        })
      }
    }
    // 6. Find film by actors
    else if (req.body.actor) {
      Film.findOne({ 'actors.firstName': req.body.actor.firstName, 'actors.secondName': req.body.actor.secondName }, (err, data) => {
        if (err) {
          handleError(err, res);
        } else {
          res.json(data);
        }
      })
    }
  })

  app.post('/file', (req, res) => {
    console.log(req.files)
    res.end();
  })

}