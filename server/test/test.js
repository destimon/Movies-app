const Film = require('../models/film');
const FormData = require('form-data');
const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Films', () => {
  beforeEach((done) => {
    Film.deleteMany({}, (err) => { 
      done();           
    });
    newFilm = new Film();

    let testFilm = {
      name: 'testFilm',
      date: 2007,
      type: 'DVD',
      actors: [ { firstName: 'firstName', secondName: 'secondName'  } ]
    }

  });
  
  describe("SERVER", () => {
    it("Connection", done => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
            });
        done();
    });
  });

  describe("API", () => {
    it('POST /add', done => {
      let testFilm = {
        name: 'testFilm',
        date: 2007,
        type: 'DVD',
        actors: [ { firstName: 'firstName', secondName: 'secondName'  } ]
      }
      chai.request(server)
        .post('/add')
        .send(testFilm)
        .end((err, res) => {
          res.should.have.status(200);
        });
        chai.request(server)
        .post('/add')
        .send(null)
        .end((err, res) => {
          res.should.have.status(404);
        });
        
        done();
      });

      it('DELETE /delete/:name', done => {
        chai.request(server)
          .delete('/delete/asd')
          .end((err, res) => {
              res.should.have.status(202);
            })
        done();
      });

      it('GET /files/:name', done => {
        chai.request(server)
          .get('/files/doesntexist')
          .end((err, res) => {
            res.should.have.status(404);
            res.should.be.a('object');
          })
        done();
      })

      it('GET /show?asc=alpha', done => {
        chai.request(server)
          .get('/show?asc=alpha')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.a('number');
          })
        done();
      })

      it('GET /show?name=name', done => {
        chai.request(server)
          .get('/show?name=doesntexist')
          .end((err, res) => {
            res.should.have.status(200);
          })
        done();
      })

      it('GET /show (star find)', done => {
        let actorObj = {
          firstName: 'Name',
          secondName: 'Surname'
        }
        chai.request(server)
          .get('/show')
          .send(actorObj)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.a('number');
          })
        done();
      })
      
      it('POST /file', done => {
        let formData = new FormData();
        formData.append('file', fs.createReadStream('sample_movies.txt'));

        chai.request(server)
          .post('/file')
          .attach('file', './sample_movies.txt')
          .type('form')
          .end((err, res) => {
            res.should.have.status(200);
          })
        done();
        process.exit();
      })
    });
})