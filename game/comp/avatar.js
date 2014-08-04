
function Avatar(game, x, y,img) {  
  Phaser.Sprite.call(this,game,x, y,img);
 

  /// set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  
  this.startPos = {
    x:100,
    y:100
  };
  
  this.minSpeed = 150;
  this.maxSpeed = this.minSpeed*2;
  this.speed = this.minSpeed;
  this.facing  = 'right';
  this.frame = 0;
  this.immortal = false;
  this.jumpTimer = 0;
  this.hurtTimer = 0;
  this.powerUpTimer = 0;
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
	if(this.powerUpTimer<game.time.now && this.immortal){
			this.immortal = false;
		}
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
		if(this.powerUpTimer<game.time.now && this.speed == this.maxSpeed){
			this.speed = this.minSpeed;
		}
		this.body.moveLeft(this.speed);
		if(this.facing != 'left'){
			this.animations.play('walk_left');
			this.facing = 'left';
		}
}

Avatar.prototype.moveRight = function(){
	if(this.powerUpTimer<game.time.now && this.speed == this.maxSpeed){
			this.speed = this.minSpeed;
		}
	this.body.moveRight(this.speed);
		if(this.facing != 'right'){
			this.animations.play('walk_right');
			this.facing = 'right';
		}
}

Avatar.prototype.moveDown = function(){
	//this.body.velocity.y = 300;
}

Avatar.prototype.speedUp = function(){
	if(this.speed==this.minSpeed){
		this.speed = this.speed*2;
		this.powerUpTimer = game.time.now+ 5000;
	}
}

Avatar.prototype.punch = function(){

}

Avatar.prototype.stopPunch = function(){
	this.punshing = false;
	this.animations.stop('normal');
}

Avatar.prototype.hurt = function(){
			if(this.game.time.now>this.hurtTimer){
				this.hurtTimer = this.game.time.now + 3000;
				this.hit();
				var data = JSON.parse(localStorage.getItem('avatarData'));
				//avatar looses one heart
				var hearts = data.hearts -1;
				data.hearts = hearts;
				localStorage.setItem('avatarData',JSON.stringify(data));
				if(hearts<=0){
					//dying animation or tween
					this.kill();
					//game over
				}
			
			}
}

Avatar.prototype.hit = function(){
	this.body.moveUp(250);

	if(this.facing == 'left') {this.body.moveRight(400);}
	else if(this.facing == 'right'){this.body.moveLeft(400);}
	else{
		var pos = this.game.rnd.integerInRange(0,1);
		switch(pos){
			case 0:this.body.moveRight(500);
			break;
			case 1:this.body.moveLeft(500);
			break;
		
		}
		
	}
	
}

Avatar.prototype.hitEnemy = function(){
	this.body.moveUp(200);

	if(this.facing == 'left') {this.body.moveRight(100);}
	else if(this.facing == 'right'){this.body.moveLeft(100);}
	else{
		var pos = this.game.rnd.integerInRange(0,1);
		switch(pos){
			case 0:this.body.moveRight(100);
			break;
			case 1:this.body.moveLeft(100);
			break;
		
		}
		
	}
	
}




Avatar.prototype.superPower= function(){
	this.immortal = true;
	this.powerUpTimer = game.time.now+ 5000;
} 