process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");

const app = require("../app");
const topic = require("../models/topicModel");
const should = chai.should();

chai.use(chaiHttp);

describe("CRUD News", () => {
  // news.collection.drop();
  afterEach(function(done) {
    topic.collection.drop();
    done();
  });
  it("should add a SINGLE Topic on /api/topic POST", done => {
    chai
      .request('http://localhost:3000')
      .post("/api/topic")
      .type('form')
      .send({
        name: "berita"
      })
      .end(function(err, res) {
        if (err) console.log(err)
        else {
          console.log(res.body)
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("SUCCESS");
          res.body.SUCCESS.should.be.a("object");
          res.body.SUCCESS.should.have.property("name");
          res.body.SUCCESS.name.should.equal("berita");
          // res.body.SUCCESS.topic[0].should.equal("idTopic");
          done();
        }
      });
  });


  it("should list ALL Topic on /api/topic GET", function(done) {
    chai
      .request(app)
      .get("/api/topic")
      .end(function(err, res) {
        console.log(res.body)
        if(err) console.log(err)
        else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.SUCCESS.should.have.property("SUCCESS");
          res.body.SUCCESS.should.be.a("array");
          res.body.SUCCESS[0].should.be.a("object");
          res.body.SUCCESS[0].should.have.property("_id");
          res.body.SUCCESS[0].should.have.property("name");
          res.body.SUCCESS[0].should.have.property("createAt");
          res.body.SUCCESS[0].name.should.equal("berita");
          res.body.SUCCESS[0].createAt.should.equal(new Date());
          done();
        }
      });
  });
  it("should list a SINGLE Topic on /api/topic/<id> GET", () => {
    let newTopic= new news({
      name: "pemilu"
    });

    newTopic.save().then(data =>  {
      chai
        .request(app)
        .get("/api/topic/" + data._id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("SUCCES");
          res.body.SUCCES.should.have.property("name");
          res.body.SUCCES.should.have.property("createAt");
          res.body.SUCCES.should.have.property("_id");
          res.body.SUCCES.name.should.equal("pemilu");
          res.body.SUCCES._id.should.equal(data.id);
          done();
        });
    }).catch(err => console.log(err))
  });
  
  it("should update a SINGLE Topic on /api/topic/<id> PUT", (done) => {
    chai.request(app)
    .get('/api/topic')
    .end(function(err, res){
      chai.request(app)
        .put('/api/topic/'+res.body[0]._id)
        .send({'name': 'Berita Super'})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('UPDATED');
          response.body.UPDATED.should.be.a('object');
          response.body.UPDATED.should.have.property('name');
          response.body.UPDATED.should.have.property('_id');
          response.body.UPDATED.name.should.equal('Berita Super');
          done();
      });
    });
  });
  it("should delete a SINGLE Topic on /api/topic/<id> DELETE", (done) => {
    chai.request(app)
    .get('/api/topic')
    .end(function(err, res){
      chai.request(app)
        .delete('/api/topic/'+res.body[0]._id)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('REMOVED');
          response.body.REMOVED.should.be.a('object');
          response.body.REMOVED.should.have.property('name');
          response.body.REMOVED.should.have.property('_id')
          done();
      });
    });
  });
});
