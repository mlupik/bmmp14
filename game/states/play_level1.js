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

    	this.bg_sound = this.game.add.audio('iceAtmo', 0.2, true).play();  

		var avdat = JSON.parse(localStorage.getItem("avatarData"));
		avdat.hearts = 3;
		avdat.points = 0;
		this.partsMax = 4;
		this.partsCount = 0;
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
		this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR,Phaser.Keyboard.ESC]);
		this.escapeKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
	
    },
    
    update: function() {
		this.checkKeys();
		this.controllScrolling();
		this.enemGroup.forEach(this.moveEnemies,this);
		if(!(this.game.pause || this.gameOver || this.won) && this.window){
			this.window.destroy();
		}
		if(!this.avatar.alive && !this.gameOver){
			console.log("avatar dead");
			this.gameOverMenu();
		}
		this.updateStatusBar(); 
    },
	 checkKeys: function() {
		//Tastaturereignisse abfragen und ensprechende Funktion aufrufen
		if(this.cursors.left.isDown){
			this.avatar.moveLeft();
		}else if(this.cursors.right.isDown){
			this.avatar.moveRight();
		}else {
			this.avatar.stopMove();
		}

		if(this.spacebar.isDown){
			this.avatar.jump();
	} 
		if(this.escapeKey.isDown){
			this.bg_sound.stop();
			this.game.state.start('chooseStar');	} 
	
  },
	
	//World 1, Level 1
	setupLevel: function() {
		//Hintergrund
		this.background = this.game.add.sprite(0,0,'hintergrund1');
		this.middleground = this.game.add.tileSprite(0,0,4788,900, 'mittelgrund1');
		this.foreground = this.game.add.tileSprite(0,0, 4788,900,'vordergrund1');
		//Tilemap
		this.map = this.game.add.tilemap('ice_map');
		this.map.addTilesetImage('tielSetIce1Layer');
		this.layer = this.map.createLayer("Kachelebene 1");
		this.layer.resizeWorld();
		this.map.setCollisionBetween(0,100);
		//Define CollisionGroups
		this.avatarCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.enemyCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.collectableCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.tilemapCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.goalCollisionGroup = this.game.physics.p2.createCollisionGroup();
		//convert every collision tile into an game object an add it to a collisiongroup
		var tiles = this.game.physics.p2.convertTilemap(this.map, this.layer,true);
		 for(var tile in tiles)
		  {
			tiles[tile].setCollisionGroup(this.tilemapCollisionGroup);
			tiles[tile].collides([this.goalCollisionGroup,this.avatarCollisionGroup,this.enemyCollisionGroup,this.collectableCollisionGroup]);
		 }		
		this.game.physics.p2.restitution = 0.1;
		this.game.physics.p2.gravity.y = 400;
		this.game.physics.p2.setImpactEvents(true);
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
		//Collisions avatar
		this.avatar.body.setCollisionGroup(this.avatarCollisionGroup);
		this.avatar.body.collides(this.enemyCollisionGroup,this.meetEnemy,this);
		this.avatar.body.collides(this.collectableCollisionGroup,this.collect,this);
		this.avatar.body.collides([this.tilemapCollisionGroup,this.tilemapCollisionGroup], this.touchedFloor,this);
		this.avatar.body.collides(this.goalCollisionGroup, this.touchedGoal,this);
		//set up Statusbar
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
			this.goal = this.game.add.sprite(this.getX(129),this.getY(11),'shuttle');
			this.goal.frame = 0;
			this.game.physics.p2.enable(this.goal);
  			this.goal.body.collideWorldBounds = true;
  			this.goal.body.fixedRotation = true;
  			this.goal.static = true;
  			this.goal.body.static = true;
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
			var frameNum = this.goal.frame;
			this.goal.frame = frameNum +1;
		}
		coin.sprite.collect();
	},

	touchedGoal: function(){
		if(this.partsCount<this.partsMax){
			this.game.add.audio('error', 1, false).play();  
		//nothing happens until all space shuttle parts are collected
		}else{
			this.game.add.audio('win',1,false).play();
			this.wonMenu();
		}

	},
	
	meetEnemy: function(avatar, enemy){
		var onTop = (enemy.sprite.y - avatar.sprite.y) >= avatar.sprite.height/2;
		// console.log("onTop",onTop);	
		if(onTop){
			if(avatar.sprite.immortal){
				this.game.add.audio('iceEnemyDie',1,false).play();
				enemy.sprite.die();
			}else{
				enemy.sprite.hurt();
			}
			avatar.sprite.hitEnemy();
		}else{
			if(avatar.sprite.immortal){
				this.game.add.audio('iceEnemyDie',1,false).play();
				enemy.sprite.die();
				avatar.sprite.hitEnemy();
			}else{
			avatar.sprite.hurt();
			}
		}		
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
			this.statusBar = this.game.add.group();
			this.point_text = this.game.add.bitmapText(400,0, 'font_black',this.points.toString(), 30);
			this.name_text = this.game.add.bitmapText(0,0, 'font_black',data.name, 30);

			this.pauseButton = this.game.add.button(700,0, 'pause_button',this.pauseMenu,this);
				
			this.statusBar.add(this.point_text);
			this.statusBar.add(this.name_text);
			this.statusBar.add(this.hearts_img);
			this.statusBar.add(this.parts_img);
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
		}
	},
	
	pauseMenu: function(){
		if(!(this.gameOver ||  this.won)){
			this.pause();
			this.window = this.game.add.group();
			var menu_bg = this.game.add.sprite(0,0,'menu_pause_ice');
			var continue_button = this.game.add.sprite(240,220, 'button_continue_ice');
			this.window.add(menu_bg);
			this.window.add(continue_button);
			this.window.x = this.game.camera.x+400-this.window.width/2;
			this.window.y = this.game.camera.y+300-this.window.height/2;
		}

	},
	
	
	gameOverMenu: function(){
		if(!this.won){

			this.bg_sound.stop();
			this.gameOver = true;
			this.game.camera.unfollow();
			this.window = this.game.add.group();
			var menu_bg = this.game.add.sprite(0,0,'menu_gameover_ice');
			var again_button = this.game.add.button(180,220, 'button_again_ice', function (){this.game.state.start('play1'); }, this);
			var menu_button = this.game.add.button(310, 220, 'button_menu_ice', function() {this.game.state.start('chooseStar');}, this);
			this.window.add(menu_bg);
			this.window.add(again_button);
			this.window.add(menu_button);

			this.window.x = this.game.camera.x+400-this.window.width/2;
			this.window.y = this.game.camera.y+300-this.window.height/2;
		}
		
	},
	
		wonMenu: function(){
			if(!this.gameOver){
				this.bg_sound.stop();
				this.won = true;
				this.window = this.game.add.group();
				var menu_bg = this.game.add.sprite(0,0,'menu_won_ice');
				var again_button = this.game.add.button(100,330, 'button_again_ice', function (){this.game.state.start('play1'); }, this);
				var menu_button = this.game.add.button(240, 330, 'button_menu_ice', function() {this.game.state.start('chooseStar');}, this);

				var enemyCount = JSON.parse(localStorage.getItem('enemyCount')).enemyCount;
				var teile_text = this.game.add.text(200, 330, 'Raketenteile:'+this.partsCount+'/'+this.partsMax, {font: '30px Arial', fill: '#0000'});
				var gegner_text = this.game.add.text(200,230, 'Gegner:'+enemyCount+'/'+this.enemyNum, {font: '30px Arial', fill: '#0000'});
				var coin_text = this.game.add.text(200,280, 'Coin:'+this.coinCount+'/'+this.coinNum, {font: '30px Arial', fill: '#0000'});
				
				this.window.add(menu_bg);
				this.window.add(again_button);
				this.window.add(menu_button);
				
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
    	}
    	else if( this.avatar.facing == 'right') {
    		this.middleground.autoScroll(10,0);
    	}
    	else if (this.avatar.facing == 'idle') {
    		this.middleground.autoScroll(0,0);
    	}
    },

    getX: function(x){
    	return x*36 + 18;

    },
    
     getY: function(y){
    	return y*36 + 18;

    }
	
	

	
	
  };