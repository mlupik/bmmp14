function StarSystem(game, frame) {  
	//number of the world
		this.id = localStorage.getItem('world');
		this.planets = new Array();

		switch(this.id){
		
		 case '1':
					this.planets.push(new Planet(game,0,0,planetSystem1Images[0]));
					this.planets.push(new Planet(game,100,200,planetSystem1Images[1]));
					this.planets.push(new Planet(game,200,350,planetSystem1Images[2]));
					this.planets.push(new Planet(game,400,500,planetSystem1Images[3]));
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

