class Mouse extends Phaser.Physics.Arcade.Sprite {

    //TODO change anything you want, but remeber to inform us all of new interfaces
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.original_x=config.x;
        this.original_y=config.y;
        this.alive = true;
        this.anims.play('stand');
		this.isOnLadder = false;
        this.isClimbing = false;
		this.lastPosition = 0;
		this.snapTo = null;
		
		this.originalWidth = 50;
		this.body.setSize(this.originalWidth + 2, this.body.height);

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.currentStory=0;
        this.left=true;
        this.lives=3;
    }

    update(cursors) {

    	//Turn on to test game over
		//this.scene.input.keyboard.on('keydown-S', ()=> {this.lives = 2;});
		//this.scene.input.keyboard.on('keydown-D', ()=> {this.lives = 1;});
		//this.scene.input.keyboard.on('keydown-F', ()=> {this.lives = 0;});
        
    }

    update() {
        this.checkLadderStatus();
                
		if(!this.isClimbing)
		{
			this.normalMovement();
		}
		
		if(this.isClimbing)
		{
			this.climbingMovement();
		}
    }
	
	normalMovement()
	{
		this.body.allowGravity = true;        
        if (this.cursors.left.isDown)
		{
			this.lastDir = true;
			this.body.velocity.x = -80;
			this.left=true;
			this.anims.play('left', true);
		}
		else if (this.cursors.right.isDown)
		{
			this.lastDir = false;
			this.body.velocity.x = 80;
			this.left=false;
			this.anims.play('right', true);
		}
		else
		{
			this.body.velocity.x = 0;
			if (this.lastDir == null || this.lastDir === false)
			{
				this.anims.play('rightStop');

			}
			else
			{
				this.anims.play('leftStop');
			}
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
					this.body.velocity.y = -150;
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
			this.body.velocity.y = -150;
		}
        
	}
	
	climbingMovement()
	{
		this.body.allowGravity = false;
		this.body.setSize(this.originalWidth, this.body.height);
		if(this.cursors.up.isDown)
		{
			this.body.velocity.y = -80;
		}
		else if(this.cursors.down.isDown)
		{
			this.body.velocity.y = 80;
		}
		else if(!this.cursors.down.isDown && !this.cursors.up.isDown)
		{		
			this.body.velocity.y = 0;
		}

		if (this.lastDir == null || this.lastDir === false)
		{
			this.anims.play('leftStop');

        }
        else
        {
            this.anims.play('leftStop');
        }
	}

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
    
    saveWindowPos(object1, object2)
    {
        object1.snapTo = object2.body.position.x;
    }    
}
