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
				debug: false
			}
		},
		scene:[MenuScene,InitializationScene, ExampleScene, GameUI, GameOverScene],


	};
	var game = new Phaser.Game(config);

}