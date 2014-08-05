 'use strict';
  function Play1() {
  this.moving = false;
  }

  Play1.prototype = {
    preload: function() {

    },

    create: function() {
		
	    this.world = localStorage.getItem('world');
		this.level = localStorage.getItem('level');
		
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		// Add a input listener that can help us return from being paused
		this.game.input.onDown.add(this.unpause, self);
	
	
		this.setupLevel();
		
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
		this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);		
	
    },
    
    update: function() {
		this.checkKeys();
		this.enemGroup.forEach(this.moveEnemies,this);
		if(!this.game.pause && this.window){
			this.window.destroy();
		}
		//this.avatar.body.collides(this.collectableCollisionGroup,this.collect,this);
		// this.game.physics.p2.collide(this.avatar,this.layer);
		// this.game.physics.p2.collide(this.collGroup,this.layer);
		// this.game.physics.p2.collide(this.enemGroup,this.layer);
		this.avatar.live();
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
	setupLevel: function() {
		//Schwerkraft
		
		//Hintergrund
		this.background = this.game.add.sprite(0,0,'hintergrund1');
		this.middleground = this.game.add.sprite(0,0, 'mittelgrund1');
		this.foreground = this.game.add.sprite(0,0, 'vordergrund1');
		//this.background.fixedToCamera = true;
		this.setupStatusBar();
		//Tilemap
		this.map = this.game.add.tilemap('map_dummy');
		this.map.addTilesetImage('tileSet');
		//if you use 'collide' function with the layer, then the tiles from the list will
		//collide with the given sprite
		this.layer = this.map.createLayer("ground");
		//this.bg_layer = this.map.createLayer("Bildebene 1");
		this.layer.resizeWorld();
		//this.bg_layer.resizeWorld();
		
		this.map.setCollisionBetween(1,2);
		//Define CollisionGroups
		this.avatarCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.enemyCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.collectableCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.tilemapCollisionGroup = this.game.physics.p2.createCollisionGroup();
		// this.worldCollisionGroup = this.game.physics.p2.boundsCollisionGroup
		
		var tiles = this.game.physics.p2.convertTilemap(this.map, this.layer,true);
		 for(var tile in tiles)
		  {
			tiles[tile].setCollisionGroup(this.tilemapCollisionGroup);
			tiles[tile].collides([this.avatarCollisionGroup,this.enemyCollisionGroup,this.collectableCollisionGroup]);
		 }
		
		// console.log("map:",tiles);		
		this.game.physics.p2.restitution = 0.1;
		//this.game.physics.p2.updateBoundsCollisionGroup(true);
		
		// this.game.physics.p2.setBoundsToWorld(true, true, true, true, true);
		// this.worldBounds = 
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
		this.setupLightning1_1(4);
		this.setupSuperPower1_1(4);
		//collisions avatar
		this.avatar.body.setCollisionGroup(this.avatarCollisionGroup);
		this.avatar.body.collides(this.enemyCollisionGroup,this.meetEnemy,this);
		this.avatar.body.collides(this.collectableCollisionGroup,this.collect,this);
		this.avatar.body.collides(this.tilemapCollisionGroup, this.touchedFloor,this);
		// this.worldCollisionGroup.forEach.collides(this.avatarCollisionGroup);
		// this.game.physics.p2.boundsCollidesWith = [this.avatarCollisionGroup,this.enemyCollisionGroup];
		// this.avatar.body.collides(this.worldCollisionGroup);
		
	
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
	
		setupLightning1_1: function(collNum){

		for(var i = 0; i< collNum; i++){
			var pos = this.getCoinPos();
			var heart = new Collectable(this.game,pos,'blitz','lightning');
			this.game.add.existing(heart);
			this.collGroup.add(heart);
			heart.body.setCollisionGroup(this.collectableCollisionGroup);
			heart.body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);
		
		}
	},
	
		setupSuperPower1_1: function(collNum){

		for(var i = 0; i< collNum; i++){
			var pos = this.getCoinPos();
			var heart = new Collectable(this.game,pos,'superpower','superpower');
			this.game.add.existing(heart);
			this.collGroup.add(heart);
			heart.body.setCollisionGroup(this.collectableCollisionGroup);
			heart.body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);
		
		}
	},
	
	
	setupEnemies1_1: function(enemNum){
		for(var i = 0; i< enemNum; i++){
			var pos = this.getCoinPos();
			var enemy = new Enemy(this.game,pos,200,100,3,'enemy1_walk');
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
		coin.clearCollision(true);
		if(coin.sprite.type == 'lightning'){
			avatar.sprite.speedUp();
		}else if(coin.sprite.type == 'superpower'){
			avatar.sprite.superPower();
			
		}
		coin.sprite.collect();
		this.updateStatusBar();
	
	},
	
	meetEnemy: function(avatar, enemy){
		// console.log("Oh my god an enemy!!!!");
		// console.log("left",avatar.body.wasTouching.left);
		// console.log("right",avatar.body.wasTouching.right);
		// console.log("up",avatar.body.wasTouching.up);
		var onTop = (enemy.sprite.y - avatar.sprite.y) >= avatar.sprite.height/2;
		// console.log("onTop",onTop);	
		
		if(onTop){
			if(avatar.sprite.immortal){
				enemy.sprite.die();
			}else{
				enemy.sprite.hurt();
			}
			avatar.sprite.hitEnemy();
			
		}else{
			if(avatar.sprite.immortal){
				enemy.sprite.die();
				avatar.sprite.hitEnemy();
			}else{
			avatar.sprite.hurt();
			}
		}		
		this.updateStatusBar();
	},
	
	getCoinPos: function(){
		var tileNum = this.map.width;
		//console.log(tileNum);
		var pos = this.game.rnd.integerInRange(1,tileNum);
		pos = pos * this.map.tileWidth + this.map.tileWidth/2;
		// console.log(pos);
		return pos;
	},
	
	touchedFloor: function(avatar,floor){
		// console.log("play:avatar on Floor:", avatar.sprite.onFloor);
		if(!avatar.sprite.onFloor){
			avatar.sprite.onFloor = true;
			avatar.sprite.body.velocity.x = 0;
		}
	},
	
	moveEnemies: function(enemy){
		enemy.randomMove();
	},
	
	setupStatusBar: function(){
		if(!!localStorage){
			var data = JSON.parse(localStorage.getItem('avatarData'));
			this.hearts = data.hearts;
			this.hearts_img = this.game.add.sprite(550,0,'hearts');
			this.hearts_img.frame = 0;
			this.points = data.points;
			// console.log("points:",this.points);
			// console.log("hearts:",this.hearts);
			this.statusBar = this.game.add.group();
			this.point_text = this.game.add.bitmapText(400,0, 'font_black',this.points.toString(), 30);
			this.name_text = this.game.add.bitmapText(0,0, 'font_black',data.name, 30);
			this.pauseButton = this.game.add.button(700,0, 'pause_button',this.pauseMenu,this);
				
			this.statusBar.add(this.point_text);
			this.statusBar.add(this.name_text);
			this.statusBar.add(this.hearts_img);
			this.statusBar.add(this.pauseButton);
			this.statusBar.x = 20;
			this.statusBar.y = 10;
			this.statusBar.fixedToCamera = true;
		
		}
		
	
	},
	
		updateStatusBar: function() {
		if(!!localStorage) {
		var data = JSON.parse(localStorage.getItem('avatarData'));
			this.hearts = data.hearts;
			// console.log("play:hearts",this.hearts);
			switch(this.hearts){
				case 0 : this.hearts_img.frame = 3;
				break;
				case 1 : this.hearts_img.frame = 2;
				break;
				case 2: this.hearts_img.frame = 1;
				break;	
				case 3: this.hearts_img.frame = 0;
				break;					
			}
			this.points = data.points;
			this.point_text.text = this.points.toString();
			this.name_text.text = data.name;
		}
	},
	
	pauseMenu: function(){
		this.pause();
		this.window = this.game.add.group();
		this.window.fixedToCamera=true;
		var menu_bg = this.game.add.sprite(0,0,'menu_bg');
		console.log("menu: ",menu_bg);
		// menu_bg.anchor.setTo(0.5, 0.5);
		var ok_button = this.game.add.sprite(0,0, 'button');
		// ok_button.anchor.setTo(0.5,0.5);

		var start_text = this.game.add.bitmapText(0,0, 'font_black','Start', 40);
		this.window.add(menu_bg);
		this.window.add(ok_button);
		this.window.add(start_text);
		this.window.x = this.game.camera.x+400-this.window.width/2;
		this.window.y = this.game.camera.y+300-this.window.height/2;

	},
	
	pause: function(){
					game.paused = true;	
				 
	},
	

	

		
	   unpause: function(event){
        // Only act if paused
        if(game.paused){
                 game.paused = false;
            }
			
    }
	
	
  };