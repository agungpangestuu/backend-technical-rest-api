process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");

const app = require("../app");
const news = require("../models/newsModel");
const should = chai.should();

chai.use(chaiHttp);

describe("CRUD News", () => {
  // news.collection.drop();
  afterEach(function(done) {
    news.collection.drop();
    done();
  });
  it("should add a SINGLE News on /news POST", done => {
    chai
      .request('http://localhost:3000')
      .post("/api/news")
      .type('form')
      .send({
        image: "http://jhkahkak.com",
        title: "pemilu 2019",
        deskripsi: "lorem ipsum",
        topicId: ["idTopic3"]
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
          res.body.SUCCESS.should.have.property("image");
          res.body.SUCCESS.should.have.property("title");
          res.body.SUCCESS.should.have.property("deskripsi");
          res.body.SUCCESS.should.have.property("topic");
          res.body.SUCCESS.should.have.property("_id");
          res.body.SUCCESS.image.should.equal("http://jhkahkak.com");
          res.body.SUCCESS.title.should.equal("pemilu 2019");
          res.body.SUCCESS.deskripsi.should.equal("lorem ipsum");
          res.body.SUCCESS.topic.should.be.a("array");
          // res.body.SUCCESS.topic[0].should.equal("idTopic");
          done();
        }
      });
  });


  it("should list ALL blobs on /news GET", function(done) {
    chai
      .request(app)
      .get("/api/news")
      .end(function(err, res) {
        console.log(res.body)
        if(err) console.log(err)
        else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("SUCCESS");
          res.body.SUCCESS.should.be.a("array");
          res.body.SUCCESS[0].should.have.property("_id");
          res.body.SUCCESS[0].should.have.property("image");
          res.body.SUCCESS[0].should.have.property("title");
          res.body.SUCCESS[0].should.have.property("deskripsi");
          res.body.SUCCESS[0].should.have.property("topic");
          res.body.SUCCESS[0].image.should.equal("http://jhkahkak.com");
          res.body.SUCCESS[0].title.should.equal("pemilu 2019");
          res.body.SUCCESS[0].deskripsi.should.equal("lorem ipsum");
          res.body.SUCCESS[0].topic.should.be.a("array");
          // res.body[0].topic[0].should.be.a("object");
          // res.body[0].topic[0].should.have.property("_id");
          // res.body[0].topic[0].should.have.property("name");
          done();
        }
      });
  });
  it("should list a SINGLE News on /news/<id> GET", () => {
    let newNews = new news({
      image: "http://loremipsum.com",
      title: "pemilu 2020",
      deskripsi: "lorem ipsum",
      topic: ["idTopic2"]
    });

    newNews.save().then(data =>  {
      chai
        .request(app)
        .get("/api/news/" + data._id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("image");
          res.body.should.have.property("title");
          res.body.should.have.property("deskripsi");
          res.body.should.have.property("topic");
          res.body.image.should.equal("http://jhkahkak.com");
          res.body.title.should.equal("pemilu 2018");
          res.body.deskripsi.should.equal("lorem ipsum");
          res.body.topic.should.be.a("array");
          res.body.topic[0].should.be.a("object");
          res.body.topic[0].should.have.property("_id");
          res.body.topic[0].should.have.property("name");
          res.body._id.should.equal(data.id);
          done();
        });
    }).catch(err => console.log(err))
  });
  
  it("should update a SINGLE News on /news/<id> PUT", (done) => {
    chai.request(app)
    .get('/api/news')
    .end(function(err, res){
      console.log("ini put",res.body)
      chai.request(app)
        .put('/api/news/'+res.body[0]._id)
        .send({'title': 'Spider'})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('UPDATED');
          response.body.UPDATED.should.be.a('object');
          response.body.UPDATED.should.have.property('name');
          response.body.UPDATED.should.have.property('_id');
          response.body.UPDATED.name.should.equal('Spider');
          done();
      });
    });
  });
  it("should delete a SINGLE News on /news/<id> DELETE", (done) => {
    chai.request(app)
    .get('/api/news')
    .end(function(err, res){
      chai.request(app)
        .delete('/api/news/'+res.body[0]._id)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('REMOVED');
          response.body.REMOVED.should.be.a('object');
          response.body.REMOVED.should.have.property('name');
          response.body.REMOVED.should.have.property('_id');
          response.body.REMOVED.name.should.equal('Bat');
          done();
      });
    });
  });
});

