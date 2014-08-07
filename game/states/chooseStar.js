 'use strict';
  function ChooseStar() {
  }

  ChooseStar.prototype = {
    preload: function() {

    },

    create: function() {
    var bg_sound = this.game.add.audio('menuAtmo',1,true).play();
    this.background = this.game.add.sprite(0,0,'weltall');
	  this.world = localStorage.getItem('world');
	  
	  this.starSystem = new StarSystem(this.game, bg_sound);
	  //this.game.add.existing(this.starSystem);
    },
    
    update: function() {
     
    }
  };