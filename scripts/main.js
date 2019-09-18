function load()
{
	let config = 
	{
		type: Phaser.AUTO,
		width: 1000,
		height: 800,
		physics:{
			default: 'arcade',
			arcade:
			{
				gravity: {y:400},
			}
		},
		scene:[MenuScene, InitializationScene, Level2, ExampleScene, GameUI, GameOverScene, LevelWinScene],


	};
	var game = new Phaser.Game(config);

}

