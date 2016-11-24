var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var taskSchema = new Schema({  
  description:  { type: String },
  createDate:   { type: Date },
  state:        { type: String }
});

module.exports = mongoose.model('Task', taskSchema);  