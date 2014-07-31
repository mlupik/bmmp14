 'use strict';
  function ChooseStarSystem() {
  }

  ChooseStarSystem.prototype = {
    preload: function() {

    },

    create: function() {
	
		this.background = this.game.add.sprite(0,0,'weltall');
		this.ss1 = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'sternbild');
		this.ss1.anchor.setTo(0.5,0.5);
		this.ss1.inputEnabled = true;
		this.ss1.input.useHandCursor = true;
		this.ss1.events.onInputOver.add(this.overSS, this);
		this.ss1.events.onInputOut.add(this.outSS, this);
		this.ss1.events.onInputDown.add(this.chooseSS,this);
		
		

      
    },
    
    update: function() {
	
    },
	
	overSS: function(){
		this.ss1.loadTexture('sternbild_hover');
		this.ss1_text = this.game.add.bitmapText(this.ss1.x - this.ss1.width/2,this.ss1.y+ this.ss1.height/2, 'font_white','Kleiner Wagen', 40);
	},
	
	outSS: function(){
		this.ss1.loadTexture('sternbild');
		this.ss1_text.destroy(true);
	},
	
	chooseSS: function(){
		this.game.state.start('chooseStar');
	}
  };