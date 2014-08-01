 'use strict';
  function LoadingScreen() {
   this.asset = null;
    this.ready = false;
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
	  this.load.image('weltall', '././assets/weltall.jpg');
	  this.load.image('sternbild', '././assets/sb1_ohne.png');
	  this.load.image('coin', '././assets/Star_Coin_small.png');
	  this.load.image('sternbild_hover', '././assets/sb1.png');
	  this.load.bitmapFont('font_white','././assets/font4.png', 'assets/font.xml');
	  this.load.image('planet','././assets/planet.png');
	  this.load.image('planet_hover','././assets/planet_hover.png');
	  this.load.spritesheet('man','././assets/sprite2.png',59,100,8);
	  this.load.spritesheet('enemy','././assets/enemy.png',64,64,16);
	   this.load.image('heart','././assets/heart.png');
	  
	  
	  	this.load.tilemap('map_dummy','././assets/tiling/dummy.json',null, Phaser.Tilemap.TILED_JSON);
	  this.load.image('tileSet', '././assets/tiling/tileSet.png',128,128);
      
      


    

    },
    create: function() {
      this.asset.cropEnabled = false;
    },
    update: function() {
      if(!!this.ready) {
        // this.game.state.start('chooseAvatar');
		this.game.state.start('play');
      }
    },
    onLoadComplete: function() {
      this.ready = true;
    }
  };