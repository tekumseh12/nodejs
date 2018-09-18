
angular.module("anketa", []).controller("aCtrl", function(){
	
	this.winc=0
	this.linuxc=0
	this.macc=0
	this.otherc=0
	this.vyber =["Win", "Linux","Mac","Other"]
	this.potvrd =function(){
		let a = document.getElementById("disa").innerHTML
		
		if (a == "true"){
			if (this.x=="win"){
				this.winc=this.winc+1
			}
			if (this.x=="linux"){
				this.linuxc=this.linuxc+1
			}
			if (this.x=="mac"){
			this.macc=this.macc+1
			}
			if (this.x=="other"){
				this.otherc=this.otherc+1
			}
			this.graf()
		}
		
		
	
	
	}	
	this.graf = function(){	
		this.chart = new CanvasJS.Chart("charte",{
			title:{
				text:"commited"

			},
			data:[{
				type:"column",
				dataPoints:[
					{label:"Windows", y:this.winc},
					{label:"Linux", y:this.linuxc},
					{label:"Mac", y:this.macc},
					{label:"Other", y:this.otherc}
				]
			}]
	
			
		})
		this.chart.render()
		
	}
	this.graf()	

});