 'use strict';
  function ChooseAvatar() {
    this.avatarCount = 0;
    this.avatars= 8;
  }

  ChooseAvatar.prototype = {
    preload: function() {

    },

    create: function() {
      //just some test images for navigation
      this.menu_bg = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'menu_bg');
      this.menu_bg.anchor.setTo(0.5, 0.5);


      this.group_ok_button = this.game.add.group();

      this.ok_button = this.game.add.button(0,0, 'button', this.okClick, this);
      this.ok_button.anchor.setTo(0.5,0.5);
      this.group_ok_button.add(this.ok_button);

      this.start_text = this.game.add.bitmapText(-20,-20, 'font_black','OK', 40);
      this.group_ok_button.add(this.start_text);

      this.group_ok_button.x =this.game.world.centerX;
      this.group_ok_button.y = this.game.world.centerY +100;

      this.r_button = this.game.add.button(600,this.game.world.centerY, 'arrow_r', this.rightClick, this);
      this.r_button.anchor.setTo(0.5,0.5);
      this.l_button = this.game.add.button(200,this.game.world.centerY, 'arrow_l', this.leftClick, this);
      this.l_button.anchor.setTo(0.5,0.5);


      // this.avatar = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,this.avatars[this.avatarCount]);
      // this.avatar.anchor.setTo(0.5,0.5);
      
	  this.avatar = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'man');
      this.avatar.anchor.setTo(0.5,0.5);
	  
	  this.avatar.animations.add('frame',[0]);
	  this.avatar.animations.play('frame',1,false);

    },
    
    update: function() {
      
    },

    rightClick: function() {
      this.avatarCount++;
      if(this.avatarCount==this.avatars){
          this.avatarCount=0;
      }
	  this.avatar.animations.add('frame',[this.avatarCount]);
	  this.avatar.animations.play('frame',1,false);
    },

     leftClick: function() {

        this.avatarCount--;
      if(this.avatarCount<0){
          this.avatarCount=this.avatars-1;
      }
	  this.avatar.animations.add('frame',[this.avatarCount]);
	  this.avatar.animations.play('frame',1,false);

    },
	
	okClick: function() {
      game.state.start('chooseStarSystem');

    }

  };