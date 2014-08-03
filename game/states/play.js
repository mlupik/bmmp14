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
	
	 this.game.physics.startSystem(Phaser.Physics.P2JS);


	 


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
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
		this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);		
	
    },
    
    update: function() {
		this.checkKeys();
		this.enemGroup.forEach(this.moveEnemies,this);
		//this.avatar.body.collides(this.collectableCollisionGroup,this.collect,this);
		// this.game.physics.p2.collide(this.avatar,this.layer);
		// this.game.physics.p2.collide(this.collGroup,this.layer);
		// this.game.physics.p2.collide(this.enemGroup,this.layer);
		// //this.avatar.live();
		// //this.game.physics.p2.overlap(this.avatar, this.coin, this.collect, null, this);
		// this.game.physics.p2.overlap(this.collGroup, this.avatar, this.collect);
		// this.game.physics.p2.overlap(this.enemGroup, this.avatar, this.meetEnemy);
			 
    },
	 checkKeys: function() {
		//Tastaturereignisse abfragen und ensprechende Funktion aufrufen
		if(this.cursors.left.isDown){
			this.avatar.moveLeft();
		}else if(this.cursors.right.isDown){
			// this.moving = true;
			this.avatar.moveRight();
		}else {
			this.avatar.stopMove();
		}
		
		// if(this.cursors.up.isDown){
			// this.avatar.jump();
		// }
		
		if(this.spacebar.isDown){
			this.avatar.jump();
	} 
	
  },
	
	//World 1, Level 1
	setupLevel1_1: function() {
		//Schwerkraft
		
		//Hintergrund
		this.background = this.game.add.sprite(0,0,'weltall');
		this.background.fixedToCamera = true;
		//Tilemap
		this.map = this.game.add.tilemap('map_dummy');
		this.map.addTilesetImage('tileSet');
		//if you use 'collide' function with the layer, then the tiles from the list will
		//collide with the given sprite
		this.layer = this.map.createLayer("layer1");
		this.layer.resizeWorld();
//this.game.physics.p2.updateBoundsCollisionGroup();
		this.map.setCollisionBetween(1,2);
		//Define CollisionGroups
		this.avatarCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.enemyCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.collectableCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.tilemapCollisionGroup = this.game.physics.p2.createCollisionGroup();
		
		var tiles = this.game.physics.p2.convertTilemap(this.map, this.layer,true);
		 for(var tile in tiles)
		  {
			tiles[tile].setCollisionGroup(this.tilemapCollisionGroup);
			tiles[tile].collides([this.avatarCollisionGroup,this.enemyCollisionGroup,this.collectableCollisionGroup]);
		 }
		
		console.log("map:",tiles);		
		this.game.physics.p2.restitution = 0.1;
//this.game.physics.p2.setBoundsToWorld(true, true, true, true, true);
		
		// this.avatarCollisionGroup = this.game.physics.p2.createCollisionGroup();
		// this.enemyCollisionGroup = this.game.physics.p2.createCollisionGroup();
		// this.collectableCollisionGroup = this.game.physics.p2.createCollisionGroup();
		
		this.game.physics.p2.gravity.y = 400;

		this.game.physics.p2.setImpactEvents(true);
		//or setCollisionBetween(0,100);
		//the function below is called when a collide with the tile 8 happens
		// this.map.setTileIndexCallback(8, this.hitFinishingLine, this);
		// this.map.setTileLocationCallback(6, 8, 1, 1, this.hitHalf, this);
		// this.map.setCollisionByExclusion([0,1]);
		
		
		//Einfügen des Avatars		
		this.avatar = new Avatar(this.game,100,100,'man');
		this.game.add.existing(this.avatar);
		this.game.camera.follow(this.avatar);
		this.collGroup = this.game.add.group();
		this.enemGroup = this.game.add.group();
		this.setupCoins1_1(10);
		this.setupHearts1_1(3);
		this.setupEnemies1_1(4);
		//collisions avatar
		this.avatar.body.setCollisionGroup(this.avatarCollisionGroup);
		this.avatar.body.collides(this.enemyCollisionGroup,this.meetEnemy,this);
		this.avatar.body.collides(this.collectableCollisionGroup,this.collect,this);
		this.avatar.body.collides(this.tilemapCollisionGroup, this.touchedFloor,this);
		
		
	
	},
	
	setupCoins1_1: function(collNum){
		for(var i = 0; i< collNum; i++){
			var pos = this.getCoinPos();
			var coin = new Collectable(this.game,pos,'coin','coin');
			this.game.add.existing(coin);
			this.collGroup.add(coin);
			// this.coin = new Collectable(this.game,this.getCoinPos(),'coin');
			// this.game.add.existing(this.coin);
			coin.body.setCollisionGroup(this.collectableCollisionGroup);
			coin.body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);
		
		}
	},
	
		setupHearts1_1: function(collNum){

		for(var i = 0; i< collNum; i++){
			var pos = this.getCoinPos();
			var heart = new Collectable(this.game,pos,'heart','heart');
			this.game.add.existing(heart);
			this.collGroup.add(heart);
			heart.body.setCollisionGroup(this.collectableCollisionGroup);
			heart.body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);
		
		}
	},
	
	
	setupEnemies1_1: function(enemNum){
		for(var i = 0; i< enemNum; i++){
			var pos = this.getCoinPos();
			var enemy = new Enemy(this.game,pos,400,100,3,'enemy');
			this.game.add.existing(enemy);
			// var tween = this.game.add.tween(enemy).to({x: enemy.end},10000).loop();
			// tween.onComplete.add(function(){enemy.x = enemy.start},this);
			// tween.start();
			this.enemGroup.add(enemy);	
			enemy.body.setCollisionGroup(this.enemyCollisionGroup);
			enemy.body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);
		}	
	},
	
	collect: function(avatar, coin){
		console.log(typeof(coin));
		coin.sprite.collect();
	
	},
	
	meetEnemy: function(avatar, enemy){
		// console.log("Oh my god an enemy!!!!");
		// console.log("left",avatar.body.wasTouching.left);
		// console.log("right",avatar.body.wasTouching.right);
		// console.log("up",avatar.body.wasTouching.up);
		var onTop = (enemy.sprite.y - avatar.sprite.y) >= avatar.sprite.height/2;
		console.log("onTop",onTop);	
		if(onTop){
			enemy.sprite.hurt();
		}else{
			avatar.sprite.hurt();
		}		
	},
	
	getCoinPos: function(){
		var tileNum = this.map.width;
		console.log(tileNum);
		var pos = this.game.rnd.integerInRange(1,124);
		pos = pos * this.map.tileWidth + this.map.tileWidth/2;
		console.log(pos);
		return pos;
	},
	
	touchedFloor: function(avatar,floor){
		console.log("play:avatar on Floor:", avatar.sprite.onFloor);
		if(!avatar.sprite.onFloor){
			avatar.sprite.onFloor = true;
			avatar.sprite.body.velocity.x = 0;
		}
	},
	
	moveEnemies: function(enemy){
		enemy.randomMove();
	}
	
	
  };