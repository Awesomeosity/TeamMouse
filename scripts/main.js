let platforms;
let player;
let cursors;
let lastDir;

function load()
{
	let config = 
	{
		type: Phaser.AUTO,
		width: 800,
		height: 600,
		physics:{
			default: 'arcade',
			arcade:
			{
				gravity: {y:300},
				debug: false
			}
		},
		scene:
		{
			preload: preload,
			create: create,
			update: update
		}
	};
	
	let game = new Phaser.Game(config);
}

function preload()
{
	this.load.image('background', '../images/background.jpg');
	this.load.image('ground', '../images/platform.png');
	this.load.spritesheet('dude', '../images/dude.png', { frameWidth: 32, frameHeight: 48 });

}

function create()
{	
	this.add.image(400, 300, 'background');
	
	platforms = this.physics.add.staticGroup();
	
	platforms.create(400, 568, 'ground').setScale(2).refreshBody();
	
	player = this.physics.add.sprite(100, 450, 'dude');
	player.setBounce(0.2);
	player.setCollideWorldBounds(true);
	
	cursors = this.input.keyboard.createCursorKeys();

	
	this.anims.create({
		key: 'left',
		frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
		frameRate:10,
		repeat: -1
	});
	
	this.anims.create({
		key: 'leftStop',
		frames: [ {key: 'dude', frame: 5}],
		frameRate: 20
	});
	this.anims.create({
		key: 'rightStop',
		frames: [ {key: 'dude', frame: 0}],
		frameRate: 20
	})
	this.anims.create({
		key: 'right',
		frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
		frameRate: 10,
		repeat: -1
	});
	
	this.physics.add.collider(player, platforms);
}

function update()
{
	if (cursors.left.isDown)
	{
		lastDir = true;
		player.setVelocityX(-80);

		player.anims.play('left', true);
	}
	else if (cursors.right.isDown)
	{
		lastDir = false;
		player.setVelocityX(80);

		player.anims.play('right', true);
	}
	else
	{
		player.setVelocityX(0);
		if(lastDir == null || lastDir == false)
		{
			player.anims.play('leftStop');

		}
		else
		{
			player.anims.play('rightStop');
		}
	}

	if (cursors.up.isDown && player.body.touching.down)
	{
		player.setVelocityY(-200);
	}
}
