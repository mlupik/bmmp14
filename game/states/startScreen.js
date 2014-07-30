 'use strict';
  function StartScreen() {

  }

  StartScreen.prototype = {
    preload: function() {
      //load images for the startScreen only
      this.load.image('menu_bg', '././assets/menu1.png');
      this.load.image('button', '././assets/button_s.png');
      this.load.bitmapFont('font','././assets/font3.png', 'assets/font.xml');

      //load animation of progressbar for the loadingScreen
      this.load.image('progress','././assets/progressbar.gif');
    },

    create: function() {
      //just some test images for navigation
      this.menu_bg = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'menu_bg');
      this.menu_bg.anchor.setTo(0.5, 0.5);

      this.ok_button = this.game.add.button(this.game.world.centerX,this.game.world.centerY, 'button', this.startClick, this);
      this.ok_button.anchor.setTo(0.5,0.5);

      this.start_text = this.game.add.bitmapText(this.game.world.centerX-40,this.game.world.centerY-30, 'font','Start', 40);
    
     

    },

    update: function() {
     
    },

    startClick: function(){
      game.state.start('loadingScreen');
    }

  };