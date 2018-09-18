
var mongoose = require("mongoose")
var Schema = mongoose.Schema

var pattern = new Schema({
	name:{type:String,maxlength:5},
	password:{type:String, maxlength:5},
	anketa: {type:Boolean, required:false, default:true}

})
var  Users = mongoose.model("User", pattern)
module.exports = Users