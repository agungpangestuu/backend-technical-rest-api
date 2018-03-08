const ObjectId = require("mongodb").ObjectId;
const News = require("../models/newsModel");

module.exports = {
  getAllNews(req, res) {
    News.find()
      .populate("topicId")
      .then(dataNews => {
        res.status(200).json({
          SUCCES: dataNews
        });
      })
      .catch(errGetData => {
        res.status(500).json({
          ERROR: errGetData
        });
      });
  },
  getNews(req, res) {
    News.findOne({ _id: req.params.id })
      .populate("topicId")
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
  createNews(req, res, next) {
    let data = {
      image: req.body.image,
      title: req.body.title,
      deskripsi: req.body.deskripsi,
      status: req.body.status
    };
    let newNews = News(data);
    newNews
      .save()
      .then(result => {
        req.add = result._id;
        req.body.topicId
          ? next()
          : res.status(200).json({
              SUCCES: result
            });
      })
      .catch(err => {
        // console.log(err)
        res.status(500).json({
          ERROR: err
        });
      });
  },
  updateNews(req, res) {
    News.findById({ _id: req.params.id })
      .then(getDataByID => {
        getDataByID.image = req.body.image || getDataByID.image;
        getDataByID.title = req.body.title || getDataByID.title;
        getDataByID.deskripsi = req.body.deskripsi || getDataByID.deskripsi;

        if (req.body.topicId) {
          req.body.topicId.forEach(dataTopicId => {
            let topic = getDataByID.topicId.filter(item => item == dataTopicId);
            topic.length < 0
              ? getDataByID.topicId.push(dataTopicId)
              : console.log(dataTopicId);
          });
        }
        getDataByID.save().then(result => {
          res.status(200).json({
            UPDATE: result
          });
        });
      })
      .catch(err => console.log(err));
  },
  deleteNews(req, res) {
    News.findByIdAndUpdate({ _id: req.params.id }, { status: "delete" })
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
  },
  addTopic(req, res) {
    News.findById({ _id: req.add })
      .then(result => {
        let topic =
          typeof req.body.topicId == "string"
            ? [req.body.topicId]
            : req.body.topicId;
        topic.forEach(item => {
          if (!result.topicId.includes(item)) {
            News.findByIdAndUpdate(
              { _id: req.add },
              { $push: { topicId: ObjectId(item) } }
            )
              .then(createData => {
                res.status(200).json({
                  SUCCES: createData
                });
              })
              .catch(err => {
                res.status(200).json({
                  ERROR: err
                });
              });
          }
        });
      })
      .catch(err => console.log(err));
  },
  filterNews(req, res) {
    if (req.query.status && req.query.topic) {
      let topic = req.query.topic;
      if (req.query.topic.indexOf(",") > -1) {
        topic = topic.split(",");
      } else {
        topic = [req.query.topic];
      }
      console.log(topic);
      News.find()
        .populate("topicId")
        .then(newsdata => {
          // console.log(newsdata);
          let arrResult = []
          newsdata.forEach(itemNews => {
            itemNews.topicId.forEach(itemTopic => {
              topic.includes(itemTopic.name) ? arrResult.push(itemNews): ""
            })
          })
          let result = arrResult.filter(filterResult => req.query.status == filterResult.status)
          res.status(200).json({
            SUCCES: result
          });
        })
        .catch(newsErr => {
          console.log(newsErr)
          res.status(500).json({
            ERROR: newsErr
          });
        });
    } else if (req.query.status) {
      News.find()
      .populate('topicId')
        .then(result => {
          let data = result.filter(item => {
            return item.status == req.query.status;
          });
          res.status(200).json({
            SUCCES: data
          });
        })
        .catch(err => {
          ERROR: "sorry internal Server ERror";
        });
    } else if (req.query.topic) {
      let topic = req.query.topic;
      if (req.query.topic.indexOf(",") > -1) {
        topic = topic.split(",");
      } else {
        topic = [req.query.topic];
      }
      console.log(topic);
      News.find()
        .populate("topicId")
        .then(newsdata => {
          // console.log(newsdata);
          let result = []
          newsdata.forEach(itemNews => {
            itemNews.topicId.forEach(itemTopic => {
              topic.includes(itemTopic.name) ? result.push(itemNews): ""
            })
          })
          res.status(200).json({
            SUCCES: result
          });
        })
        .catch(newsErr => {
          console.log(newsErr)
          res.status(500).json({
            ERROR: newsErr
          });
        });
    } else {
      News.find()
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
    }
  }
};
