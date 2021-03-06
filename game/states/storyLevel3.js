'use strict';
  function StoryLevel3() {
  }

  StoryLevel3.prototype = {
    preload: function() {

    },

    create: function() {
      this.background = this.game.add.sprite(0,0,'weltall');
      this.background.alpha = 0;
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.ESC]);
      this.escapeKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
      this.tween0 = this.game.add.tween(this.background).to({ alpha:1},2000, Phaser.Easing.Linear.None, true).to({alpha:1},1000, Phaser.Easing.Linear.None, true).to({alpha:0},3000, Phaser.Easing.Linear.None, true).start();

      this.flug = this.game.add.sprite(0,0, 'flug');
      this.flug.alpha = 0;

      this.sound = this.game.add.audio('storyFlugUndCrash', 1, false).play();  

      this.tween = this.game.add.tween(this.flug).to({ alpha:1},2000, Phaser.Easing.Linear.None, true).to({ alpha:1},1000, Phaser.Easing.Linear.None, true).to({alpha:0},3000, Phaser.Easing.Linear.None, true).start();
      this.tween1 = this.game.add.tween(this.flug).to({x:-100,y:100},6000, Phaser.Easing.Linear.None, true).start();

      this.tween1.onComplete.add(this.part2, this);


      //this.eis = this.game.add.sprite(0,0, 'absturzEis');



    },
    
    update: function() {
      if(this.escapeKey.isDown){
      this.sound.stop();
      this.startLevel();
    } 
     
    },

    part2: function() {
  
      this.flug1 = this.game.add.sprite(0,0,'absturzAbstrakt');
      this.flug1.alpha = 0;
      this.tween_ice = this.game.add.tween(this.flug1).to({ alpha:1},2000, Phaser.Easing.Linear.None, true).to({ alpha:1},1000, Phaser.Easing.Linear.None, true).to({alpha:0},3000, Phaser.Easing.Linear.None, true).start();
      // this.tween_ice_shake = this.game.add.tween(this.flug).to({x: 20},1000, Phaser.Easing.Bounce.Out, true).to({x: 0},4000, Phaser.Easing.Bounce.Out, true).start();
      this.tween_fake = this.game.add.tween(this.background).to({x:0},0, Phaser.Easing.Linear.None, true,6000);
      this.tween_fake.loop = false;
      this.tween_fake.start();
      this.tween_fake.onComplete.add(this.startLevel, this);

    },

    startLevel: function(){
      this.game.state.start('instructionScreen');
      console.log('story3');

    }
  };