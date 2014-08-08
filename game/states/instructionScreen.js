'use strict';
  function InstructionScreen() {
  }

  InstructionScreen.prototype = {
    preload: function() {

    },

    create: function() {
      this.background = this.game.add.sprite(0,0,'weltall');
      this.background.alpha = 0;
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.ESC]);
      this.escapeKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
      this.tween0 = this.game.add.tween(this.background).to({ alpha:1},2000, Phaser.Easing.Linear.None, true).to({alpha:1},1000, Phaser.Easing.Linear.None, true).to({alpha:0},3000, Phaser.Easing.Linear.None, true).start();

      this.flug = this.game.add.sprite(400,200, 'sammleText');
      this.flug.anchor.setTo(0.5,0.5);
      this.flug.alpha = 0;

      this.tween = this.game.add.tween(this.flug).to({ alpha:1},2000, Phaser.Easing.Linear.None, true).to({ alpha:1},1000, Phaser.Easing.Linear.None, true).to({alpha:0},3000, Phaser.Easing.Linear.None, true).start();
      this.tween1 = this.game.add.tween(this.flug).to({x:400,y:200},6000, Phaser.Easing.Linear.None, true).start();
      this.tween1.onComplete.add(this.startLevel, this);


      //this.eis = this.game.add.sprite(0,0, 'absturzEis');



    },
    
    update: function() {
      if(this.escapeKey.isDown){
      this.startLevel();
    } 
     
    },


    startLevel: function(){

      this.level = localStorage.getItem('level');

      switch(this.level) {
        case '1':
          this.game.state.start('play1');
        break;
        case '2':
          this.game.state.start('play2');
        break;
        case '3':
          this.game.state.start('play3');
        break; 
      }

    }
  };