var game = new Phaser.Game(800, 600, Phaser.AUTO, 'bmmpGame');
//Länge des Array ergibt die Anzahl der Sternsysteme
//Die Werte des Arrays sind die Anzahl der Planeten des Sternsystems mit Index i
var starSystems = new Array();
//add system 1 with 4 planets
starSystems.push(4);
starSystems.push(3);
var starSystemNames = new Array('Kleiner Wagen','Dreieck');
var starSystemImages = new Array('sternbild', 'sternbild');
var starSystemImagesHover = new Array('sternbild_hover','sternbild_hover');

var planetSystem1Images = new Array('planet','planet','planet','planet');
var planetSystem2Images = new Array('planet','planet','planet');

var max_hearts = 3;
if(!!localStorage){
	localStorage.setItem('avatarData',JSON.stringify({name:"Alf", points: 0, hearts: max_hearts }));
	// console.log(localStorage.getItem('avatarData'));
}




// Game States
game.state.add('startScreen', StartScreen);
game.state.add('loadingScreen', LoadingScreen);
game.state.add('chooseAvatar', ChooseAvatar);

game.state.add('chooseStarSystem', ChooseStarSystem);
game.state.add('chooseStar', ChooseStar);

game.state.add('play1', Play1);
game.state.add('play2', Play2);
game.state.add('play3', Play3);

game.state.add('endScreen', EndScreen);






game.state.start('startScreen');