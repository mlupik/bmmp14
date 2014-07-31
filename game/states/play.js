 'use strict';
  function Play() {
  }

  Play.prototype = {
    preload: function() {

    },

    create: function() {
	//testen///
	localStorage.setItem('world',1);
	localStorage.setItem('level',1);
	/////////
	
     this.world = localStorage.getItem('world');
	this.level = localStorage.getItem('level');
	
	 this.game.physics.startSystem(Phaser.Physics.ARCADE);


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
		
		this.cursors = this.game.input.keyboard.createCursorKeys();
		
		
	
    },
    
    update: function() {
		this.checkKeys();
		this.game.physics.arcade.collide(this.avatar,this.layer);
		this.avatar.live();
			 
    },
	 checkKeys: function() {
		//Tastaturereignisse abfragen und ensprechende Funktion aufrufen
	if(this.cursors.left.isDown){
		
		this.avatar.moveLeft();
	} else if(this.cursors.right.isDown){
		this.avatar.moveRight();
	} else if(this.cursors.up.isDown){
		this.avatar.jump();
	} else if(this.cursors.down.isDown){
		this.avatar.moveDown();
	}
  },
	
	//World 1, Level 1
	setupLevel1_1: function() {
		this.game.physics.arcade.gravity.y = 250;
		this.background = this.game.add.sprite(0,0,'weltall');
		this.map = this.game.add.tilemap('map_dummy',200,0);
		this.map.addTilesetImage('tileSet');
		//if you use 'collide' function with the layer, then the tiles from the list will
		//collide with the given sprite
		this.map.setCollision([1,2]);
		//or setCollisionBetween(0,100);
		//the function below is called when a collide with the tile 8 happens
		// this.map.setTileIndexCallback(8, this.hitFinishingLine, this);
		// this.map.setTileLocationCallback(6, 8, 1, 1, this.hitHalf, this);
		// this.map.setCollisionByExclusion([0,1]);
		this.layer = this.map.createLayer("layer1");
		this.layer.resizeWorld();
				
		this.avatar = new Avatar(this.game,100,100,'man');
		this.game.add.existing(this.avatar);
		this.game.camera.follow(this.avatar);
		
		// this.avatar.animations.add('walk', [1,2,3,4,5],10,true);
		// this.avatar.animations.play('walk');
	
		
	
	}
	
  };