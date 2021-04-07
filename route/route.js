var express = require("express")
var fs = require("fs")
var router = express.Router()
var Users = require("../db/mongo")
var Grafs = require("../db/anketa")
var async = require("async")
var request = require("request")
	
		



router.get("/anketa", function(req,res){
	console.log(req.session.user)
	if (req.session.user !== undefined){
	
		async.waterfall([
			function(cb){
				Grafs.find({},function(err,data){
					if (err) throw err
					let b = req.query.OPsystem
					var graf = {anketa:false}
					graf[b] = data[0][b]+1
					console.log(graf)
					cb(null, graf)
				})
			
			},
			function( graf,cb){				
				Grafs.updateOne({}, graf, function(err,data){
					if (err) throw err
					
				})
				Grafs.find({},function(err,data){
					if (err) throw err
					cb(null, data)
					
				})
		
		
						
			}], async function(err, datas){
				let  data = JSON.stringify(datas)
			
				let promise = new Promise((fulfill, reject)=>{
					fs.writeFile("C:/stranka/public/portal/graf.json",data, function(err){
			
						if (err) reject(err)
					
						fulfill("ano")
					
					
					})
				
						
				})	
				let a = await promise	
				if (err) console.log(err)
				console.log(2)
				res.render("templates/graf")
			})
	}else{
		res.redirect("/login")
	}

})
router.get("/snake", function(req,res){
	res.render("templates/snake")
})
router.get("/kalkulacka", function(req,res){
	res.render("templates/kalkulacka")
})
var apiKey = '4fc65fb56356e1275aca92c1a2e9efd3'


function getWeather(city){
	return new Promise((fullfil,reject)=>{
		let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
		request(url, function(err,response,body){

			
			if(err){
    				reject(err)
  			} else {
				
				parse = JSON.parse(body)
				console.log(parse)
				fullfil(parse)
  			}
	
		})
	})
	
}

var weather = {}
var mena = []
router.get("/weatherapp", function(req,res){
	if (req.session.user !== undefined){
		if (req.query.mesto == undefined){
			res.render("templates/weatherapp", {mesta:{} ,mena:[]})
		}else{
		
			getWeather(req.query.mesto).then(function(pocasie){
				weather[pocasie.name] = pocasie
				console.log(weather)
				mena.unshift(pocasie.name)
				res.render("templates/weatherapp", {mesta:weather, mena:mena})
			})
		}
	}else {
		res.redirect("/login")
	}
})

module.exports = router