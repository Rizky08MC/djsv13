const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  Guild: String,
  Message: String,
  Content: String
})

module.exports = mongoose.model("auto-respond", Schema)