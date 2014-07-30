function Enemy(game, x, y, color, frame) {  
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

Enemy.prototype = Object.create(Phaser.Sprite.prototype);  
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {

};  

Enemy.prototype.resetStartPosition = function() {
  console.log(this.startPos);
  this.x = this.startPos.x;
  this.y = this.startPos.y;
  this.speed = 0;
}

  
Enemy.prototype.jump = function(){
  
}

Enemy.prototype.moveLeft = function(){
 
}

Enemy.prototype.moveRight = function(){

}

Enemy.prototype.punsh = function(){

}


Enemy.prototype.shoot = function(){

} 

Enemy.prototype.randomMove = function(){
  
}