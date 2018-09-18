app = angular.module("ss", ["ngRoute","pepa"]);
app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl:"dd.html"
	});

});

app.controller("lCtrl", ["lama", function(lama){
	this.meno="dd";
        this.taka = function taka() {
		return lama.saa(5);
	}	
}])
angular.module("pepa",[]).
factory("lama",["$window", function(win){
	var saa = function(s){
		return s;
	}
	return {
	 	saa:saa
	}
}]);