const ObjectId = require("mongodb").ObjectId;
const Topic = require("../models/topicModel");

module.exports = {
  getAllTopic(req, res) {
    Topic.find()
      .then(newsdata => {
        res.status(200).json({
          SUCCES: newsdata
        });
      })
      .catch(newsErr => {
        res.status(500).json({
          ERROR: newsErr
        });
      });
  },
  getTopic(req, res) {
    Topic.findOne({ _id: req.params.id })
      .then(dataNewsById => {
        res.status(200).json({
          SUCCES: dataNewsById
        });
      })
      .catch(errGetDataByID => {
        res.status(500).json({
          ERROR: errGetDataByID
        });
      });
  },
  createTopic(req, res) {
    let data = {
      name: req.body.name
    }
    let newTopic = Topic(data);
    newTopic
      .save()
      .then(data => {
        res.status(200).json({
          SUCCES: data
        });
      })
      .catch(err => {
        // console.log(err)
        res.status(500).json({
          ERROR: err
        });
      });
  },
  updateTopic(req, res) {
    Topic.findOne({_id: req.params.id }).then(getDataByID => {
      getDataByID.name = req.body.name || getDataByID.name
      getDataByID.updateAt = new Date()
      getDataByID.save().then(result => {
        res.status(200).json({
          UPDATE: result
        });
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  },
  deleteTopic(req, res) {
    Topic.findByIdAndRemove({ _id: req.params.id })
      .then(dataNewsRemove => {
        res.status(200).json({
          REMOVED: dataNewsRemove
        });
      })
      .catch(err => {
        res.status(200).json({
          ERROR: err
        });
      });
  }
};
