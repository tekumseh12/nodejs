var express = require("express")
var router = express.Router()
var Users = require("../db/mongo")
var Grafs = require("../db/anketa")
function grafdb(){
	
	Grafs.create({win:0,linux:0,mac:0,other:0}, function(err, data){
		if (err) throw err
		
	})
}
router.get("/anketa", function(req,res){
	
	if (typeof req.session.user == "object"){
		let win; 
		let mac;
		let linux; 
		let other; 
		if (req.query.OPsystem != "undefined"){
			
			let promise1 = new Promise(function(fulfill, reject){

				Grafs.find({}, function(err, data){
					if (err) reject(err)
					let b = req.query.OPsystem
					let graf = {}
					graf[req.query.OPsystem] = data[0][b]+1
					fulfill(graf)
				})
			}).then(function(value){
				Grafs.updateOne({}, value, function(err,data){
					if (err) throw err
					win = data.win
					mac = data.mac
					linux = data.linux
					other = data.other
					
				})
			})
			Users.updateOne({_id:req.session.user[0]._id},{anketa:false}, function(err,data){
				if (err) throw err;
			
			})
		}
		let promise = new Promise(function(fulfill, reject){
			Users.findById({_id:req.session.user[0]._id},function(err,data){
				if (err) reject(err)
				fulfill(data)
				
			})
		})
		
		promise.then(function(value){
			res.render("templates/graf", {anketa:value.anketa, mac:mac,linux:linux,other:other,win:win})
		})
		
		
		
	}
	else {
		res.redirect("/login")
	}
	
})

module.exports = router