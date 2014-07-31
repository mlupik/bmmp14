function StarSystem(game, frame) {  
	//number of the world
		this.id = localStorage.getItem('world');
	  this.planets = new Array();
	  for(var i = 0; i< starSystems[this.id-1]; i++){
		// this.planets.push(new Planet(this,));
	  }

 }
 
StarSystem.prototype.constructor = StarSystem;

StarSystem.prototype.update = function() {
	
};  

