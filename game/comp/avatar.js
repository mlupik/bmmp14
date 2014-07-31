
function Avatar(game, x, y,img) {  
  Phaser.Sprite.call(this,game,x, y,img);
 

  /// set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  
  this.startPos = {
    x:100,
    y:100
  };

  this.speed = 0;

  this.animations.add('walk', [1,2,3,4,5,6,7],10,true);
  this.animations.play('walk');

  this.game.physics.arcade.enableBody(this);
  this.body.collideWorldBounds = true;
  this.body.allowRotation = true;
  this.body.bounce.y = 0.2;
  
  this.resetStartPosition();

}

Avatar.prototype = Object.create(Phaser.Sprite.prototype);  
Avatar.prototype.constructor = Avatar;

Avatar.prototype.resetStartPosition = function() {
  console.log(this.startPos);
  this.x = this.startPos.x;
  this.y = this.startPos.y;
  this.speed = 0;
}

//Avatar.prototype.animations.add('walk',[1,2,3,4,5]);

Avatar.prototype.live = function() {

		this.body.velocity.x = 0;
}  



  
Avatar.prototype.jump = function(){
  this.body.y = this.body.y - 20;
}

Avatar.prototype.moveLeft = function(){
	
	this.body.x = this.body.x - 10;
	this.animations.play('walk');
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