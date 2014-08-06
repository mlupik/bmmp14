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
    //this.load.image('avatar1', '././assets/car.png');
    //this.load.image('avatar2', '././assets/car3.png');
    //this.load.image('arrow_r', '././assets/pfeil_rechts.png');
    //this.load.image('arrow_l', '././assets/pfeil_links.png');
    this.load.image('weltall', '././assets/backgrounds/hintergrundPlanetenAuswahl.jpg');
	  this.load.image('sternbild', '././assets/sb1_ohne.png');
	  //this.load.image('coin', '././assets/Star_Coin_small.png');



	  this.load.image('sternbild_hover', '././assets/sb1.png');
	  this.load.bitmapFont('font_white','././assets/font4.png', 'assets/font.xml');
	  //this.load.image('planet','././assets/planet.png');
	  //this.load.image('planet_hover','././assets/planet_hover.png');
	  //this.load.spritesheet('man','././assets/sprite3.png',59,100,16);
	  //this.load.spritesheet('enemy1_walk','././assets/enemys/enemy1_walk.png',64,64,16);
	  //this.load.spritesheet('enemy1_die','././assets/enemys/enemy1_die.png',64,64,16);
	  
	  //load avatar images
	   this.load.atlasXML('avatar_walk_left', 'assets/avatar/avatar_walk_left.png', 'assets/avatar/avatar_walk_left.xml');
     this.load.atlasXML('avatar_walk_right', 'assets/avatar/avatar_walk_right.png', 'assets/avatar/avatar_walk_right.xml');
     this.load.atlasXML('avatar_die', 'assets/avatar/spritesExplosion.png', 'assets/avatar/spritesExplosion.xml');
	  
	  
	  
	  //images collectables, status

    this.load.spritesheet('coin', '././assets/collectables/drop1.png',64,64,16);
    this.load.spritesheet('drop_lila', '././assets/collectables/drop2.png',64,64,16);
    this.load.spritesheet('drop_blau', '././assets/collectables/drop3.png',64,64,16);

    this.load.spritesheet('superpower', '././assets/collectables/box.png', 64,64,16);

    this.load.spritesheet('heart', '././assets/collectables/heart.png', 64,64,16);

    this.load.spritesheet('blitz', '././assets/collectables/speed.png', 64,64,16);

    this.load.image('pause_button', '././assets/status/pauseButton.png');


    //images menus
    //Eis
     this.load.image('menu_won_ice', '././assets/menu/Eis/ScreenGewonnenEis.jpg');
     this.load.image('menu_gameover_ice', '././assets/menu/Eis/ScreenVerlorenEis.jpg');
     this.load.image('menu_pause_ice', '././assets/menu/Eis/ScreenPauseEis.jpg');
     this.load.image('button_menu_ice', '././assets/menu/Eis/ButtonMenuEis.jpg');
     this.load.image('button_continue_ice', '././assets/menu/Eis/ButtonWeiterEis.jpg');
     this.load.image('button_again_ice', '././assets/menu/Eis/ButtonNochmalEis.jpg');

     //Tech
     this.load.image('menu_won_tech', '././assets/menu/Tech/ScreenGewonnenTech.jpg');
     this.load.image('menu_gameover_tech', '././assets/menu/Tech/ScreenVerlorenTech.jpg');
     this.load.image('menu_pause_tech', '././assets/menu/Tech/ScreenPauseTech.jpg');
     this.load.image('button_menu_tech', '././assets/menu/Tech/ButtonMenuTech.jpg');
     this.load.image('button_continue_tech', '././assets/menu/Tech/ButtonWeiterTech.jpg');
     this.load.image('button_again_tech', '././assets/menu/Tech/ButtonNochmalTech.jpg');

     //Abstrakt
     this.load.image('menu_won_abstrakt', '././assets/menu/Abstrakt/ScreenGewonnenAbstrakt.jpg');
     this.load.image('menu_gameover_abstrakt', '././assets/menu/Abstrakt/ScreenVerlorenAbstrakt.jpg');
     this.load.image('menu_pause_abstrakt', '././assets/menu/Abstrakt/ScreenPauseAbstrakt.jpg');
     this.load.image('button_menu_abstrakt', '././assets/menu/Abstrakt/ButtonMenuAbstrakt.jpg');
     this.load.image('button_continue_abstrakt', '././assets/menu/Abstrakt/ButtonWeiterAbstrakt.jpg');
     this.load.image('button_again_abstrakt', '././assets/menu/Abstrakt/ButtonNochmalAbstrakt.jpg');



	  //this.load.image('heart','././assets/heart.png');
	  //this.load.image('heart_grau','././assets/heart_grau.png');
	  //this.load.image('blitz','././assets/blitz.png');
	  this.load.spritesheet('blitz_icon','././assets/status/speedDisplay.png',64,64,2);
	  //this.load.image('superpower','././assets/box.png');
	  this.load.spritesheet('superpower_icon','././assets/status/handschuhDisplay.png',64,64,2);
	  this.load.image('reward','././assets/pokal.png');
	  this.load.spritesheet('hearts','././assets/status/statusHerzen.png',192,64,4);


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
    this.load.spritesheet('sprite_ice','././assets/planets/ice_planet.png',248,248,28);
    this.load.spritesheet('sprite_tech','././assets/planets/tech_planet.png',248,248,28);
    this.load.spritesheet('sprite_abstract','././assets/planets/abstract_planet.png',248,248,28);

    //this.load.image('sprite_ice','././assets/planets/planet_hover.png');
    //this.load.image('sprite_abstract','././assets/planets/planet_hover.png');
    //this.load.image('sprite_tech','././assets/planets/planet_hover.png');


    // this.load.atlasXML('sprite_ice', '././assets/planets/ice_planet.png', '././assets/planets/ice_planet.xml');
    // this.load.atlasXML('sprite_abstract', '././assets/planets/abstract_planet.png', '././assets/planets/abstract_planet.xml');
    // this.load.atlasXML('sprite_tech', '././assets/planets/tech_planet.png', '././assets/planets/tech_planet.xml');

    // this.load.spritesheet('sprite_ice','././assets/planets/ice_hiFps.png',248,248,28);
    // this.load.spritesheet('sprite_tech','././assets/planets/tech_hiFps.png',248,248,28);
    // this.load.spritesheet('sprite_abstract','././assets/planets/abstrakt_hiFps.png',248,248,28);


	  
	  // this.load.tilemap('map_dummy','././assets/tiling/dummy.json',null, Phaser.Tilemap.TILED_JSON);
	  // this.load.image('tileSet', '././assets/tileSet.png',128,128);
	  
	  // this.load.tilemap('map_dummy','././assets/tilemaps/tileMap_ice.json',null, Phaser.Tilemap.TILED_JSON);
	  // this.load.image('tileSet', '././assets/tilemaps/tileSet.png',36,36);
	  //this.load.image('bg_ice', '././assets/tilemaps/hintergrund.png');
	  
	  // this.load.tilemap('tech_map','././assets/tilemaps/tech/techplanetTilemap.json',null, Phaser.Tilemap.TILED_JSON);
	  // this.load.image('tileeinss', '././assets/tilemaps/tech/tileeinss.png',36,36);
	  // this.load.image('tilezwei', '././assets/tilemaps/tech/tilezwei.png',36,36);
	  
    this.load.tilemap('map_dummy','././assets/tilemaps/ice/ice_test_map2.json',null, Phaser.Tilemap.TILED_JSON);
    this.load.image('untergrund', '././assets/tilemaps/ice/untergrund.png',36,36);

	  
	  this.load.tilemap('ice_map','././assets/tilemaps/ice/icePlanetTilemap.json',null, Phaser.Tilemap.TILED_JSON);
	  this.load.image('zapfen1', '././assets/tilemaps/ice/zapfen1.png',36,36);
	  this.load.image('zapfen2', '././assets/tilemaps/ice/zapfen2.png',36,36);
	  this.load.image('zapfen3', '././assets/tilemaps/ice/zapfen3.png',36,36);
	  this.load.image('zapfen4', '././assets/tilemaps/ice/zapfen4.png',36,36);
	  this.load.image('zapfen5', '././assets/tilemaps/ice/zapfen5.png',36,36);
	  this.load.image('zapfen6', '././assets/tilemaps/ice/zapfen6.png',36,36);
	  this.load.image('zapfen7', '././assets/tilemaps/ice/zapfen7.png',36,36);
	  this.load.image('untergrund', '././assets/tilemaps/ice/untergrund.png',36,36);
	


    //load enemies
    this.load.spritesheet('enemy1_walk','././assets/enemys/enemy1_walk.png',64,64,16);
    this.load.spritesheet('enemy1_die','././assets/enemys/enemy1_die.png',64,64,16);

    this.load.spritesheet('enemy2_walk_right','././assets/enemys/enemy2_walk_right.png',64,64,16);
    this.load.spritesheet('enemy2_walk_left','././assets/enemys/enemy2_walk_left.png',64,64,16);
    this.load.spritesheet('enemy2_die_right','././assets/enemys/enemy2_die_right.png',64,64,16);
    this.load.spritesheet('enemy2_die_left','././assets/enemys/enemy2_die_left.png',64,64,16);

    this.load.spritesheet('enemy3_walk','././assets/enemys/enemy3_walk.png',64,64,16);
    this.load.spritesheet('enemy3_die','././assets/enemys/enemy3_die.png',64,64,16);


	  
	  
	  
      
      


    

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