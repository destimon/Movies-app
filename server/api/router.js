const Film = require('../models/film')
const Papa = require('papaparse'); 

function handleError(err, res) {
  console.log(err);
  res.status(500);
}

function saveModel(req, res, model) {
  let newModel = new Film();

  if (model && Object.keys(model).length) {
    newModel.name = model.name;
    newModel.date = model.date;
    newModel.type = model.type;
    newModel.actors = model.actors;
    newModel.save((err) => {
      if (err) {
        handleError(err, res);
      } else {
        res.status(200);
      }
      res.end();
    })
  }
}

module.exports = function(app) {

  app.get('/', (req, res) => {
    res.send('Hi');
  })

  // 1. Add film
  app.post('/add', (req, res) => {
    let model = req.query;

    model.actors = req.body.actors;
    saveModel(req, res, model);
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
    if (req.query.asc) {
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
    else if (req.query.name) {
      // 5. Find film by name
      Film.findOne({ name: req.query.name }, (err, data) => {
        if (err) {
          handleError(err, res);
        }
        res.json(data);
      }) 
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
    let text = req.files.file.data.toString('utf8');

    // Cap'n Jazz – Oh Messy Life
    Papa.parse(text, {
      complete(results) {
        let filmObj = {};
        for (let film of results.data) {
          if (film[0]) {
            let line = film[0].split(':');
            if (line[0].trim() == 'Title')
              filmObj.name = line[1].trim();
            else if (line[0].trim() == 'Release Year')
              filmObj.date = line[1].trim();
            else if (line[0].trim() == 'Format')
              filmObj.type = line[1].trim();
            else if (line[0].trim() == 'Stars') {
              let starsArray = [];
              let starsObj = {
                firstName: line[1].trim().split(' ')[0],
                secondName: line[1].trim().split(' ')[1]
              };
              starsArray.push(starsObj);
              filmObj.actors = starsArray;
              film.forEach(element => {
                if (element.split(':')[0].trim() != 'Stars') {
                  starsObj = {
                    firstName: element.trim().split(' ')[0],
                    secondName: element.trim().split(' ')[1]
                  };
                  starsArray.push(starsObj);
                }
              });
            }
          } else {
            saveModel(req, res, filmObj);
            filmObj = {};
          }
        }
      },
      dynamicTyping: true,
    })
    res.end();
  })

}