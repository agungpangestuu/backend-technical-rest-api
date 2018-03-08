const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
    // trim : true
  },
  deskripsi: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  topicId: [{
    type: Schema.Types.ObjectId,
    ref: "Topic",
    default: []
  }],
  status: {
    type: String,
    default: "draft"
  }
});

const newsModels = mongoose.model("News", newsSchema);
module.exports = newsModels;
