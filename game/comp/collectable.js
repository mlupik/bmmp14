
function Collectable(game,x,y,img,type) {  
  Phaser.Sprite.call(this,game,x, y,img);
 

  /// set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  this.type = type;
  this.collected =  false;

  this.speed = 0;
 this.yFix = y;
  

  this.game.physics.p2.enable(this);
  this.body.collideWorldBounds = true;
 // this.body.allowRotation = true;
  this.body.fixedRotation = true;
   this.body.x = x;
  this.body.y=y;
  //this.body.allowGravity = false;

  this.animations.add('animate', [0,1,4,5,2,6,3,7,8,12], 10, true );
  this.animations.play('animate');


}

Collectable.prototype = Object.create(Phaser.Sprite.prototype);  
Collectable.prototype.constructor = Collectable;


Collectable.prototype.update = function() {
	this.body.y = this.yFix;
}
//Collectable.prototype.animations.add('walk',[1,2,3,4,5]);

Collectable.prototype.collect = function() {
	if(!this.collected){
		this.collected = true;
		if(this.type == 'coin'){
			this.collectCoin();
		}else if(this.type == 'heart'){
			this.collectHeart();
		}else if(this.type == 'weapon'){
			this.collectWeapon();
		}else if(this.type == 'lightning'){
			this.collectLightning();
		}
		else if(this.type == 'superpower'){
			this.collectSuperPower();
		}
		else if(this.type == 'reward'){
			this.collectReward();
		}
		
	}
	this.kill();
	
} 

Collectable.prototype.collectHeart = function() {
	var data = JSON.parse(localStorage.getItem('avatarData'));
	var hearts = data.hearts;
	if(hearts < max_hearts){
		hearts = hearts +1;
		data.hearts = hearts;
		localStorage.setItem('avatarData',JSON.stringify(data));
		//console.log(JSON.parse(localStorage.getItem('avatarData')));
	}
} 
Collectable.prototype.collectLightning = function() {
	console.log("lightning collected!");
	// var data = JSON.parse(localStorage.getItem('avatarData'));
	// var hearts = data.hearts;
	// if(hearts < max_hearts){
		// hearts = hearts +1;
		// data.hearts = hearts;
		// localStorage.setItem('avatarData',JSON.stringify(data));
		// //console.log(JSON.parse(localStorage.getItem('avatarData')));
	// }
} 

Collectable.prototype.collectSuperPower = function() {
	console.log("lightning collected!");
	// var data = JSON.parse(localStorage.getItem('avatarData'));
	// var hearts = data.hearts;
	// if(hearts < max_hearts){
		// hearts = hearts +1;
		// data.hearts = hearts;
		// localStorage.setItem('avatarData',JSON.stringify(data));
		// //console.log(JSON.parse(localStorage.getItem('avatarData')));
	// }
} 

Collectable.prototype.collectCoin = function() {
	var data = JSON.parse(localStorage.getItem('avatarData'));
	var coins = data.points +1;
	// console.log(data.points);
	// console.log(coins);
	data.points = coins;
	localStorage.setItem('avatarData',JSON.stringify(data));
	console.log(JSON.parse(localStorage.getItem('avatarData')));
} 
Collectable.prototype.collectReward = function() {
	console.log("reward collected!");
} 

Collectable.prototype.collectWeapon = function() {

} 
 
