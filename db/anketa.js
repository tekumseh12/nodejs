var mongoose = require("mongoose")
var Schema = mongoose.Schema

var pattern = new Schema({
	windows:Number,
	
	linux:Number,
	mac:Number,
	other:Number,
	anketa:Boolean

})
var  Grafs = mongoose.model("Graf", pattern)
module.exports = Grafs