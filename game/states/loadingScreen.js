 'use strict';
  function LoadingScreen() {
   this.asset = null;
    this.ready = false;

    localStorage.setItem('world',1);
    //localStorage.setItem('level',2);
  }

  LoadingScreen.prototype = {
    preload: function() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.width/2,this.height/2, 'progress');
    this.asset.anchor.setTo(0.5, 0.5);      
    this.load.setPreloadSprite(this.asset);
    //load everything
    this.load.image('avatar1', '././assets/car.png');
    this.load.image('avatar2', '././assets/car3.png');
    this.load.image('arrow_r', '././assets/pfeil_rechts.png');
    this.load.image('arrow_l', '././assets/pfeil_links.png');
	  this.load.image('weltall', '././assets/gruen.png');
	  this.load.image('sternbild', '././assets/sb1_ohne.png');
	  this.load.image('coin', '././assets/Star_Coin_small.png');
	  this.load.image('sternbild_hover', '././assets/sb1.png');
	  this.load.bitmapFont('font_white','././assets/font4.png', 'assets/font.xml');
	  this.load.image('planet','././assets/planet.png');
	  this.load.image('planet_hover','././assets/planet_hover.png');
	  this.load.spritesheet('man','././assets/sprite3.png',59,100,16);
	  //this.load.spritesheet('enemy1_walk','././assets/enemys/enemy1_walk.png',64,64,16);
	  //this.load.spritesheet('enemy1_die','././assets/enemys/enemy1_die.png',64,64,16);
	  
	  //load avatar images
	   this.load.atlasXML('avatar_walk_left', 'assets/avatar/avatar_walk_left.png', 'assets/avatar/avatar_walk_left.xml');
	  
	  
	  
	  //images collectables
	  this.load.image('heart','././assets/heart.png');
	  this.load.image('heart_grau','././assets/heart_grau.png');
	  this.load.image('blitz','././assets/blitz.png');
	  this.load.spritesheet('blitz_icon','././assets/blitzsheet.png',30,59,2);
	  this.load.image('superpower','././assets/box.png');
	  this.load.spritesheet('superpower_icon','././assets/boxsheet.png',40,33,2);
	  this.load.image('reward','././assets/pokal.png');
	  this.load.spritesheet('hearts','././assets/hearts.png',90,28,4);


    //backgrounds für level
    this.load.image('hintergrund1', '././assets/backgrounds/hintergrund_1.jpg');
    this.load.image('hintergrund2', '././assets/backgrounds/hintergrund_2.jpg');
    this.load.image('hintergrund3', '././assets/backgrounds/hintergrund_3.jpg');
	  
    this.load.image('mittelgrund1', '././assets/backgrounds/mittelgrund_1.png');
    this.load.image('mittelgrund2', '././assets/backgrounds/mittelgrund_2.png');
    this.load.image('mittelgrund3', '././assets/backgrounds/mittelgrund_3.png');

    this.load.image('vordergrund1', '././assets/backgrounds/vordergrund_1.png');
    this.load.image('vordergrund2', '././assets/backgrounds/vordergrund_2.png');
    this.load.image('vordergrund3', '././assets/backgrounds/vordergrund_3.png');

    //spritesheets für Planeten
    this.load.spritesheet('sprite_ice','././assets/planets/ice_planet.png',248,248,16);
    this.load.spritesheet('sprite_tech','././assets/planets/tech_planet.png',248,248,16);
    this.load.spritesheet('sprite_abstract','././assets/planets/abstract_planet.png',248,248,16);


	  
	  // this.load.tilemap('map_dummy','././assets/tiling/dummy.json',null, Phaser.Tilemap.TILED_JSON);
	  // this.load.image('tileSet', '././assets/tileSet.png',128,128);
	  
	  this.load.tilemap('map_dummy','././assets/tilemaps/tileMap_ice.json',null, Phaser.Tilemap.TILED_JSON);
	  this.load.image('tileSet', '././assets/tilemaps/tileSet.png',36,36);
	  this.load.image('bg_ice', '././assets/tilemaps/hintergrund.png');


    //load enemies
    this.load.spritesheet('enemy1_walk','././assets/enemys/enemy1_walk.png',64,64,16);
    this.load.spritesheet('enemy1_die','././assets/enemys/enemy1_die.png',64,64,16);

    this.load.spritesheet('enemy2_walk_right','././assets/enemys/enemy2_walk_right.png',64,64,16);
    this.load.spritesheet('enemy2_walk_left','././assets/enemys/enemy2_walk_left.png',64,64,16);
    this.load.spritesheet('enemy2_die_right','././assets/enemys/enemy2_die_right.png',64,64,16);
    this.load.spritesheet('enemy2_die_left','././assets/enemys/enemy2_die_left.png',64,64,16);

    this.load.spritesheet('enemy3_walk','././assets/enemys/enemy3_walk.png',64,64,16);
    this.load.spritesheet('enemy3_die','././assets/enemys/enemy3_die.png',64,64,16);


	  
	  
	  this.load.image('pause_button', '././assets/pause.png');
      
      


    

    },
    create: function() {
      this.asset.cropEnabled = false;
    },
    update: function() {
      if(!!this.ready) {
        // this.game.state.start('chooseAvatar');
		this.game.state.start('chooseStar');
      }
    },
    onLoadComplete: function() {
      this.ready = true;
    }
  };