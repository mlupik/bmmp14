 'use strict';
  function Play() {
  }

  Play.prototype = {
    preload: function() {
		this.game.load.tilemap('map_dummy','././assets/tiling/tiles.json',null, Phaser.Tilemap.TILED_JSON);
	  this.game.load.image('tile_dummy', '././assets/tiling/tiles3.png',128,128);
    },

    create: function() {
	//testen///
	localStorage.setItem('world',1);
	localStorage.setItem('level',1);
	/////////
	
     this.world = localStorage.getItem('world');
	this.level = localStorage.getItem('level');
	//this.setupLevel1_1();
		switch(this.world){
		//world 1
			case '1':
				switch(this.level){
					//level 1
					case '1':
						this.setupLevel1_1();
					break;
					
					case '2':
					
					break;
					
					case '3':
					
					break;
					case '4':
					
					break;
					
				}
			break;
		//world 2
			case '2':
			//switch mit level zahl...
			
			break;
		}
	
    },
    
    update: function() {
     
    },
	
	//World 1, Level 1
	setupLevel1_1: function() {
		
		//this.background = this.game.add.sprite(0,0,'weltall');
		this.map = this.game.add.tilemap('map_dummy');
		this.map.addTilesetImage('tile_dummy');
		this.map.setCollision(1);
		this.map.setTileIndexCallback(8, this.hitFinishingLine, this);
		this.map.setTileLocationCallback(6, 8, 1, 1, this.hitHalf, this);
		this.layer = this.map.createLayer("tilelayer1");
		this.layer.resizeWorld();
	
		
	
	}
	
  };