
function Avatar(game, x, y,img) {  
  Phaser.Sprite.call(this,game,x, y,img);
 

  /// set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  
  this.startPos = {
    x:100,
    y:100
  };
  this.alive = true;
  this.dying = false;
  this.minSpeed = 150;
  this.maxSpeed = this.minSpeed*2;
  this.speed = this.minSpeed;
  this.facing  = 'right';
  this.frame = 0;
  this.game = game;
  this.immortal = false;
  this.fast = false;
  this.jumpTimer = 0;
  this.hurtTimer = 0;
  
  this.powerUpTimer = 0;
   this.onFloor = true;
  this.jumpSpeed = 0;
  this.animations.add('walk_right', [10, 13, 14, 15, 16, 17, 18, 20, 21, 0, 1],10,true);
  this.animations.add('walk_left', [10, 14, 15, 16, 17, 18, 19, 21, 22, 0, 1], 10, true);
  // this.animations.add('walk_left', [8,9,10,11,12,13,14,15],10,true);
  this.die_anim = this.animations.add('die',[5,6,7,8,9,10,11,12,13,0,1,2,3,4],10,false);
  this.die_anim.onComplete.add(this.isDying,this);
  this.animations.add('jump', [5,6,7,8,9],10,false);
  this.animations.add('punch', [0],5,true);
  this.punching = false;

  this.game.physics.p2.enable(this);
  // this.body.allowGravity = true;

  // this.body.gravity = 400;

  this.body.collideWorldBounds = true;
  
  this.body.fixedRotation = true;
  //this.body.bounce.y = 0.2;
  //this.resetStartPosition();

}

Avatar.prototype = Object.create(Phaser.Sprite.prototype);  
Avatar.prototype.constructor = Avatar;



//Avatar.prototype.animations.add('walk',[1,2,3,4,5]);

Avatar.prototype.stopMove = function() {
	if(!this.dying) {
	if(this.facing != 'idle'){
		this.animations.stop();
		if(this.facing == 'left'){
			this.frame = 2;
		}else{
			this.frame = 2;
		}
		//console.log("stop avatar");
		this.facing = 'idle';
		this.body.velocity.x = 0;
	}}		
}  


Avatar.prototype.update = function() {
	//this.body.velocity.x = 0;
	// console.log("update avatar");
	if(this.powerUpTimer<game.time.now && this.immortal){
			this.immortal = false;
		}
	if(this.powerUpTimer<game.time.now && this.fast){
			this.fast =false;
			this.speed = this.minSpeed;
	}
}  
  
Avatar.prototype.jump = function(){
	// console.log("game.time.now > jumpTimer", game.time.now>this.jumpTimer);
		// console.log("avatar: onFloor", this.onFloor);
	if(!this.dying){
		if(this.onFloor && this.game.time.now>this.jumpTimer){

			this.animations.play('jump');
			//this.animations.stop();
			//this.facing = 'idle';
			this.body.velocity.y = -300;
			this.jumpTimer = game.time.now + 350;
			this.onFloor=false;
		}
	}
}

Avatar.prototype.moveLeft = function(){
	if(!this.dying){	
		this.body.moveLeft(this.speed);
		if(this.facing != 'left'  && this.onFloor){
			this.loadTexture('avatar_walk_left');
			this.animations.play('walk_left');
			this.facing = 'left';
		}
		if(!this.onFloor){
			this.loadTexture('avatar_walk_left');
			this.frame = 9;
		}
	}
}

Avatar.prototype.moveRight = function(){
	if(!this.dying){
		this.body.moveRight(this.speed);
		if(this.facing != 'right' && this.onFloor){
			this.loadTexture('avatar_walk_right');
			this.animations.play('walk_right');
			this.facing = 'right';
		}
		if(!this.onFloor){
			this.loadTexture('avatar_walk_right');
			this.frame = 9;
		}
	}
}

Avatar.prototype.moveDown = function(){
	//this.body.velocity.y = 300;
}

Avatar.prototype.speedUp = function(){
	this.fast = true;
	if(this.speed==this.minSpeed){
		this.speed = this.speed*2;
	}
	this.powerUpTimer = game.time.now+ 7000;
}

Avatar.prototype.punch = function(){

}

Avatar.prototype.stopPunch = function(){
	this.punshing = false;
	this.animations.stop('normal');
}

Avatar.prototype.hurt = function(){
			if(this.game.time.now>this.hurtTimer){
				this.hurtTimer = this.game.time.now + 2000;
				this.hit();
				var data = JSON.parse(localStorage.getItem('avatarData'));
				//avatar looses one heart
				var hearts = data.hearts -1;
				data.hearts = hearts;
				localStorage.setItem('avatarData',JSON.stringify(data));
				if(hearts<=0){
					this.dying = true;
					this.loadTexture('avatar_die');
					this.animations.play('die');
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

Avatar.prototype.isDying = function(){

	this.gameOver();
	this.kill();
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

Avatar.prototype.gameOver= function(){
	//this.game.gameOverMenu();
	this.alive = false;
	
}


Avatar.prototype.superPower= function(){
	this.immortal = true;
	this.powerUpTimer = game.time.now+ 7000;
} 