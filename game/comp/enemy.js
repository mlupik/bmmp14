function Enemy(game, x,y,range,speed,lifes, color, type,frame) {  
  Phaser.Sprite.call(this, game, x, y, color, frame);

  /// set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  this.range = range;
  this.speed = speed;
  this.power = lifes;

  this.hurtTimer = 0;
  this.lifes = lifes;
  this.facing = 'right';
  this.type = type;
  
 
  this.game.physics.p2.enable(this);
  //Physic engine für das Autosprite aktiviert --> hat body
  //Ziel: Überprüfen ob auto auf Straße oder nicht --> callback funktion die darauf reagiert
  this.body.collideWorldBounds = true;
	this.body.fixedRotation = true;
 
  this.body.height = this.body.width = 40;

  if(this.type == 'bird'){
  	this.animations.add('walk_left',[0,1,4,5,2,6,3,7,8,12],10,true);
  	this.animations.add('walk_right',[0,1,4,5,2,6,3,7,8,12],10,true);
  	this.die_left = this.animations.add('die_left',[0,1,4,5,2,6,3,7,8,12],10,true);
  	this.die_right = this.animations.add('die_right',[0,1,4,5,2,6,3,7,8,12],10,true);
  	this.die_right.loop = false;
  	this.die_left.loop = false;
  	this.die_right.onComplete.add(this.killEnemy,this);
  	this.die_left.onComplete.add(this.killEnemy,this);
  }else if(this.type == 'eye'){
  	this.animations.add('walk_left',[12,8,7,3,6,2,5,4,1,0],10,true);
  	this.animations.add('walk_right',[0,1,4,5,2,6,3,7,8,12],10,true);
  	this.die_left = this.animations.add('die_left',[0,1,4,5,2,6,3,7,8,12],10,true);
  	this.die_right = this.animations.add('die_right',[0,1,4,5,2,6,3,7,8,12],10,true);
  	this.die_right.loop = false;
  	this.die_left.loop = false;
  	this.die_right.onComplete.add(this.killEnemy,this);
  	this.die_left.onComplete.add(this.killEnemy,this);

  }else if(this.type == 'abstract'){
  	this.animations.add('walk_left',[12,8,7,3,6,2,5,4,1,0],10,true);
  	this.animations.add('walk_right',[0,1,4,5,2,6,3,7,8,12],10,true);
  	this.die_left = this.animations.add('die_left',[0,1,4,5,2,6,3,7,8,12],10,true);
  	this.die_right = this.animations.add('die_right',[0,1,4,5,2,6,3,7,8,12],10,true);
  	this.die_right.loop = false;
  	this.die_left.loop = false;
  	this.die_right.onComplete.add(this.killEnemy,this);
  	this.die_left.onComplete.add(this.killEnemy,this);

  }

  this.setPath();
  
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);  
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {

};  

Enemy.prototype.setPath = function() {
  var delta = (this.range* 36) /2;
  this.start = this.x- delta;
  console.log("middle:",this.x);
  this.x=this.start;
  this.end = this.x + (2 * delta);

  console.log("start:",this.start);
  console.log("end:",this.end);
}

  
Enemy.prototype.jump = function(){
  
}

Enemy.prototype.moveLeft = function(){
	if(this.game.time.now>this.hurtTimer){
 		this.body.moveLeft(this.speed);
		 this.animations.play('walk_left');
	}
}

Enemy.prototype.moveRight = function(){
if(this.game.time.now>this.hurtTimer){
	this.body.moveRight(this.speed);
	this.animations.play('walk_right');
}
}

Enemy.prototype.punsh = function(){

}


Enemy.prototype.shoot = function(){

} 


Enemy.prototype.hurt = function(){
	//console.log("enemy.hurt");
	//enemy looses one heart
	
	if(this.game.time.now>this.hurtTimer){
		this.hurtTimer = this.game.time.now + 2000;
		this.hit();
		this.lifes = this.lifes -1;
		if(this.lifes<=0){
			//dying animation or tween
			var data = JSON.parse(localStorage.getItem('avatarData'));
			var points = data.points + this.power;
			data.points = points;
			localStorage.setItem('avatarData',JSON.stringify(data));
			//load dying animation
			// this.loadTexture('enemy1_die');
			// this.animations.play('die',true,false);
			if(this.facing == 'left'){
				this.getAnimationDieLeft();
			}else{
				this.getAnimationDieRight();
			}
			//this.die();
		}
	}
}

Enemy.prototype.randomMove = function(){
	if(this.facing == 'left'){
		this.moveLeft();
		if(this.body.x < this.start){
		this.facing = 'right';
		this.getAnimationWalkRight();
		}
	}else{
		this.moveRight();
		if(this.body.x > this.end){
			this.facing = 'left';
			this.getAnimationWalkLeft();
		}
	}
	
	
}

Enemy.prototype.hit = function(){
	this.body.moveUp(100);

	if(this.facing == 'left') {this.body.moveRight(200);}
	else if(this.facing == 'right'){this.body.moveLeft(200);}
	else{
		var pos = this.game.rnd.integerInRange(0,1);
		switch(pos){
			case 0:this.body.moveRight(200);
			break;
			case 1:this.body.moveLeft(200);
			break;
		
		}
		
	}
}

Enemy.prototype.die = function(){
	if(this.game.time.now>this.hurtTimer){
		this.hurtTimer = this.game.time.now + 2000;
		var data = JSON.parse(localStorage.getItem('avatarData'));
			var points = data.points + this.power;
			data.points = points;
			localStorage.setItem('avatarData',JSON.stringify(data));
			//load dying animation
			// this.loadTexture('enemy1_die');
			// this.animations.play('die',true,false);
			if(this.facing == 'left'){
				this.getAnimationDieLeft();
			}else{
				this.getAnimationDieRight();
			}
		}

}


Enemy.prototype.killEnemy = function(){
	console.log("die!");
	var json= JSON.parse(localStorage.getItem("enemyCount"));
	var enemyCount = json.enemyCount+1;
	json.enemyCount = enemyCount;
	localStorage.setItem('enemyCount',JSON.stringify(json));
	this.kill();

}


Enemy.prototype.getAnimationWalkLeft = function(){
		if(this.type == 'bird'){
			this.loadTexture('enemy1_walk_left');
		}else if(this.type == 'eye'){
			this.loadTexture('enemy3_walk');
		}else if(this.type == 'abstract'){
			this.loadTexture('enemy2_walk_left');
		}

	}

Enemy.prototype.getAnimationWalkRight = function(){
		if(this.type == 'bird'){
			this.loadTexture('enemy1_walk_right');
		}else if(this.type == 'eye'){
			this.loadTexture('enemy3_walk');
		}else if(this.type == 'abstract'){
			this.loadTexture('enemy2_walk_right');
		}

	}

Enemy.prototype.getAnimationDieRight = function(){
		if(this.type == 'bird'){
			this.loadTexture('enemy1_die_right');
			this.animations.play('die_right');

		}else if(this.type == 'eye'){
			this.loadTexture('enemy3_die');
			this.animations.play('die_right');
		}else if(this.type == 'abstract'){
			this.loadTexture('enemy2_die_right');
			this.animations.play('die_right');
		}

	}
Enemy.prototype.getAnimationDieLeft = function(){
		if(this.type == 'bird'){
			this.loadTexture('enemy1_die_left');
			this.animations.play('die_left');

		}else if(this.type == 'eye'){
			this.loadTexture('enemy3_die');
			this.animations.play('die_left');

		}else if(this.type == 'abstract'){
			this.loadTexture('enemy2_die_left');
			this.animations.play('die_left');
			
		}

	}