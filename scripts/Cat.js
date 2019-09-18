class Cat extends Phaser.Physics.Arcade.Sprite{
    constructor(config)
	{
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.isClimbing = false;

        this.originalWidth = 21;
        this.body.setSize(this.originalWidth + 4, 40);
        this.currentStory = config.originalStory;
        this.left = false;
        this.down = true;
        this.ladder = null;
        // this.initScore = false;

        this.styleWhiteCenter =
		{
            fontFamily: 'ArcadeClassic',
            fill: 'White',
            fontSize: 'x-large',
            align: 'center',
            fixedWidth: 200,
        };

        this.scoreText = null;
        this.scoreLoop = 0;
    }

    update(){
        if(this.isClimbing)
		{
            this.climb();
        }
		else
		{
            this.checkScore();
            this.move();
        }
        // if(this.initScore)
		// {
        //     //TODO: identify what kind of enemy it is
        //     let x = this.scene.mouse.body.position.x;
        //     let y = this.scene.mouse.body.position.y;
        //     let height = this.scene.mouse.body.height;
        //     if(this.left)
		// 	{
        //         if(this.body.position.x < x - this.originalWidth)
		// 		{
        //             this.scene.pointGain_SFX.play();
        //             this.scene.highScore += 100;
        //             this.initScore = false;
        //             this.scoreText = this.scene.add.text(x - 50, y + height / 2, "100", this.styleWhiteCenter);
        //         }
        //     }
		// 	else
		// 	{
        //         if(this.body.position.x > x + this.originalWidth)
		// 		{
        //             this.scene.pointGain_SFX.play();
        //             this.scene.highScore += 100;
        //             this.initScore = false;
        //             this.scoreText = this.scene.add.text(x - 50, y + height / 2, "100", this.styleWhiteCenter);
        //         }
        //     }
        //     if(!this.scene.mouse.isCeiling)
		// 	{
        //         if(this.left)
		// 		{
        //             if(this.body.position.x < x - this.originalWidth)
		// 			{
        //                 this.scene.highScore += 100;
        //                 this.scoreText = this.scene.add.text(x - 50, y + height / 2, "100", this.styleWhiteCenter);
        //             }
        //         }
		// 		else
		// 		{
        //             if(this.body.position.x > x + this.originalWidth)
		// 			{
        //                 this.scene.highScore += 100;
        //                 this.scoreText = this.scene.add.text(x - 50, y + height / 2, "100", this.styleWhiteCenter);
        //             }
        //         }
        //         this.initScore = false;
        //     }
        // }
        if(this.scoreText)
		{
            this.scoreLoop = (this.scoreLoop + 1) % 50;
            if(!this.scoreLoop)
			{
                this.scoreText.destroy();
                this.scoreText=null;
            }
        }
    }

    checkScore(){
        if(!this.scoreText){
            let x = this.scene.mouse.body.position.x;
            let y = this.scene.mouse.body.position.y;
            let mouse_story=this.scene.mouse.currentStory;
            if(mouse_story==this.currentStory&&y<this.body.position.y-this.body.height/2){
                if(x>=this.body.position.x-this.body.width/2&&x<=this.body.position.x+this.body.width/2){
                    let height=this.scene.mouse.body.height;
                    this.addScoreText(x,y,height);
                }
            }
        }
    }

    addScoreText(x,y,height){
        this.scene.pointGain_SFX.play();
        this.scene.highScore += 100;
        this.scoreText = this.scene.add.text(x - 50, y + height / 2, "100", this.styleWhiteCenter);
    }

    climbOrNot(ladder){
        let mouse = this.scene.mouse;
        //stupid cat algorithmeow
        this.ladder = ladder;
        if(!this.isClimbing)
		{
            this.catAlgorithm(mouse);
        }
    }

    catAlgorithm(){

    }

    move(){

    }


    climb(){

    }

    climbOff()
    {
        this.isClimbing = false;
        this.body.setSize(this.originalWidth + 4, this.body.height);
        this.body.allowGravity=true;
    }

    enterSematary(){

    }
}
