function load()
{
	let config = 
	{
		type: Phaser.AUTO,
		width: 800,
		height: 800,
		physics:{
			default: 'arcade',
			arcade:
			{
				gravity: {y:400},
				debug: false
			}
		},
		scene:[MenuScene,InitializationScene, Level2,ExampleScene, GameUI, GameOverScene],
	};
	var game = new Phaser.Game(config);

}