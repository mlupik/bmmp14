 'use strict';
  function StartScreen() {

  }

  StartScreen.prototype = {
    preload: function() {
      //load images for the startScreen only
      this.load.image('menu_bg', '././assets/menu/Start/startBildschrim.jpg');
      this.load.image('button', '././assets/menu/Start/ButtonStart.png');
      this.load.bitmapFont('font_black','././assets/font3.png', 'assets/font.xml');

      //load animation of progressbar for the loadingScreen
      this.load.image('progress','././assets/progressbar.gif');
    },

    create: function() {
      //just some test images for navigation
      this.menu_bg = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'menu_bg');
      this.menu_bg.anchor.setTo(0.5, 0.5);

      this.ok_button = this.game.add.button(this.game.world.centerX,this.game.world.centerY+150, 'button', this.startClick, this);
      this.ok_button.anchor.setTo(0.5,0.5);

      this.ok_button.input.useHandCursor = true;

    
     

    },

    update: function() {
     
    },

    startClick: function(){
      game.state.start('loadingScreen');
    }

  };