 'use strict';
  function LoadingScreen() {
   this.asset = null;
    this.ready = false;

    localStorage.setItem('world',1);
    //localStorage.setItem('level',2);
  }

  LoadingScreen.prototype = {
    preload: function() {


    this.loading_timer = this.game.time.now + 5000;
      
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'progress');
    this.asset.anchor.setTo(0.5, 0.5); 
    this.asset.animations.add('loading', [0,1,2,7,8,14,15,9,16,3,10,4,17,11,5,6,12,18,19,13],10, true);
    this.asset.animations.play('loading');

    this.load.image('weltall', '././assets/backgrounds/hintergrundPlanetenAuswahl.jpg');
	this.load.image('sternbild', '././assets/sb1_ohne.png');




	  this.load.image('sternbild_hover', '././assets/sb1.png');
	  this.load.bitmapFont('font_white','././assets/font4.png', 'assets/font.xml');
	  
	  //load avatar images
	   this.load.atlasXML('avatar_walk_left', 'assets/avatar/avatar_walk_left.png', 'assets/avatar/avatar_walk_left.xml');
     this.load.atlasXML('avatar_walk_right', 'assets/avatar/avatar_walk_right.png', 'assets/avatar/avatar_walk_right.xml');
     this.load.atlasXML('avatar_die', 'assets/avatar/spritesExplosion.png', 'assets/avatar/spritesExplosion.xml');
	  
	  
	  
	  //images collectables, status

    this.load.spritesheet('drop_braun', '././assets/collectables/drop1.png',64,64,16);
    this.load.spritesheet('drop_lila', '././assets/collectables/drop2.png',64,64,16);
    this.load.spritesheet('drop_blau', '././assets/collectables/drop3.png',64,64,16);

    this.load.spritesheet('superpower', '././assets/collectables/box.png', 64,64,16);

    this.load.spritesheet('heart', '././assets/collectables/heart.png', 64,64,16);

    this.load.spritesheet('blitz', '././assets/collectables/speed.png', 64,64,16);

    this.load.spritesheet('raketeStatus', '././assets/status/statusShuttle.png',64 , 64, 5)

    this.load.image('pause_button', '././assets/status/pauseButton.png');

    this.load.image('rakete', '././assets/collectables/shipUpgrade.png');


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


	//Powerup collectables
	  this.load.spritesheet('blitz_icon','././assets/status/speedDisplay.png',64,64,2);
	  this.load.spritesheet('superpower_icon','././assets/status/handschuhDisplay.png',64,64,2);
	  this.load.image('reward','././assets/pokal.png');
	  this.load.spritesheet('hearts','././assets/status/statusHerzen.png',192,64,4);

    this.load.spritesheet('shuttle','././assets/collectables/fullLifeReady.png',144,144,5);


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



		//tilemap tech 
	  this.load.tilemap('tech_map','././assets/tilemaps/tech/tech_map1.json',null, Phaser.Tilemap.TILED_JSON);
	  this.load.image('tileeinss', '././assets/tilemaps/tech/tileeinss.png',36,36);
	  this.load.image('tilezwei', '././assets/tilemaps/tech/tilezwei.png',36,36);
	//tilemap abstract
	 this.load.tilemap('abstract_map','././assets/tilemaps/abstract/abstract_map1.json',null, Phaser.Tilemap.TILED_JSON);
	  this.load.image('kugel', '././assets/tilemaps/abstract/kugel.png',36,36);
	  this.load.image('kugelklein', '././assets/tilemaps/abstract/kugelklein.png',36,36);
	  this.load.image('ununtergrund', '././assets/tilemaps/abstract/ununtergrund.png',36,36);
	  
	  this.load.tilemap('ice_map','././assets/tilemaps/ice/ice_map1.json',null, Phaser.Tilemap.TILED_JSON);
	  this.load.image('tielSetIce1Layer', '././assets/tilemaps/ice/tielSetIce1Layer.png',36,36);


    //load enemies
    //bird
    this.load.spritesheet('enemy1_walk_left','././assets/enemys/enemy1_walk_left.png',64,64,16);
    this.load.spritesheet('enemy1_die_left','././assets/enemys/enemy1_die_left.png',64,64,16);
     this.load.spritesheet('enemy1_walk_right','././assets/enemys/enemy1_walk_right.png',64,64,16);
    this.load.spritesheet('enemy1_die_right','././assets/enemys/enemy1_die_right.png',64,64,16);
    //tech
    this.load.spritesheet('enemy2_walk_right','././assets/enemys/enemy2_walk_right.png',64,64,16);
    this.load.spritesheet('enemy2_walk_left','././assets/enemys/enemy2_walk_left.png',64,64,16);
    this.load.spritesheet('enemy2_die_right','././assets/enemys/enemy2_die_right.png',64,64,16);
    this.load.spritesheet('enemy2_die_left','././assets/enemys/enemy2_die_left.png',64,64,16);
    //eye
    this.load.spritesheet('enemy3_walk','././assets/enemys/enemy3_walk.png',64,64,16);
    this.load.spritesheet('enemy3_die','././assets/enemys/enemy3_die.png',64,64,16);


    //storyBilder
    this.load.image('absturzAbstrakt', '././assets/storyBilder/absturzAbstrakt.png');
    this.load.image('absturzEis', '././assets/storyBilder/absturzEis.png');
    this.load.image('absturzTech', '././assets/storyBilder/absturzTech.png');
    this.load.image('flug', '././assets/storyBilder/flug.png');


    //sounds
    this.load.audio('abstractEnemyDie', "././assets/sounds/abstractEnemyDie.mp3");
    this.load.audio('iceEnemyDie', "././assets/sounds/iceEnemyDie.mp3");
    this.load.audio('techEnemyDie', "././assets/sounds/techEnemyDie.wav");
    this.load.audio('collectOil', "././assets/sounds/collectOil.wav");
    this.load.audio('collectPowerUp', "././assets/sounds/collectPowerUp.mp3");
    this.load.audio('iceAtmo', "././assets/sounds/iceAtmo.mp3");
    this.load.audio('techAtmo', "././assets/sounds/techAtmo.mp3");
    this.load.audio('abstractAtmo', "././assets/sounds/abstractAtmo.mp3");
    this.load.audio('jumpOnEnemy', "././assets/sounds/jumpOnEnemy.mp3");
    this.load.audio('menuAtmo', "././assets/sounds/menuAtmo.mp3");
    this.load.audio('playerDies', "././assets/sounds/playerDies.mp3");
    this.load.audio('playerHurt', "././assets/sounds/playerHurt.mp3");
    this.load.audio('storyFlugUndCrash', "././assets/sounds/storyFlugUndCrash.mp3");
    this.load.audio('error', "././assets/sounds/error.mp3");
    this.load.audio('win', "././assets/sounds/win.mp3");

    },
    create: function() {
      this.asset.cropEnabled = false;
    },
    update: function() {
      if(!!this.ready && this.loading_timer < this.game.time.now) {
        this.asset.animations.stop();
        // this.game.state.start('chooseAvatar');

		this.game.state.start('chooseStar');

    //this.game.state.start('storyLevel1');
      }
    },
    onLoadComplete: function() {
      this.ready = true;
      
    }
  };