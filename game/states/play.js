 'use strict';
  function Play() {
  this.moving = false;
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
	
	 this.game.physics.startSystem(Phaser.Physics.P2);


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
		this.game.physics.arcade.collide(this.collGroup,this.layer);
		this.avatar.live();
		//this.game.physics.arcade.overlap(this.avatar, this.coin, this.collect, null, this);
		this.game.physics.arcade.overlap(this.collGroup, this.avatar, this.collect, null, this);
			 
    },
	 checkKeys: function() {
		//Tastaturereignisse abfragen und ensprechende Funktion aufrufen
	if(this.cursors.left.isDown){
		this.moving = true;
		this.avatar.moveLeft();
	}else if(this.cursors.right.isDown){
		this.moving = true;
		this.avatar.moveRight();
	}else if(this.moving){
		this.moving = false;
		this.avatar.stop();
	}
	
	if(this.cursors.up.isDown){
		this.avatar.jump();
		this.moving = true;
	} else if(this.cursors.down.isDown){
		this.moving = true;
		this.avatar.moveDown();
	} 
  },
	
	//World 1, Level 1
	setupLevel1_1: function() {
		//Schwerkraft
		this.game.physics.arcade.gravity.y = 250;
		//Hintergrund
		this.background = this.game.add.sprite(0,0,'weltall');
		//Tilemap
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
		//Einfügen des Avatars		
		this.avatar = new Avatar(this.game,100,100,'man');
		this.game.add.existing(this.avatar);
		this.game.camera.follow(this.avatar);
		this.collGroup = this.game.add.group();
		this.setupCoins1_1(10);
		this.setupHearts1_1(3);
	
	
		
	
	},
	
	setupCoins1_1: function(collNum){
		for(var i = 0; i< collNum; i++){
			var pos = this.getCoinPos();
			var coin = new Collectable(this.game,pos,'coin','coin');
			this.game.add.existing(coin);
			this.collGroup.add(coin);
			// this.coin = new Collectable(this.game,this.getCoinPos(),'coin');
			// this.game.add.existing(this.coin);
		
		}
	},
	
		setupHearts1_1: function(collNum){

		for(var i = 0; i< collNum; i++){
			var pos = this.getCoinPos();
			var heart = new Collectable(this.game,pos,'heart','heart');
			this.game.add.existing(heart);
			this.collGroup.add(heart);
			// this.coin = new Collectable(this.game,this.getCoinPos(),'coin');
			// this.game.add.existing(this.coin);
		
		}
	},
	
	collect: function(avatar, coin){
		coin.collect();
	
	},
	
	getCoinPos: function(){
		var tileNum = this.map.width;
		console.log(tileNum);
		var pos = this.game.rnd.integerInRange(1,124);
		pos = pos * this.map.tileWidth + this.map.tileWidth/2;
		console.log(pos);
		return pos;
	}
	
	
  };