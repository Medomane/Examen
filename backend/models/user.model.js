const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  gender : { type : String, required: true },
  dob:{type: Date,default: Date.now},
  news:{type : Boolean},
  email : {type : String,required: true},
  photo : {type : String,required: true,default:"avatar.png"}
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;