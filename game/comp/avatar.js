
function Avatar(game, x, y,img) {  
  Phaser.Sprite.call(this,game,x, y,img);
 

  /// set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  
  this.startPos = {
    x:100,
    y:100
  };

  this.speed = 0;

  this.animations.add('normal', [1],5,true);
  this.animations.play('normal');
  this.animations.add('walk', [2,3,4,5,6,7,8],10,true);
  this.animations.add('jump', [4],5,true);
  this.animations.add('punch', [0],5,true);
  
  this.punching = false;

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

Avatar.prototype.stopMove = function() {

		//this.body.velocity.x = 0;
		console.log("stop avatar");
		this.body.velocity.x = 0;
		this.animations.stop();
}  


Avatar.prototype.live = function() {

}  
  
Avatar.prototype.jump = function(){
if(this.body.y < 600)
  this.body.y -= 20;
  this.animations.play('jump');
}

Avatar.prototype.moveLeft = function(){
		this.body.velocity.x = -300;
		this.animations.play('walk');
}

Avatar.prototype.moveRight = function(){
		this.animations.play('walk');
		this.body.velocity.x = 300;
}

Avatar.prototype.moveDown = function(){
	this.body.velocity.y = 300;
}

Avatar.prototype.punch = function(){

}

Avatar.prototype.stopPunch = function(){
	this.punshing = false;
	this.animations.stop('normal');
}

Avatar.prototype.hurt = function(){
	var data = JSON.parse(localStorage.getItem('avatarData'));
	//avatar looses one heart
	var hearts = data.hearts -1;
	if(hearts<=0){
		//dying animation or tween
		this.kill();
		//game over
	}else{
		data.hearts = hearts;
		localStorage.setItem('avatarData',JSON.stringify(data));
	}
}


Avatar.prototype.shoot = function(){

} 