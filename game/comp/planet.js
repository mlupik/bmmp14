function Planet(game, id, x, y,p_img,frame) {  
	Phaser.Sprite.call(this,game, x, y, p_img, frame);
	//setup
	// this.anchor.setTo(0.5, 0.5);
	//this.game.physics.arcade.enable(this);
	this.id = id;
	this.game = game;




	//this.anchor.setTo(0.5, 0.5);
	this.inputEnabled = true;
	this.input.useHandCursor = true;
	this.events.onInputDown.add(this.onClick,this);

	//0,1,4,5,2,6,3,7,8,12


	this.animations.add('rotate',[0,1,7,8,2,9,3,10,14,21,15,16,22,23,17,24,4,5,11,6],10, true);
	this.animations.play('rotate');

	
 };
 
Planet.prototype = Object.create(Phaser.Sprite.prototype);  
Planet.prototype.constructor = Planet;

Planet.prototype.update = function() {

};  


Planet.prototype.onClick = function() {
	
	switch (this.id) {
		case 1:
			game.state.start('storyLevel1');
		break;

		case 2:
			game.state.start('storyLevel2');
		break;

		case 3:
			game.state.start('storyLevel3');
		break; 
	}
};

