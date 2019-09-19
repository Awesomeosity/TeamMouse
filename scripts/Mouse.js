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
		this.CucumberDuration = 10000;
		this.cucumberBlink=false;
		this.originalWidth = 21;
		//End of Static Variables//

        this.original_x=config.x;
        this.original_y=config.y;
        this.alive = true;
        this.anims.play('stand');
		this.isOnLadder = false;
        this.isClimbing = false;
        this.isWalking = false; 	//Mouse walking SFX
		this.snapTo = null;
		this.isCeiling = false;
		this.stickTimer;
		this.cucumberTimer;
		this.cucumberBlinkTimer = null;
		this.platform;
		this.swingVelocity;

		this.body.setSize(this.originalWidth + this.spriteFattening, this.body.height);

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.currentStory=0;
        this.lives=3;

        this.isHoldingCucumber=false;
    }

    update() {
		if(this.platform != null)
		{
			//Update this body's velocity with the velocity of the platform's, to make it look like we're moving with the platform.
			if(this.body.touching.down || this.isCeiling)
			{
				this.body.velocity.x = this.platform.body.velocity.x;
				this.body.velocity.y = this.platform.body.velocity.y;
			}
			else
			{
				this.platform = null;
			}

		}
		
		if(this.cursors.space.isUp && this.isCeiling)
		{
			this.unstick();
		}
		
		if(this.isCeiling)
		{
			this.swingMovement();
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
		
		this.normalLeftRightMovement();
		
		if(this.isHoldingCucumber)
		{
			return;
		}

		
		this.normalLadderMovement();

		//Otherwise, we can jump
		if(this.cursors.space.isDown && this.body.touching.down)
		{
			// this.checkPass();
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
			this.body.velocity.y = -1 * this.LadderClimbingVelocity;
		}
		else if(this.cursors.down.isDown)
		{
			this.body.velocity.y = this.LadderClimbingVelocity;
		}
		else
		{
			this.body.velocity.y = 0;
		}

		this.isWalking = false;
		this.resetSprite();
	}
	
	swingMovement()
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
	}
	
	unstick()
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

	///MAIN MOUSE FUNCTIONS///
    //Takes damage from an enemy
    hurtBy(enemy) {
    	this.scene.lifeLost_SFX.play();
    	if(this.lives-1<0){
    		this.die();
		}
		else
		{
    		this.lives--;
			this.body.position.x = this.original_x;
			this.body.position.y = this.original_y - 50;
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
			this.platform = null;
			this.isCeiling = false;
			this.isClimbing = false;
		}
    }

    //Probably play a death animation
    die()
	{
		//Lose condition
		//Stop all audio
		this.scene.mouseJump_SFX.stop();
		this.scene.pointGain_SFX.stop();
		this.scene.mouseWalk_SFX.stop();
		this.scene.lifeLost_SFX.stop();
		this.scene.levelMus.stop();
		this.scene.scene.launch('GameOverScene', this.scene.highScore);
		this.scene.scene.pause();
        this.alive = false;
    }
	
	///MOVEMENT HELPER FUNCTIONS///
	climbOff()
	{
		this.isClimbing = false;
		this.body.setSize(this.originalWidth + this.spriteFattening, this.body.height);
	}
	
	saveLadderPos(object1, object2)
	{
		//Things mysteriously work if offset by 2... might be an issue with where the xposition is calculated by phaser.
		object1.snapTo = object2.body.position.x - 2;
		object1.isOnLadder = true;
	}
    
    checkLadderStatus()
    {
		this.isOnLadder = false;
		this.snapTo = null;
		this.climbOff();
    }

    // checkPass()
	// {
	// 	let cur_story = this.currentStory;
	// 	let cur_x = this.body.position.x;
	// 	this.scene.cats.forEach(function (cat)
	// 	{
	// 		if(cat.currentStory == cur_story)
	// 		{
	// 			if(cat.left)
	// 			{
	// 				if(cat.body.position.x>=cur_x)
	// 				{
	// 					cat.initScore=true;
	// 				}
	// 			}
	// 			else
	// 			{
	// 				if(cat.body.position.x<=cur_x)
	// 				{
	// 					cat.initScore=true;
	// 				}
	// 			}
	// 		}
	// 	});
	// }
	
	hangOut(platform)
	{
		if(this.body.touching.up && this.cursors.space.isDown && !this.isCeiling && !this.isHoldingCucumber)
		{
			// this.checkPass();
			this.resetSprite();
			this.stickTimer = this.scene.time.delayedCall(this.StickToCeilingDuration, () =>{
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
			if(this.lastDir)
			{
				this.setTexture('climb_left');
			}
			else
			{
				this.setTexture('climb_right');
			}

		}
	}
    
    ridePlatform(platform)
    {
        if(this.body.touching.up && this.cursors.space.isDown && !this.isCeiling && !this.isHoldingCucumber)
		{
			// this.checkPass();
			this.resetSprite();
			this.stickTimer = this.scene.time.delayedCall(this.StickToCeilingDuration, () =>{
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
			if(this.lastDir)
			{
				this.setTexture('climb_left');
			}
			else
			{
				this.setTexture('climb_right');
			}
		}
		
		else
		{
			this.body.velocity.x = platform.body.velocity.x;
			this.body.velocity.y = platform.body.velocity.y;
			this.platform = platform;
		}

    }
	
	normalLeftRightMovement()
	{
		if (this.cursors.left.isDown)
		{
			//For mouse walking SFX
			this.isWalking = this.body.touching.down;

			this.lastDir = true;
			if(this.body.velocity.x >= -1 * this.PlayerMovementVelocity || (this.body.velocity.y == 0 && this.body.touching.down))
			{
				if(this.platform == null)
				{
					this.body.velocity.x = -1 * this.PlayerMovementVelocity;
				}
				else
				{
					this.body.velocity.x += -1 * this.PlayerMovementVelocity;
				}
			}
			if(this.isHoldingCucumber)
			{
				if(this.cucumberBlink){
					this.anims.play('cu_blink_left',true);
				}
				else{
					this.anims.play('cu_left',true);
				}

			}
			else
			{
				if(this.body.velocity.x == -this.SwingSpeed)
				{
					this.setTexture('swing_left');
				}
				
				this.anims.play('left',true);
			}

		}
		else if (this.cursors.right.isDown)
		{
			//For mouse walking SFX
			this.isWalking = this.body.touching.down;

			this.lastDir = false;
			if(this.body.velocity.x <= this.PlayerMovementVelocity || (this.body.velocity.y == 0 && this.body.touching.down))
			{
				if(this.platform == null)
				{
					this.body.velocity.x = this.PlayerMovementVelocity;
				}
				else
				{
					this.body.velocity.x += this.PlayerMovementVelocity;
				}

				this.body.velocity.x = this.PlayerMovementVelocity;
			}

			if(this.isHoldingCucumber)
			{
				if(this.cucumberBlink){
					this.anims.play('cu_blink_right',true);
				}
				else{
					this.anims.play('cu_right',true);
				}

			}
			else
			{
				if(this.body.velocity.x == this.SwingSpeed)
				{
					this.setTexture('swing_right');
				}

				this.anims.play('right',true);
			}
		}
		else
		{
			this.isWalking = false;
			if(this.platform == null)
			{
				this.body.velocity.x = 0;
			}
			else
			{
				this.body.velocity.x += 0;
			}

			this.resetSprite();
		}

	}
	
	normalLadderMovement()
	{
		if(this.isOnLadder && this.body.velocity.y == 0)
		{
			if(this.cursors.up.isDown)
			{
				//Mouse walking SFX
				this.isWalking = false;

				//Offset the player's position, to check if we're at the top of a ladder.
				this.body.position.y -= 2;
				if(this.scene.checkOverlap())
				{
					this.body.position.x = this.snapTo;
					this.body.velocity.x = 0;
					this.isClimbing = true;
				}
				this.body.position.y += 2;
			}
			else if(this.cursors.down.isDown)
			{
				//Mouse walking SFX
				this.isWalking = false;

				this.body.position.x = this.snapTo;
				this.body.velocity.x = 0;
				this.isClimbing = true;
			}    
		}
	}
		
	///ETC HELPER FUNCTIONS///
	resetSprite()
	{
		if (!this.left)
		{
			if(this.isHoldingCucumber)
			{
				if(this.cucumberBlink){
					this.anims.play('cu_blink_rightStop');
				}else{
					this.anims.play('cu_rightStop');
				}

			}
			else
			{
				this.anims.play('rightStop');
			}
		}
		else
		{
			if(this.isHoldingCucumber)
			{
				if(this.cucumberBlink){
					this.anims.play('cu_blink_leftStop');
				}else{
					this.anims.play('cu_leftStop');
				}
			}
			else
			{
				this.anims.play('leftStop');
			}
		}
	}
	
	setCucumber()
	{
		this.isHoldingCucumber = true;
		this.cucumberTimer = this.scene.time.delayedCall(this.CucumberDuration, () =>
		{
			console.log("Cucumber Down");
			this.isHoldingCucumber = false;
			this.cucumberBlink=false;
		}, null, this);
		this.cucumberBlinkTimer = this.scene.time.delayedCall(this.CucumberDuration/2, () =>
		{
			this.cucumberBlink=true;
		}, null, this);
	}
}
