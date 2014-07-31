'use strict';
function Avatar(game, x, y, frame) {  
  Phaser.Sprite.call(this, game, x, y, 'man', frame);

  /// set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  
  this.startPos = {
    x:100,
    y:100
  };

  this.speed = 0;


  this.game.physics.arcade.enable(this);
  this.game.physics.arcade.gravity.y = 250;
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  //Physic engine für das Autosprite aktiviert --> hat body
  //Ziel: Überprüfen ob auto auf Straße oder nicht --> callback funktion die darauf reagiert
  this.body.collideWorldBounds = true;
  this.body.allowRotation = true;
   this.body.bounce.y = 0.2;
  
  this.resetStartPosition();

}

Avatar.prototype = Object.create(Phaser.Sprite.prototype);  
Avatar.prototype.constructor = Avatar;

Avatar.prototype.live = function() {

		this.body.velocity.x = 0;
};  

Avatar.prototype.resetStartPosition = function() {
  console.log(this.startPos);
  this.x = this.startPos.x;
  this.y = this.startPos.y;
  this.speed = 0;
}

  
Avatar.prototype.jump = function(){
  this.body.y = this.body.y - 20;
}

Avatar.prototype.moveLeft = function(){
	
	this.body.x = this.body.x - 10;
}

Avatar.prototype.moveRight = function(){

	this.body.x = this.body.x+10;
}

Avatar.prototype.moveDown = function(){
	this.body.y++;
}

Avatar.prototype.punsh = function(){

}


Avatar.prototype.shoot = function(){

} 