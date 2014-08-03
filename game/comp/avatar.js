
function Avatar(game, x, y,img) {  
  Phaser.Sprite.call(this,game,x, y,img);
 

  /// set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  
  this.startPos = {
    x:100,
    y:100
  };

  this.speed = 0;
  this.facing  = 'right';
  this.frame = 0;
  this.jumpTimer = 0;
  this.onFloor = true;
  this.jumpSpeed = 0;
  this.animations.add('walk_right', [0,1,2,3,4,5,6,7],10,true);
  this.animations.add('walk_left', [8,9,10,11,12,13,14,15],10,true);
  this.animations.add('jump', [4],5,true);
  this.animations.add('punch', [0],5,true);
  this.punching = false;

  this.game.physics.p2.enable(this);
  this.body.collideWorldBounds = true;
  
  this.body.fixedRotation = true;
  //this.body.bounce.y = 0.2;
  //this.resetStartPosition();

}

Avatar.prototype = Object.create(Phaser.Sprite.prototype);  
Avatar.prototype.constructor = Avatar;



//Avatar.prototype.animations.add('walk',[1,2,3,4,5]);

Avatar.prototype.stopMove = function() {
	if(this.facing != 'idle'){
		this.animations.stop();
		if(this.facing == 'left'){
			this.frame = 8;
		}else{
			this.frame = 0;
		}
		//console.log("stop avatar");
		this.facing = 'idle';
		this.body.velocity.x = 0;
	}		
}  


Avatar.prototype.live = function() {
	//this.body.velocity.x = 0;
}  
  
Avatar.prototype.jump = function(){
	// console.log("game.time.now > jumpTimer", game.time.now>this.jumpTimer);
		// console.log("avatar: onFloor", this.onFloor);
	
	if(this.onFloor && this.game.time.now>this.jumpTimer){
		this.animations.stop();
		this.facing = 'idle';
		this.body.velocity.y = -300;
		this.jumpTimer = game.time.now + 350;
		this.onFloor=false;
	}
}

Avatar.prototype.moveLeft = function(){
	if(this.onFloor){
		this.body.velocity.x = -150;
		if(this.facing != 'left'){
			this.animations.play('walk_left');
			this.facing = 'left';
		}
	}
}

Avatar.prototype.moveRight = function(){
	if(this.onFloor){
	this.body.velocity.x = 150;
		if(this.facing != 'right'){
			this.animations.play('walk_right');
			this.facing = 'right';
		}
	}
}

Avatar.prototype.moveDown = function(){
	//this.body.velocity.y = 300;
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