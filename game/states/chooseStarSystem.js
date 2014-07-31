 'use strict';
  function ChooseStarSystem() {
	
  }

  ChooseStarSystem.prototype = {
    preload: function() {

    },

    create: function() {
	
		this.background = this.game.add.sprite(0,0,'weltall');
		//Starsystem Number 1
		this.ss1 = this.addStarSystem(this.game.world.centerX,this.game.world.centerY,starSystems.length);
		//this.ss2 = this.addStarSystem(this.game.world.centerX/2,this.game.world.centerY/2,1);
		

      
    },
    
    update: function() {
	
    },
	

	
	addStarSystem: function(x,y,ssNum){
		// ssNum -1 weil Array bei 0 startet
		var ssImg= starSystemImages[ssNum-1];
		var ss = this.game.add.sprite(x,y,ssImg);
		ss.anchor.setTo(0.5,0.5);
		ss.inputEnabled = true;
		ss.input.useHandCursor = true;
		switch (ssNum) {
		  case 1:
			ss.events.onInputOver.add(this.overSS1, this);
			ss.events.onInputOut.add(this.outSS1, this);
			ss.events.onInputDown.add(this.chooseSS1,this);
			break;
		 }		
		
		return ss;
	},
	
	
	//For every StarSystem (won't be that many...) 3 methods to hover, leave and to click the image
	//hover function: set new Image and show text
	overSS1: function(){
		this.ss1.loadTexture(starSystemImagesHover[0]);
		this.ss1_text = this.game.add.bitmapText(this.ss1.x - this.ss1.width/2,this.ss1.y+ this.ss1.height/2, 'font_white',starSystemNames[0], 40);
	},
	//cursor leave image: reset system image and remove text
	outSS1: function(){
		this.ss1.loadTexture(starSystemImages[0]);
		this.ss1_text.destroy(true);
	},
	//show the next screen with chosen starsystem 
	//world: starsystem (containing levels as planets)
	chooseSS1: function(){
		if(!!localStorage){
			localStorage.setItem('world', 1);
		}
		game.state.start('chooseStar');
	}
  };