function Planet(game, x, y,p_img,frame) {  
	Phaser.Sprite.call(this, game, x, y, p_img, frame);
	//setup
	this.anchor.setTo(0.5, 0.5);
	this.unlocked = false;
 }
 
Planet.prototype.constructor = Planet;

Planet.prototype.unlock = function() {
	// set unlock true and change sprite
	this.unlocked = true;
};  

