 'use strict';
  function ChooseStarSystem() {
	
  }

  ChooseStarSystem.prototype = {
    preload: function() {

    },

    create: function() {
	
		this.background = this.game.add.sprite(0,0,'weltall');
		//Starsystem Number 1
		this.ss1 = this.addStarSystem(this.game.world.centerX,this.game.world.centerY,1);
		this.ss2 = this.addStarSystem(this.game.world.centerX/2,this.game.world.centerY/2,2);
		

      
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
			case 2:
			ss.events.onInputOver.add(this.overSS2, this);
			ss.events.onInputOut.add(this.outSS2, this);
			ss.events.onInputDown.add(this.chooseSS2,this);
			break;
		 }		
		
		return ss;
	},
	
//System 1	
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
	},
	
//System 2
	
		overSS2: function(){
		this.ss2.loadTexture(starSystemImagesHover[1]);
		this.ss2_text = this.game.add.bitmapText(this.ss2.x - this.ss2.width/2,this.ss2.y+ this.ss2.height/2, 'font_white',starSystemNames[1], 40);
	},
	
	outSS2: function(){
		this.ss2.loadTexture(starSystemImages[1]);
		this.ss2_text.destroy(true);
	},

	chooseSS2: function(){
		if(!!localStorage){
			localStorage.setItem('world', 2);
		}
		game.state.start('chooseStar');
	}
  };