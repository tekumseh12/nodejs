var mongoose = require("mongoose")
var Schema = mongoose.Schema

var pattern = new Schema({
	win:Number,
	
	linux:Number,
	mac:Number,
	other:Number

})
var  Grafs = mongoose.model("Graf", pattern)
module.exports = Grafs