var mongoose = require("mongoose")
var url  = "mongodb://localhost/mydb"
var express = require("express");
var app = express()
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
mongoose.connect(url,{useNewUrlParser: true})
var promisify = require("util")
var Users = require("./db/mongo")
var http = require('http').Server(app)
app.use(express.static("public"))
var io = require('socket.io')(http)


app.use(bodyParser.json())
var session = require("client-sessions")
app.use(session({
	cookieName:"session",
	secret:"safsfs",
	duration:30*60*1000,
	activeDuration:60*5*1000
}))
	


 
var route = require("./route/route")
app.use("/portal",route)
app.get("/login", function(req,res){
	res.render("templates/login");
})

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on("chat_message", function(msg){
		socket.emit("chat_message", msg)
	})
	socket.on('disconnect', function(){
   		console.log('user disconnected');
 	 });
});

app.post("/portal", function(req,res){
	var meno=req.body.name
	var password = req.body.password
	Users.find({name:meno,password:password}, function(err,data){
		
		if (err) res.status(500).send(err)
		if (data != ""){
			req.session.user = data
			meno = req.session.user[0].name
			
			res.render("templates/portal",{meno:meno})
		}else{
			res.redirect("/login")
			
		}
	});
});
app.get("/portal", function(req,res){
	
	if (typeof req.session.user == "object"){
		let meno =req.session.user[0].name
		
		res.render("templates/portal",{meno:meno})
	}
	else {
		res.redirect("/login")
	}
	
})
app.get("/register", function(req,res){
	let user = []
	var error = ""
	Users.find({}, function(err,data){
		if (err) throw err;
		data.forEach(function(user){
			users.push(user)
		})
	
		res.render("templates/register", {users:users,error:error});
	})
});


app.post("/registerPage", function(req,res){
	var names = req.body.meno;
	var passwords = req.body.password;
	
	validate()
	async function validate(){
		promise =  new Promise((fulfill,reject) =>{
			Users.find({},function(err,data){
				if (err) reject(err)
			
				let a = 0
				data.forEach(function(data){
					
					if (data.name == names){
						a = a+1
					}
				})
				fulfill(a)
						
			})
		})
		let a = await promise
		var error = ""
		console.log(a)
		if (a <=1){

		
			let user = new Users({name:names,
				password:passwords
				})
			user.save(function(err){
				if (err) throw err
			})
			res.render("templates/registerPage", {names:names,error:error})
		}else{
			error="this name is already taken"
			res.render("templates/register", {error:error,users:"a"});
		}
		
	}
});
app.get("/signout", function(req,res){
	let meno = req.session.user[0].name
	req.session.reset()
	res.render("templates/signout", {meno:meno})
})

var port = 8080
var server = http.listen(port,function(){
	console.log("site is listening on port %d", server.address().port )
})

module.exports = Users
