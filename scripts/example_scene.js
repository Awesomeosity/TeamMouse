class ExampleScene extends Phaser.Scene{
    constructor(test) {
        super({
            key: 'ExampleScene'
        });
    }

    create()
    {
        //TODO after colliding with another platform, this should be set to false

        // this.isClimbing=false;

        this.add.image(400, 300, 'background');

        this.ladders = this.physics.add.group();
        this.ladders.create(400, 400, 'ladder');
        Phaser.Actions.Call(this.ladders.getChildren(), function (ladder) {
            ladder.body.allowGravity = false;
        },this);

        this.grounds=this.physics.add.staticGroup();
        this.grounds.create(400,568,'ground').setScale(2).refreshBody();

        this.platforms = this.physics.add.staticGroup();
		this.platforms.create(616, 216, 'ground');

        this.mouse=new Mouse({
            scene:this,
            key:'mouse',
            x:100,
            y:510
        });
        this.mouse.body.collideWorldBounds=true;

        this.cursors = this.input.keyboard.createCursorKeys();

        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        //     frameRate:10,
        //     repeat: -1
        // });
        //
        // this.anims.create({
        //     key: 'leftStop',
        //     frames: [ {key: 'dude', frame: 5}],
        //     frameRate: 20
        // });
        // this.anims.create({
        //     key: 'rightStop',
        //     frames: [ {key: 'dude', frame: 0}],
        //     frameRate: 20
        // });
        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        //     frameRate: 10,
        //     repeat: -1
        // });
		let that = this;

		this.physics.add.collider(this.mouse,this.grounds);
		//TODO need to be changed
		this.physics.add.collider(this.mouse,this.platforms, (d) =>{
			if(that.mouse.isClimbing)
			{				
				if(that.mouse.body.touching.up)
				{
					that.mouse.body.position.y -= 75;
				}
				else
				{
					that.mouse.isClimbing = false;
					that.mouse.body.allowGravity = true;
				}
			}
		});

    }

    update()
    {
		let that = this;
		this.mouse.isOnLadder = false;
		this.physics.overlap(this.mouse,this.ladders,(d) => {
			that.mouse.isOnLadder = true;
		});
        this.mouse.update(this.cursors);
    }
	
}