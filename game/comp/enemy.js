function Enemy(game, x,range,speed,lifes, color, frame) {  
  Phaser.Sprite.call(this, game, x, 0, color, frame);

  /// set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  this.range = range;
  this.speed = speed;
  this.power = lifes;
  this.lifes = lifes;
  this.facing = 'right';
  
 
  this.game.physics.p2.enable(this);
  //Physic engine für das Autosprite aktiviert --> hat body
  //Ziel: Überprüfen ob auto auf Straße oder nicht --> callback funktion die darauf reagiert
  this.body.collideWorldBounds = true;
	this.body.fixedRotation = true;
 
  this.body.height = this.body.width = 40;
  
  this.animations.add('walk_left',[9,10,11,12,13,14],10,true);
  this.animations.add('walk_right',[17,18,19,20,21,22,23],10,true);


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
  console.log("start:",this.start);
  console.log("end:",this.end);
}

  
Enemy.prototype.jump = function(){
  
}

Enemy.prototype.moveLeft = function(){
 		this.body.moveLeft(this.speed);
		this.animations.play('walk_left');
}

Enemy.prototype.moveRight = function(){
this.body.moveRight(this.speed);
this.animations.play('walk_right');
}

Enemy.prototype.punsh = function(){

}


Enemy.prototype.shoot = function(){

} 


Enemy.prototype.hurt = function(){
	//console.log("enemy.hurt");
	//enemy looses one heart
	this.lifes = this.lifes -1;
	if(this.lifes<=0){
		//dying animation or tween
		var data = JSON.parse(localStorage.getItem('avatarData'));
		var points = data.points + this.power;
		data.points = points;
		localStorage.setItem('avatarData',JSON.stringify(data));
		this.kill();
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