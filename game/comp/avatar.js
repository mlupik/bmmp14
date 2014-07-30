function Avatar(game, x, y, color, frame) {  
  Phaser.Sprite.call(this, game, x, y, color, frame);

  /// set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  
  this.startPos = {
    x:900,
    y:320
  };

  this.speed = 0;


  this.game.physics.arcade.enable(this);
  //Physic engine für das Autosprite aktiviert --> hat body
  //Ziel: Überprüfen ob auto auf Straße oder nicht --> callback funktion die darauf reagiert
  this.body.collideWorldBounds = true;
  this.body.allowRotation = true;

  this.body.maxVelocity.set(399);
  this.body.height = this.body.width = 40;

  this.resetStartPosition();

}

Avatar.prototype = Object.create(Phaser.Sprite.prototype);  
Avatar.prototype.constructor = Avatar;

Avatar.prototype.update = function() {

};  

Avatar.prototype.resetStartPosition = function() {
  console.log(this.startPos);
  this.x = this.startPos.x;
  this.y = this.startPos.y;
  this.speed = 0;
}

  
Avatar.prototype.jump = function(){
  
}

Avatar.prototype.moveLeft = function(){
 
}

Avatar.prototype.moveRight = function(){

}

Avatar.prototype.punsh = function(){

}


Avatar.prototype.shoot = function(){

} 