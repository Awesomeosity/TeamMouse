class ExampleScene extends Phaser.Scene{
    constructor(test) {
        super({
            key: 'ExampleScene'
        });
    }

    create()
    {
        //TODO after colliding with another platform, this should be set to false

        this.add.image(400, 300, 'background');

        this.ladders = this.physics.add.group();
        this.ladders.create(400, 400, 'ladder');
        Phaser.Actions.Call(this.ladders.getChildren(), function (ladder) {
            ladder.body.allowGravity = false;
        },this);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(616,216,'ground').setScale(1).refreshBody();

        this.mouse=new Mouse({
            scene:this,
            key:'mouse',
            x:100,
            y:510
        });
        this.mouse.body.collideWorldBounds=true;

        this.cursors = this.input.keyboard.createCursorKeys();

		let that = this;

		this.physics.add.collider(this.mouse,this.platforms, (d) =>{
			if(that.mouse.isClimbing)
			{
				that.mouse.body.allowGravity = true;
			}
		});
    }

    update()
    {
        let that = this;
        this.mouse.isOnLadder = false;
        this.mouse.body.allowGravity=true;

        this.physics.overlap(this.mouse,this.ladders,() => {
            that.mouse.isOnLadder = true;
        });
        this.mouse.update(this.cursors);

        //TODO what happens after reaching the top
        if(this.mouse.body.allowGravity){
            this.mouse.body.velocity.y=0;
        }
    }
	
}