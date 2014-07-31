 'use strict';
  function ChooseAvatar() {
    this.avatarCount = 0;
    this.avatars= new Array('avatar1' , 'avatar2');
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

      this.r_button = this.game.add.button(800,this.game.world.centerY, 'arrow_r', this.rightClick, this);
      this.r_button.anchor.setTo(0.5,0.5);
      this.l_button = this.game.add.button(400,this.game.world.centerY, 'arrow_l', this.leftClick, this);
      this.l_button.anchor.setTo(0.5,0.5);


      this.avatar = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,this.avatars[this.avatarCount]);
      this.avatar.anchor.setTo(0.5,0.5);
      


    },
    
    update: function() {
      
    },

    rightClick: function() {
      this.avatarCount++;
      if(this.avatarCount==this.avatars.length){
          this.avatarCount=0;
      }
      this.avatar.loadTexture(this.avatars[this.avatarCount]);

    },

     leftClick: function() {

        this.avatarCount--;
      if(this.avatarCount<0){
          this.avatarCount=this.avatars.length-1;
      }
      this.avatar.loadTexture(this.avatars[this.avatarCount]);

    },
	
	okClick: function() {
      game.state.start('chooseStarSystem');

    }

  };