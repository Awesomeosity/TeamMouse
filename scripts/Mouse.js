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
		this.JumpVelocityY = 300;
		

        this.original_x=config.x;
        this.original_y=config.y;
        this.alive = true;
        this.anims.play('stand');
		this.isOnLadder = false;
        this.isClimbing = false;
		this.lastPosition = 0;
		this.snapTo = null;
		this.isCeiling = false;
		this.stickTimer;

		
		this.originalWidth = 50;
		this.body.setSize(this.originalWidth + 2, this.body.height);

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.currentStory=0;
        this.left=true;
        this.lives=3;
    }

    update() {
        this.checkLadderStatus();
		
		//TODO REMOVE THIS
		if(this.cursors.down.isDown && this.body.allowGravity == false && !this.isClimbing)
		{
			this.stickTimer.remove();
			this.body.allowGravity = true;
			this.isCeiling = false;
		}
		
		if(this.isCeiling)
		{
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
		this.body.allowGravity = true;        
        if (this.cursors.left.isDown)
		{
			this.lastDir = true;
			this.body.velocity.x = -1 * this.PlayerMovementVelocity;
			this.left=true;
			this.anims.play('left', true);
		}
		else if (this.cursors.right.isDown)
		{
			this.lastDir = false;
			this.body.velocity.x = this.PlayerMovementVelocity;
			this.left=false;
			this.anims.play('right', true);
		}
		else
		{
			this.body.velocity.x = 0;
			this.resetSprite();
		}

		if(this.isOnLadder && this.body.velocity.y == 0)
		{
			if(this.cursors.up.isDown)
			{
				//Offset the player's position, to check if we're at the top of a ladder.
				this.body.position.y -= 2;
				if(this.scene.physics.overlap(this.scene.mouse, this.scene.ladders))
				{
					this.body.position.x = this.snapTo;
					this.body.velocity.x = 0;
					this.isClimbing = true;
				}
				else
				{
					this.body.velocity.y = -1 * this.JumpVelocityY;
				}
				this.body.position.y += 2;
			}
			else if(this.cursors.down.isDown)
			{
				this.body.position.x = this.snapTo;
				this.body.velocity.x = 0;
				this.isClimbing = true;
			}
		}
		//Otherwise, we can jump
		else if(this.cursors.up.isDown && this.body.touching.down && this.body.velocity.y == 0)
		{
			this.body.velocity.y = -1 * this.JumpVelocityY;
		}
        
	}
	
	climbingMovement()
	{
		this.body.allowGravity = false;
		this.body.setSize(this.originalWidth, this.body.height);
		if(this.cursors.up.isDown)
		{
			this.body.velocity.y = -1 * this.PlayerMovementVelocity;
		}
		else if(this.cursors.down.isDown)
		{
			this.body.velocity.y = this.PlayerMovementVelocity;
		}
		else if(!this.cursors.down.isDown && !this.cursors.up.isDown)
		{		
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
			this.body.position.y=this.original_y;
		}
    }

    //Probably play a death animation
    die() {
		//Lose condition

		this.scene.launch('GameOverScene');
		this.scene.pause();
        this.alive=false;
		alert("YOU DIE");
    }
	
	///MOVEMENT HELPER FUNCTIONS///
	climbOff()
	{
		this.isClimbing = false;
		this.body.setSize(this.originalWidth + 2, this.body.height);
	}
	
	saveLadderPos(object1, object2)
	{
		object1.snapTo = object2.body.position.x;
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
	
	hangOut()
	{
		if(this.body.touching.up)
		{
			this.resetSprite();
			this.stickTimer = this.scene.time.delayedCall(this.StickToCeilingDuration, () =>{
				console.log("UNSTICK");
				if(this.isCeiling)
				{
					this.isCeiling = false;
					this.body.allowGravity = true;
				}
			}, null, this);

			this.body.velocity.x = 0;
			this.isCeiling = true;
			this.body.allowGravity = false;
		}
	}
	
	///ETC HELPER FUNCTIONS///
	resetSprite()
	{
		if (this.lastDir == null || this.lastDir === false)
		{
			this.anims.play('rightStop');

		}
		else
		{
			this.anims.play('leftStop');
		}
	}

}
