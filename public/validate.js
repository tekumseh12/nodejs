app = angular.module("validate", []);
app.controller("vCtrl", function(){
	this.error_n=false
	this.meno=""
	this.password=""
	this.error_p=false
	this.validate = function(){
		if (this.meno.length >= 5){
			this.error_n = true
			this.msg_n = "name has to have less letters as 5"
		}
		if (this.password.length >= 5){
			this.error_p = true
			this.msg_p = "password has to have less letters as 5"
		}
	
	}



})