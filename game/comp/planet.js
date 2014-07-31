function Planet(game, x, y,p_img,frame) {  
	Phaser.Sprite.call(this,game, x, y, 'planet', frame);
	//setup
	// this.anchor.setTo(0.5, 0.5);
	this.unlocked = false;
	this.game.physics.arcade.enable(this);
 };
 
Planet.prototype = Object.create(Phaser.Sprite.prototype);  
Planet.prototype.constructor = Planet;

Planet.prototype.update = function() {
	
};  

Planet.prototype.unlock = function() {
	// set unlock true and change sprite
	this.unlocked = true;
};  

