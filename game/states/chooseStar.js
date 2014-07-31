 'use strict';
  function ChooseStar() {
  }

  ChooseStar.prototype = {
    preload: function() {

    },

    create: function() {
      this.background = this.game.add.sprite(0,0,'weltall');
	  this.world = localStorage.getItem('world');
	  
	  this.starSystem = new StarSystem(this);
	  //this.game.add.existing(this.starSystem);
    },
    
    update: function() {
     
    }
  };