function StarSystem(game, frame) {  
	//number of the world
		this.id = localStorage.getItem('world');

		this.planets = new Array();

		switch(this.id){
		
		 case '1':
					this.planets.push(new Planet(game,1, 100,50,'sprite_ice'));
					this.planets.push(new Planet(game,2, 500,150,'sprite_tech'));
					this.planets.push(new Planet(game,3, 200,350,'sprite_abstract'));
			break;
		case '2':		this.planets.push(new Planet(game,400,100,planetSystem1Images[0]));
					this.planets.push(new Planet(game,300,200,planetSystem1Images[1]));
					this.planets.push(new Planet(game,100,500,planetSystem1Images[2]));
		 }		

		for(var i = 0; i< this.planets.length;i++){
			game.add.existing(this.planets[i]);
		}
		
				


 }
 
StarSystem.prototype.constructor = StarSystem;

StarSystem.prototype.update = function() {
	
};  

