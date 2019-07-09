const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const planSchema = new Schema({
  name: String,
  done: Boolean,
  userId: String,
  ddl: Date
});
module.exports = mongoose.model("todoList", planSchema);
