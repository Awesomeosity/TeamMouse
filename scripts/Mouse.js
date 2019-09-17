class Mouse extends Phaser.Physics.Arcade.Sprite {

    //TODO change anything you want, but remeber to inform us all of new interfaces
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
		
		
		//STATIC VARIABLES DON'T CHANGE OR ASSIGN TO THESE//
		this.StickToCeilingDuration = 2000;
		this.PlayerMovementVelocity = 80;
		this.LadderClimbingVelocity = 80;
		this.JumpVelocityY = 250;
		this.spriteFattening = 4;
		this.SwingSpeed = 300;

        this.original_x=config.x;
        this.original_y=config.y;
        this.alive = true;
        this.anims.play('stand');
		this.isOnLadder = false;
        this.isClimbing = false;
        this.isWalking = false; 	//Mouse walking SFX
		this.lastPosition = 0;
		this.snapTo = null;
		this.isCeiling = false;
		this.stickTimer;
		this.platform;
		this.savedYPos;
        this.savedXPos;
		this.swingVelocity;

		
		this.originalWidth = 21;
		this.body.setSize(this.originalWidth + this.spriteFattening, this.body.height);

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.currentStory=0;
        this.left=true;
        this.lives=3;

        this.isHoldingCucumber=false;
        this.cucumberLoop=1000;
    }

    update() {
        this.checkLadderStatus();

        if(this.isHoldingCucumber){
        	this.cucumberLoop--;
        	if(this.cucumberLoop<=0){
        		// alert('over');
        		this.isHoldingCucumber=false;
        		this.cucumberLoop=1000;
			}
		}
		
		if(this.platform != null)
		{
			this.body.velocity.x = this.platform.body.velocity.x;
            this.body.velocity.y = this.platform.body.velocity.y;
		}
		
		if(this.cursors.space.isUp && this.isCeiling)
		{
			if(this.stickTimer != null)
			{
				this.stickTimer.remove();
			}
			this.body.allowGravity = true;
			this.isCeiling = false;
			this.platform = null;
			this.body.velocity.y = 0;
			this.body.velocity.x = this.swingVelocity;
		}
		
		if(this.isCeiling)
		{
			//Mouse walking SFX
			this.isWalking = false;

			if(this.cursors.right.isDown)
			{
				this.swingVelocity = this.SwingSpeed;
			}
			else if(this.cursors.left.isDown)
			{
				this.swingVelocity = -1 * this.SwingSpeed;
			}
			else
			{
				this.swingVelocity = 0;
			}

			return;
		}
                
		if(!this.isClimbing)
		{
			this.normalMovement();
		}
		
		if(this.isClimbing)
		{
			this.climbingMovement();
		}
    }
	
	///MOVEMENT CODE///
	normalMovement()
	{
		if(this.platform == null)
		{
			this.body.allowGravity = true;
		}
		else
		{
			this.body.allowGravity = false;
		}
        if (this.cursors.left.isDown)
		{
			//For mouse walking SFX
			this.isWalking = !!this.body.touching.down;

			this.lastDir = true;
			if(this.body.velocity.x >= -1 * this.PlayerMovementVelocity || this.body.touching.down)
			{
				this.body.velocity.x = -1 * this.PlayerMovementVelocity;
			}
			this.left=true;
			if(this.isHoldingCucumber){
				this.anims.play('cu_left',true);
			}
			else{
				this.anims.play('left', true);
			}

		}
		else if (this.cursors.right.isDown)
		{
			//For mouse walking SFX
			this.isWalking = !!this.body.touching.down;

			this.lastDir = false;
			if(this.body.velocity.x <= this.PlayerMovementVelocity || this.body.touching.down)
			{
				this.body.velocity.x = this.PlayerMovementVelocity;
			}

			this.left=false;
			if(this.isHoldingCucumber){
				this.anims.play('cu_right',true);
			}
			else{
				this.anims.play('right', true);
			}
		}
		else
		{
			this.isWalking = false;
			this.body.velocity.x = 0;
			this.resetSprite();
		}

		if(this.isOnLadder && this.body.velocity.y == 0)
		{
			if(this.cursors.up.isDown)
			{
				//Mouse walking SFX
				this.isWalking = false;

				//Offset the player's position, to check if we're at the top of a ladder.
				this.body.position.y -= 2;
				if(this.scene.physics.overlap(this.scene.mouse, this.scene.ladders)&&!this.isHoldingCucumber)
				{
					this.body.position.x = this.snapTo;
					this.body.velocity.x = 0;
					this.isClimbing = true;
				}
				this.body.position.y += 2;
			}
			else if(this.cursors.down.isDown&&!this.isHoldingCucumber)
			{
				//Mouse walking SFX
				this.isWalking = false;

				this.body.position.x = this.snapTo;
				this.body.velocity.x = 0;
				this.isClimbing = true;
			}    
		}
		//Otherwise, we can jump
		if(this.cursors.space.isDown && this.body.touching.down&&!this.isHoldingCucumber)
		{
			this.body.position.y -= 5;
			//Mouse walking SFX
			this.isWalking = false;
			this.scene.mouseJump_SFX.play();
			this.body.velocity.y = -1 * this.JumpVelocityY;
		}
        
	}
	
	climbingMovement()
	{
		this.body.allowGravity = false;
		this.body.setSize(this.originalWidth, this.body.height);
		if(this.cursors.up.isDown)
		{
			this.isWalking = false;
			this.body.velocity.y = -1 * this.LadderClimbingVelocity;
		}
		else if(this.cursors.down.isDown)
		{
			this.isWalking = false;
			this.body.velocity.y = this.LadderClimbingVelocity;
		}
		else if(!this.cursors.down.isDown && !this.cursors.up.isDown)
		{
			this.isWalking = false;
			this.body.velocity.y = 0;
		}

		this.resetSprite();
	}

	///MAIN MOUSE FUNCTIONS///
    attack(weapon,enemy){

    }

    //Takes damage from an enemy
    hurtBy(enemy) {
    	if(this.lives-1<0){
    		this.die();
		}else {
    		this.lives--;
			this.body.position.x=this.original_x;
			this.body.position.y=this.original_y-50;
		}
    	// this.isHoldingCucumber=false;
    }

    //Probably play a death animation
    die() {
		//Lose condition

		this.scene.scene.launch('GameOverScene', this.scene.highScore);
		this.scene.scene.pause();
        this.alive=false;
    }
	
	///MOVEMENT HELPER FUNCTIONS///
	climbOff()
	{
		this.isClimbing = false;
		this.body.setSize(this.originalWidth + this.spriteFattening, this.body.height);
	}
	
	saveLadderPos(object1, object2)
	{
		object1.snapTo = object2.body.position.x - 2;
	}
    
    checkLadderStatus()
    {
        if(this.scene.physics.overlap(this.scene.mouse,this.scene.ladders, this.saveLadderPos))
		{
			this.isOnLadder = true;
		}
		else
		{
            this.isOnLadder = false;
            this.snapTo = null;
            this.climbOff();
		}
    }
	
	hangOut(platform)
	{
		if(this.body.touching.up && this.cursors.space.isDown && !this.isCeiling&&!this.isHoldingCucumber)
		{
			this.resetSprite();
			this.stickTimer = this.scene.time.delayedCall(this.StickToCeilingDuration, () =>{
				console.log("UNSTICK");
				if(this.isCeiling)
				{
					this.isCeiling = false;
					this.body.allowGravity = true;
					this.body.velocity.y = 0;
					this.body.velocity.x = this.swingVelocity;

				}
			}, null, this);

			this.body.velocity.x = 0;
            this.body.velocity.y = 0;
			this.isCeiling = true;
			this.body.allowGravity = false;
			if(this.left){
				this.setTexture('climb_left');
			}else{
				this.setTexture('climb_right');
			}

		}
	}
    
    ridePlatform(platform)
    {
        if(this.body.touching.up && this.cursors.space.isDown && !this.isCeiling&&!this.isHoldingCucumber)
		{
			this.resetSprite();
			this.stickTimer = this.scene.time.delayedCall(this.StickToCeilingDuration, () =>{
				console.log("UNSTICK");
				if(this.isCeiling)
				{
					this.isCeiling = false;
					this.body.allowGravity = true;
					this.platform = null;
					this.body.velocity.y = 0;
					this.body.velocity.x = this.swingVelocity;
				}
			}, null, this);

			this.body.velocity.x = platform.body.velocity.x;
            this.body.velocity.y = platform.body.velocity.y;
			this.isCeiling = true;
			this.body.allowGravity = false;
			this.platform = platform;
			if(this.left){
				this.setTexture('climb_left');
			}else{
				this.setTexture('climb_right');
			}


		}
		//If we collide with a new platform
		else if(this.isCeiling && this.cursors.space.isDown)
		{
			//Update the platform reference.
			this.platform = platform;
		}
    }
		
	///ETC HELPER FUNCTIONS///
	resetSprite()
	{
		if (this.lastDir == null || this.lastDir === false)
		{
			if(this.isHoldingCucumber){
				this.anims.play('cu_rightStop');
			}else{
				this.anims.play('rightStop');
			}


		}
		else
		{
			if(this.isHoldingCucumber){
				this.anims.play('cu_leftStop');
			}else{
				this.anims.play('leftStop');
			}
		}
	}

}
