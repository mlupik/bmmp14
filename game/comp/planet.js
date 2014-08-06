function Planet(game, id, x, y,p_img,frame) {  
	Phaser.Sprite.call(this,game, x, y, p_img, frame);
	//setup
	// this.anchor.setTo(0.5, 0.5);
	//this.game.physics.arcade.enable(this);
	this.id = id;
	this.game = game;
	this.text_timer = 0;

	this.text = 'Planet noch nicht \nfreigeschaltet';



	if (localStorage.getItem('planet'+id) === null) {
		localStorage.setItem('planet'+id, 'locked');
	}


	if (id == 1) {
		this.status = 'unlocked';}
	else {
	this.status = localStorage.getItem('planet'+id);}


	//this.anchor.setTo(0.5, 0.5);
	this.inputEnabled = true;
	this.input.useHandCursor = true;
	this.events.onInputDown.add(this.onClick,this);

	//0,1,4,5,2,6,3,7,8,12


	//this.animations.add('rotate',[0,1,8,9,2,10,3,11,16,24,17,18,25,26,19,27,4,5,12,6],10, true);
	if (this.status == 'unlocked') {
		this.animations.play('rotate');
	}
	
 };
 
Planet.prototype = Object.create(Phaser.Sprite.prototype);  
Planet.prototype.constructor = Planet;

Planet.prototype.update = function() {
	if(this.game.time.now > this.text_timer && this.text_image) {
		this.text_image.destroy();
	}
};  


Planet.prototype.onClick = function() {
	
	if (this.status == 'unlocked') {
	switch (this.id) {
		case 1:
			game.state.start('play1');
		break;

		case 2:
			game.state.start('play2');
		break;

		case 3:
			game.state.start('play3');
		break; 
	}}
	else {
		this.text_image = this.game.add.text(this.x, this.y, this.text, {font: '30px Arial', fill: '#fff'});
		this.text_timer = this.game.time.now+5000;
	}
};

