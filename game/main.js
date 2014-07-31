var game = new Phaser.Game(800, 600, Phaser.AUTO, 'bmmpGame');

// Game States
game.state.add('startScreen', StartScreen);
game.state.add('loadingScreen', LoadingScreen);
game.state.add('chooseAvatar', ChooseAvatar);

game.state.add('chooseStarSystem', ChooseStarSystem);
game.state.add('chooseStar', ChooseStar);

game.state.add('play', Play);

game.state.add('endScreen', EndScreen);






game.state.start('startScreen');