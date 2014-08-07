 'use strict';
  function Play1() {
  this.moving = false;
  this.enemyNum = 6;
  this.coinNum = 18; 
 
	

	

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

		this.partsMax = 4;
		this.partsCount = 0;
		
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
		
		//Tilemap

		this.map = this.game.add.tilemap('ice_map');
		this.map.addTilesetImage('tielSetIce1Layer');
		
		//this.map = this.game.add.tilemap('ice_map');

		// this.map.addTilesetImage('untergrund');
		// this.map.addTilesetImage('zapfen1');
		// this.map.addTilesetImage('zapfen2');
		// this.map.addTilesetImage('zapfen3');
		// this.map.addTilesetImage('zapfen4');
		// this.map.addTilesetImage('zapfen5');
		// this.map.addTilesetImage('zapfen6');
		// this.map.addTilesetImage('zapfen7');
		//if you use 'collide' function with the layer, then the tiles from the list will
		//collide with the given sprite

		this.layer = this.map.createLayer("Kachelebene 1");
		// this.layer = this.map.createLayer("Kachelebene 1");
		//this.layer2 = this.map.createLayer("Kachelebene 2");
		// this.layer3 = this.map.createLayer("Kachelebene 3");

		//this.layer.debug = true;
		//this.layer2.debug = true;
		//this.bg_layer = this.map.createLayer("Bildebene 1");
		this.layer.resizeWorld();
		//this.layer2.resizeWorld();
		//this.layer3.resizeWorld();
		//this.bg_layer.resizeWorld();
		
		this.map.setCollisionBetween(0,100);
		//Define CollisionGroups
		this.avatarCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.enemyCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.collectableCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.tilemapCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.tilemapCollisionGroup2 = this.game.physics.p2.createCollisionGroup();
		this.goalCollisionGroup = this.game.physics.p2.createCollisionGroup();
		// this.worldCollisionGroup = this.game.physics.p2.boundsCollisionGroup
		
		var tiles = this.game.physics.p2.convertTilemap(this.map, this.layer,true);
		 for(var tile in tiles)
		  {
			tiles[tile].setCollisionGroup(this.tilemapCollisionGroup);
			tiles[tile].collides([this.goalCollisionGroup,this.avatarCollisionGroup,this.enemyCollisionGroup,this.collectableCollisionGroup]);
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
		this.avatar = new Avatar(this.game,this.getX(3),this.getY(23),'avatar_walk_right');
		this.game.add.existing(this.avatar);
		this.game.camera.follow(this.avatar);
		this.collGroup = this.game.add.group();
		this.enemGroup = this.game.add.group();
		this.setupCoins1_1();
		this.setupHearts1_1();
		this.setupEnemies1_1();
		this.setupLightning1_1();
		this.setupSuperPower1_1();
		this.setupParts1_1();
		this.setupGoal1_1();
		//collisions avatar
		this.avatar.body.setCollisionGroup(this.avatarCollisionGroup);
		this.avatar.body.collides(this.enemyCollisionGroup,this.meetEnemy,this);
		this.avatar.body.collides(this.collectableCollisionGroup,this.collect,this);
		this.avatar.body.collides([this.tilemapCollisionGroup,this.tilemapCollisionGroup], this.touchedFloor,this);
		this.avatar.body.collides(this.goalCollisionGroup, this.touchedGoal,this);
		
		// this.worldCollisionGroup.forEach.collides(this.avatarCollisionGroup);
		// this.game.physics.p2.boundsCollidesWith = [this.avatarCollisionGroup,this.enemyCollisionGroup];
		// this.avatar.body.collides(this.worldCollisionGroup);
		this.setupStatusBar();	
	
	},
	
	setupCoins1_1: function(){
	

			this.coinArray = new Array();
			var coin1 = new Collectable(this.game,this.getX(72),this.getY(7),'drop_blau', 'coin');
			var coin2 = new Collectable(this.game,this.getX(77),this.getY(4),'drop_blau', 'coin');
			var coin3 = new Collectable(this.game,this.getX(82),this.getY(2),'drop_blau', 'coin');
			var coin4 = new Collectable(this.game,this.getX(55),this.getY(13),'drop_blau', 'coin');
			var coin5 = new Collectable(this.game,this.getX(99),this.getY(4),'drop_blau', 'coin');
			var coin6 = new Collectable(this.game,this.getX(100),this.getY(7),'drop_blau', 'coin');
			var coin7 = new Collectable(this.game,this.getX(99),this.getY(10), 'drop_blau', 'coin');
			var coin8 = new Collectable(this.game,this.getX(125),this.getY(18), 'drop_blau', 'coin');
			var coin9 = new Collectable(this.game,this.getX(129),this.getY(18),'drop_blau','coin');
			var coin10 = new Collectable(this.game,this.getX(18),this.getY(5), 'drop_blau', 'coin');
			var coin11 = new Collectable(this.game,this.getX(22),this.getY(3), 'drop_blau', 'coin');
			var coin12 = new Collectable(this.game,this.getX(27),this.getY(4),'drop_blau','coin');
			var coin13 = new Collectable(this.game,this.getX(31),this.getY(18),'drop_blau','coin');
			var coin14 = new Collectable(this.game,this.getX(113),this.getY(18), 'drop_blau', 'coin');
			var coin15 = new Collectable(this.game,this.getX(113),this.getY(14), 'drop_blau', 'coin');
			var coin16 = new Collectable(this.game,this.getX(113),this.getY(10),'drop_blau','coin');
			var coin17 = new Collectable(this.game,this.getX(83),this.getY(12),'drop_blau','coin');
			var coin18 = new Collectable(this.game,this.getX(86),this.getY(12),'drop_blau','coin');


			this.coinArray.push(coin1);
			this.coinArray.push(coin2);
			this.coinArray.push(coin3);
			this.coinArray.push(coin4);
			this.coinArray.push(coin5);
			this.coinArray.push(coin6);
			this.coinArray.push(coin7);
			this.coinArray.push(coin8);
			this.coinArray.push(coin9);
			this.coinArray.push(coin10);
			this.coinArray.push(coin11);
			this.coinArray.push(coin12);
			this.coinArray.push(coin13);
			this.coinArray.push(coin14);
			this.coinArray.push(coin15);
			this.coinArray.push(coin16);
			this.coinArray.push(coin17);
			this.coinArray.push(coin18);

		for(var i = 0; i<this.coinArray.length; i++){
			this.game.add.existing(this.coinArray[i]);
			this.collGroup.add(this.coinArray[i]);	
			this.coinArray[i].body.setCollisionGroup(this.collectableCollisionGroup);
			this.coinArray[i].body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);
		}	

		

	
		
	},
	
		setupHearts1_1: function(){

			var heart = new Collectable(this.game,this.getX(1),this.getY(2),'heart','heart');

			this.game.add.existing(heart);
			this.collGroup.add(heart);
			heart.body.setCollisionGroup(this.collectableCollisionGroup);
			heart.body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);
		
		
	},
	
		setupLightning1_1: function(){

			var lightning = new Collectable(this.game, this.getX(40), this.getY(2), 'blitz', 'lightning');

			this.game.add.existing(lightning);
			this.collGroup.add(lightning);
			lightning.body.setCollisionGroup(this.collectableCollisionGroup);
			lightning.body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);
		
	},
	
		setupSuperPower1_1: function(){

			var superPower = new Collectable(this.game,this.getX(79),this.getY(19),'superpower','superpower');
		
			this.game.add.existing(superPower);
			this.collGroup.add(superPower);
			superPower.body.setCollisionGroup(this.collectableCollisionGroup);
			superPower.body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);
		
	},
	
	
	setupEnemies1_1: function(){
			this.enemyArray = new Array();
			var enemy1 = new Enemy(this.game,this.getX(128),this.getY(3),3,100,3,'enemy1_walk_right','bird');
			var enemy2 = new Enemy(this.game,this.getX(48),this.getY(23),8,100,3,'enemy1_walk_right','bird');
			var enemy3 = new Enemy(this.game,this.getX(4),this.getY(17),5,100,3,'enemy1_walk_right','bird');
			var enemy4 = new Enemy(this.game,this.getX(33),this.getY(10),3,100,3,'enemy1_walk_right','bird');
			var enemy5 = new Enemy(this.game,this.getX(68),this.getY(14),4,100,3,'enemy1_walk_right','bird');
			var enemy6 = new Enemy(this.game,this.getX(100),this.getY(23),10,100,3,'enemy1_walk_right','bird');
			this.enemyArray.push(enemy1);
			this.enemyArray.push(enemy2);
			this.enemyArray.push(enemy3);
			this.enemyArray.push(enemy4);
			this.enemyArray.push(enemy5);
			this.enemyArray.push(enemy6);

		for(var i = 0; i<this.enemyArray.length; i++){
			this.game.add.existing(this.enemyArray[i]);
			this.enemGroup.add(this.enemyArray[i]);	
			this.enemyArray[i].body.setCollisionGroup(this.enemyCollisionGroup);
			this.enemyArray[i].body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);
		}	
	},
	

	setupParts1_1: function(){
			this.partsArray = new Array();
			var part1 = new Collectable(this.game,this.getX(86),this.getY(2),'rakete','part');
			var part2 = new Collectable(this.game,this.getX(41),this.getY(22),'rakete','part');
			var part3 = new Collectable(this.game,this.getX(100),this.getY(14),'rakete','part');
			var part4 = new Collectable(this.game,this.getX(131),this.getY(3),'rakete','part');
			this.partsArray.push(part1);
			this.partsArray.push(part2);
			this.partsArray.push(part3);
			this.partsArray.push(part4);
			for(var i = 0; i<this.partsArray.length; i++){
				this.game.add.existing(this.partsArray[i]);
				this.collGroup.add(this.partsArray[i]);	
				this.partsArray[i].body.setCollisionGroup(this.collectableCollisionGroup);
				this.partsArray[i].body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);	
			}
	},

	setupGoal1_1: function(){
			this.goal = this.game.add.sprite(this.getX(130),this.getY(15),'superpower');
			this.game.physics.p2.enable(this.goal);
  			this.goal.body.collideWorldBounds = true;
  			this.goal.body.fixedRotation = true;
			this.goal.body.setCollisionGroup(this.goalCollisionGroup);
			this.goal.body.collides([this.avatarCollisionGroup,this.tilemapCollisionGroup]);	
	},
	
	collect: function(avatar, coin){
		coin.clearCollision(true);
		if(coin.sprite.type == 'lightning'){
			avatar.sprite.speedUp();
		}else if(coin.sprite.type == 'superpower'){
			avatar.sprite.superPower();
			
			
		} else if (coin.sprite.type == 'coin') {
			this.coinCount +=1;
		}else if(coin.sprite.type == 'part'){
			this.partsCount += 1;
		}
		coin.sprite.collect();
		// this.updateStatusBar();
	
	},

	touchedGoal: function(){
		if(this.partsCount<this.partsMax){
			this.gameOverMenu();
		}else{
			this.wonMenu();
		}

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
			this.lightning_img = this.game.add.sprite(200,0,'blitz_icon');
			this.lightning_img.frame = 0;
			this.superpower_img = this.game.add.sprite(280,0,'superpower_icon');
			this.superpower_img.frame = 0;

			this.parts_img = this.game.add.sprite(100,0,'raketeStatus');
			this.parts_img.frame = 0;

			this.points = data.points;
			// console.log("points:",this.points);
			// console.log("hearts:",this.hearts);
			this.statusBar = this.game.add.group();
			this.point_text = this.game.add.bitmapText(400,0, 'font_black',this.points.toString(), 30);
			this.name_text = this.game.add.bitmapText(0,0, 'font_black',data.name, 30);

			//this.parts_text = this.game.add.bitmapText(100,0, 'font_black', this.partsCount+'/'+this.partsMax, 30);

			this.pauseButton = this.game.add.button(700,0, 'pause_button',this.pauseMenu,this);
				
			this.statusBar.add(this.point_text);
			this.statusBar.add(this.name_text);
			//this.statusBar.add(this.parts_text);
			this.statusBar.add(this.hearts_img);
			this.statusBar.add(this.parts_img);
			//this.statusBar.add(this.pauseButton);
			this.statusBar.add(this.lightning_img);
			this.statusBar.add(this.superpower_img);
			this.statusBar.x = 20;
			this.statusBar.y = 10;
			this.statusBar.fixedToCamera = true;


			this.pauseBar = this.game.add.group();
			this.pauseBar.x = 20;
			this.pauseBar.y = 520;
			this.pauseBar.fixedToCamera = true;
			this.pauseBar.add(this.pauseButton);
		
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
			switch(this.partsCount){
				case 0: this.parts_img.frame = 0;
				break;
				case 1: this.parts_img.frame = 1;
				break;
				case 2: this.parts_img.frame = 2;
				break;
				case 3: this.parts_img.frame = 3;
				break;
				case 4: this.parts_img.frame = 4;
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
			//this.parts_text.text = this.partsCount+'/'+this.partsMax;
		}
	},
	
	pauseMenu: function(){
		if(!(this.gameOver ||  this.won)){
			this.pause();
			this.window = this.game.add.group();
			//this.window.fixedToCamera=true;
			var menu_bg = this.game.add.sprite(0,0,'menu_pause_ice');
			
			// menu_bg.anchor.setTo(0.5, 0.5);
			var continue_button = this.game.add.sprite(240,220, 'button_continue_ice');
			//var menu_button = this.game.add.sprite(310,220, 'button_menu_ice');
			// ok_button.anchor.setTo(0.5,0.5);

			this.window.add(menu_bg);
			//this.window.add(menu_button);
			this.window.add(continue_button);
			this.window.x = this.game.camera.x+400-this.window.width/2;
			this.window.y = this.game.camera.y+300-this.window.height/2;
		}

	},
	
	
	gameOverMenu: function(){
		if(!this.won){
			this.gameOver = true;
			this.game.camera.unfollow();
			this.window = this.game.add.group();
			//this.window.fixedToCamera=true;
			var menu_bg = this.game.add.sprite(0,0,'menu_gameover_ice');
			
			//menu_bg.anchor.setTo(0.5, 0.5);
			var again_button = this.game.add.button(180,220, 'button_again_ice', function (){this.game.state.start('play1'); }, this);
			var menu_button = this.game.add.button(310, 220, 'button_menu_ice', function() {this.game.state.start('chooseStar');}, this);
			// ok_button.anchor.setTo(0.5,0.5);

			this.window.add(menu_bg);
			this.window.add(again_button);
			this.window.add(menu_button);

			this.window.x = this.game.camera.x+400-this.window.width/2;
			this.window.y = this.game.camera.y+300-this.window.height/2;
		}
		
	},
	
		wonMenu: function(){
			if(!this.gameOver){
				this.won = true;
				this.window = this.game.add.group();
				//this.window.fixedToCamera=true;
				var menu_bg = this.game.add.sprite(0,0,'menu_won_ice');
				//console.log("menu: ",menu_bg);
				// menu_bg.anchor.setTo(0.5, 0.5);
				var again_button = this.game.add.button(100,330, 'button_again_ice', function (){this.game.state.start('play1'); }, this);
				var menu_button = this.game.add.button(240, 330, 'button_menu_ice', function() {this.game.state.start('chooseStar');}, this);
				var continue_button = this.game.add.button(380,330, 'button_continue_ice', function (){this.game.state.start('play2'); }, this);
				
				// ok_button.anchor.setTo(0.5,0.5);

				
				var enemyCount = JSON.parse(localStorage.getItem('enemyCount')).enemyCount;
				var teile_text = this.game.add.text(200, 180, 'Raketenteile:'+this.partsCount+'/'+this.partsMax, {font: '30px Arial', fill: '#0000'});
				var gegner_text = this.game.add.text(200,230, 'Gegner:'+enemyCount+'/'+this.enemyNum, {font: '30px Arial', fill: '#0000'});
				var coin_text = this.game.add.text(200,280, 'Coin:'+this.coinCount+'/'+this.coinNum, {font: '30px Arial', fill: '#0000'});
				
				this.window.add(menu_bg);
				this.window.add(again_button);
				this.window.add(menu_button);
				this.window.add(continue_button);
				
				this.window.add(teile_text);
				this.window.add(gegner_text);
				this.window.add(coin_text);
				
				this.window.x = this.game.camera.x+300-this.window.height/2;
				this.window.y = this.game.camera.y+300-this.window.height/2;
			}


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