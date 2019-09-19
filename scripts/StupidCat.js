class StupidCat extends Cat{
    constructor(config,mouse)
	{
        super(config,mouse);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.isMuggle = true;
    }

    move(){
        if(this.left)
		{
            this.body.velocity.x =- 120;
            this.anims.play('scleft', true);
        }
		else
		{
            this.body.velocity.x = 120;
            this.anims.play('scright', true);
        }
    }

    climb(){
        //stupid cat can only climb down (because it's stupid) //hahah
        this.anims.play('scclimb',true);
        this.body.position.x = this.ladder.body.position.x;
        this.body.velocity.x = 0;
        this.body.setSize(this.originalWidth, this.body.height);
        this.body.velocity.y = 40;
    }

    catAlgorithm(mouse){
        if(this.currentStory != this.ladder.story)
		{
			if(this.currentStory - mouse.currentStory == 0)
			{
                this.isClimbing = false;
            }
			else if(this.currentStory - mouse.currentStory == 1)
			{
                if((this.left && this.body.position.x <= mouse.body.position.x)||(!this.left && this.body.position.x >= mouse.body.position.x))
				{
                    this.isClimbing = true;
                }
				else
				{
                    this.isClimbing = this.left ^ mouse.left;
                }
            }
			else
			{
                this.isClimbing = false;
            }
        }
    }
}