function Enemy(game, x,range,speed,lifes, color, frame) {  
  Phaser.Sprite.call(this, game, x, 0, color, frame);

  /// set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  this.range = range;
  this.speed = speed;
  this.power = lifes;

  this.hurtTimer = 0;
  this.lifes = lifes;
  this.facing = 'right';
  
 
  this.game.physics.p2.enable(this);
  //Physic engine für das Autosprite aktiviert --> hat body
  //Ziel: Überprüfen ob auto auf Straße oder nicht --> callback funktion die darauf reagiert
  this.body.collideWorldBounds = true;
	this.body.fixedRotation = true;
 
  this.body.height = this.body.width = 40;
  
  this.animations.add('walk_left',[12,8,7,3,6,2,5,4,1,0],10,true);
  this.animations.add('walk_right',[0,1,4,5,2,6,3,7,8,12],10,true);
  this.anim = this.animations.add('die',[0,1,4,5,2,6,3,7,8,12],10);
  this.anim.loop = false;
  this.anim.onComplete.add(this.killEnemy,this);
  this.setPath();
  
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);  
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {

};  

Enemy.prototype.setPath = function() {
  var delta = this.range/2;
  this.start = this.x- delta;
  this.x=this.start;
  this.end = this.x + delta;
  // console.log("start:",this.start);
  // console.log("end:",this.end);
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
			this.loadTexture('enemy1_die');
			this.animations.play('die',true,false);
			//this.die();
		}
	}
}

Enemy.prototype.randomMove = function(){
	if(this.facing == 'left'){
		this.moveLeft();
		if(this.body.x < this.start){
		this.facing = 'right';
		}
	}else{
		this.moveRight();
		if(this.body.x > this.end){
			this.facing = 'left';
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
			this.loadTexture('enemy1_die');
			this.animations.play('die',true,false);
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
