 'use strict';
  function Play1() {
  this.moving = false;
  this.enemyNum = 4;
  this.coinNum = 10; 
 
	

	

  }

  Play1.prototype = {
    preload: function() {

    },

    create: function() {
		var avdat = JSON.parse(localStorage.getItem("avatarData"));
		avdat.hearts = 3;
		avdat.points = 0;
		localStorage.setItem('enemyCount',JSON.stringify({enemyCount: 0}));
		this.coinCount = 0;
		localStorage.setItem('avatarData',JSON.stringify(avdat));
		console.log("hearts_start",JSON.parse(localStorage.getItem("avatarData")).hearts);
		console.log("points_start",JSON.parse(localStorage.getItem("avatarData")).points);
		this.gameOver = false;
		this.won = false;
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
		this.controllScrolling();
		this.enemGroup.forEach(this.moveEnemies,this);
		if(!(this.game.pause || this.gameOver || this.won) && this.window){
			this.window.destroy();
		}
		//this.avatar.body.collides(this.collectableCollisionGroup,this.collect,this);
		// this.game.physics.p2.collide(this.avatar,this.layer);
		// this.game.physics.p2.collide(this.collGroup,this.layer);
		// this.game.physics.p2.collide(this.enemGroup,this.layer);
		//this.avatar.live();
		if(!this.avatar.alive && !this.gameOver){
			console.log("avatar dead");
			this.gameOverMenu();
		}
			this.updateStatusBar();
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
		this.middleground = this.game.add.tileSprite(0,0,4788,900, 'mittelgrund1');
		this.foreground = this.game.add.tileSprite(0,0, 4788,900,'vordergrund1');


		//this.background.autoScroll(-50,0);
		



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
		this.rewardCollisionGroup = this.game.physics.p2.createCollisionGroup();
		// this.worldCollisionGroup = this.game.physics.p2.boundsCollisionGroup
		
		var tiles = this.game.physics.p2.convertTilemap(this.map, this.layer,true);
		 for(var tile in tiles)
		  {
			tiles[tile].setCollisionGroup(this.tilemapCollisionGroup);
			tiles[tile].collides([this.avatarCollisionGroup,this.enemyCollisionGroup,this.rewardCollisionGroup,this.collectableCollisionGroup]);
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
		this.avatar = new Avatar(this.game,100,100,'avatar_walk_right');
		this.game.add.existing(this.avatar);
		this.game.camera.follow(this.avatar);
		this.collGroup = this.game.add.group();
		this.enemGroup = this.game.add.group();
		this.setupCoins1_1();
		// this.setupHearts1_1(3);
		// this.setupEnemies1_1();
		// this.setupLightning1_1(4);
		// this.setupSuperPower1_1(4);
		// this.setupReward1_1();
		//collisions avatar
		this.avatar.body.setCollisionGroup(this.avatarCollisionGroup);
		this.avatar.body.collides(this.enemyCollisionGroup,this.meetEnemy,this);
		this.avatar.body.collides(this.collectableCollisionGroup,this.collect,this);
		this.avatar.body.collides(this.tilemapCollisionGroup, this.touchedFloor,this);
		this.avatar.body.collides(this.rewardCollisionGroup, this.wonMenu,this);
		// this.worldCollisionGroup.forEach.collides(this.avatarCollisionGroup);
		// this.game.physics.p2.boundsCollidesWith = [this.avatarCollisionGroup,this.enemyCollisionGroup];
		// this.avatar.body.collides(this.worldCollisionGroup);
		
	
	},
	
	setupCoins1_1: function(){
		// for(var i = 0; i< this.coinNum; i++){
		// 	var pos = this.getCoinPos();
		// 	var coin = new Collectable(this.game,pos,'coin','coin');
		// 	this.game.add.existing(coin);
		// 	this.collGroup.add(coin);
		// 	// this.coin = new Collectable(this.game,this.getCoinPos(),'coin');
		// 	// this.game.add.existing(this.coin);
		// 	coin.body.setCollisionGroup(this.collectableCollisionGroup);
		// 	coin.body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);
		
		// }


			var coin = new Collectable(this.game,this.getX(10),this.getY(15),'coin','coin');
			this.game.add.existing(coin);
			this.collGroup.add(coin);
			coin.body.setCollisionGroup(this.collectableCollisionGroup);
			coin.body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);

	
		
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
	
	
	setupEnemies1_1: function(){
		for(var i = 0; i< this.enemyNum; i++){
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
	
		setupReward1_1: function(){
			var pos = this.getRewardPos();
			var reward = new Collectable(this.game,pos,'reward','reward');
			this.game.add.existing(reward);
			this.collGroup.add(reward);	
			reward.body.setCollisionGroup(this.rewardCollisionGroup);
			reward.body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);	
	},
	
	collect: function(avatar, coin){
		coin.clearCollision(true);
		if(coin.sprite.type == 'lightning'){
			avatar.sprite.speedUp();
		}else if(coin.sprite.type == 'superpower'){
			avatar.sprite.superPower();
			
			
		} else if (coin.sprite.type == 'coin') {
			this.coinCount +=1;
		}
		coin.sprite.collect();
		// this.updateStatusBar();
	
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
		// this.updateStatusBar();
	},
	
	getCoinPos: function(){
		var tileNum = this.map.width;
		//console.log(tileNum);
		var pos = this.game.rnd.integerInRange(1,tileNum);
		pos = pos * this.map.tileWidth + this.map.tileWidth/2;
		// console.log(pos);
		return pos;
	},
	
	getRewardPos: function(){
		var tileNum = this.map.width;
		//console.log(tileNum);
		var pos = tileNum-1;
		pos = pos * this.map.tileWidth + this.map.tileWidth/2;
		// console.log(pos);
		return pos;
	},
	
	touchedFloor: function(avatar,floor){
		// console.log("play:avatar on Floor:", avatar.sprite.onFloor);
		if(!avatar.sprite.onFloor){
			avatar.sprite.onFloor = true;
			avatar.sprite.frame = 2;
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
			this.hearts_img.frame = 3;
			this.lightning_img = this.game.add.sprite(150,0,'blitz_icon');
			this.lightning_img.frame = 0;
			this.superpower_img = this.game.add.sprite(250,0,'superpower_icon');
			this.superpower_img.frame = 0;
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
			this.statusBar.add(this.lightning_img);
			this.statusBar.add(this.superpower_img);
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
				case 0 : this.hearts_img.frame = 0;
				break;
				case 1 : this.hearts_img.frame = 1;
				break;
				case 2: this.hearts_img.frame = 2;
				break;	
				case 3: this.hearts_img.frame = 3;
				break;					
			}
			if(this.avatar.fast){
				this.lightning_img.frame = 0;
			}else{
				this.lightning_img.frame = 1;
			}
			
			if(this.avatar.immortal){
				this.superpower_img.frame = 0;
			}else{
				this.superpower_img.frame = 1;
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
		var menu_bg = this.game.add.sprite(0,0,'menu_pause_ice');
		console.log("menu: ",menu_bg);
		// menu_bg.anchor.setTo(0.5, 0.5);
		var continue_button = this.game.add.sprite(0,0, 'button_continue_ice');
		var menu_button = this.game.add.sprite(0,0, 'button_menu_ice');
		// ok_button.anchor.setTo(0.5,0.5);

		var start_text = this.game.add.bitmapText(0,0, 'font_black','Start', 40);
		this.window.add(menu_bg);
		this.window.add(menu_button);
		this.window.add(continue_button);
		this.window.add(start_text);
		this.window.x = this.game.camera.x+400-this.window.width/2;
		this.window.y = this.game.camera.y+300-this.window.height/2;

	},
	
	
	gameOverMenu: function(){
		this.gameOver = true;
		this.window = this.game.add.group();
		this.window.fixedToCamera=true;
		var menu_bg = this.game.add.sprite(0,0,'menu_bg');
		console.log("menu: ",menu_bg);
		// menu_bg.anchor.setTo(0.5, 0.5);
		var again_button = this.game.add.button(200,200, 'button', function (){this.game.state.start('play1'); }, this);
		var back_button = this.game.add.button(200, 250, 'button', function() {this.game.state.start('chooseStar');}, this);
		// ok_button.anchor.setTo(0.5,0.5);

		var again_text = this.game.add.bitmapText(200,200, 'font_black','again', 40);
		var back_text = this.game.add.bitmapText(200,250, 'font_black','back', 40);
		this.window.add(menu_bg);
		this.window.add(again_button);
		this.window.add(back_button);
		this.window.add(again_text);
		this.window.add(back_text);
		this.window.x = this.game.camera.x+400-this.window.width/2;
		this.window.y = this.game.camera.y+300-this.window.height/2;

	},
	
		wonMenu: function(){
		this.won = true;
		this.window = this.game.add.group();
		this.window.fixedToCamera=true;
		var menu_bg = this.game.add.sprite(0,0,'menu_bg');
		//console.log("menu: ",menu_bg);
		// menu_bg.anchor.setTo(0.5, 0.5);
		var again_button = this.game.add.button(200,200, 'button', function (){this.game.state.start('play1'); }, this);
		var back_button = this.game.add.button(200, 250, 'button', function() {this.game.state.start('chooseStar');}, this);
		localStorage.setItem('planet2', 'unlocked');
		var continue_button = this.game.add.button(200,300, 'button', function () {this.game.state.start('play2');}, this);
		// ok_button.anchor.setTo(0.5,0.5);

		var again_text = this.game.add.bitmapText(200,200, 'font_black','again', 40);
		var back_text = this.game.add.bitmapText(200,250, 'font_black','back', 40);
		var continue_text = this.game.add.bitmapText(200,300, 'font_black','continue', 40);
		var enemyCount = JSON.parse(localStorage.getItem('enemyCount')).enemyCount;
		var gegner_text = this.game.add.text(200,350, 'Gegner:'+enemyCount+'/'+this.enemyNum, {font: '30px Arial', fill: '#fff'});
		var coin_text = this.game.add.text(200,400, 'Coin:'+this.coinCount+'/'+this.coinNum, {font: '30px Arial', fill: '#fff'});
		
		this.window.add(menu_bg);
		this.window.add(again_button);
		this.window.add(back_button);
		this.window.add(continue_button);
		this.window.add(again_text);
		this.window.add(back_text);
		this.window.add(continue_text);
		this.window.add(gegner_text);
		this.window.add(coin_text);
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
			
    },

    controllScrolling: function(){
    	if(this.avatar.facing == 'left') {
    		this.middleground.autoScroll(-10,0);
			//this.foreground.autoScroll(20,0);

    	}
    	else if( this.avatar.facing == 'right') {
    		this.middleground.autoScroll(10,0);
			//this.foreground.autoScroll(-20,0);

    	}
    	else if (this.avatar.facing == 'idle') {
    		this.middleground.autoScroll(0,0);
			//this.foreground.autoScroll(0,0);
    	}
    },

    getX: function(x){
    	return x*36 + 18;

    },
    
     getY: function(y){
    	return y*36 + 18;

    }

	
	
  };