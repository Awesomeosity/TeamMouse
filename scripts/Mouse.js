class Mouse extends Phaser.Physics.Arcade.Sprite {

    //TODO change anything you want, but remeber to inform us all of new interfaces
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.alive = true;
        this.anims.play('stand');
		this.isOnLadder = false;
        this.isClimbing = false;
		this.lastPosition = 0;
		this.snapTo = null;
		
		this.originalWidth = this.body.width;
		this.body.setSize(this.body.width + 2, this.body.height);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update(cursors) {
		this.cursors = cursors;
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

			this.anims.play('left', true);
		}
		else if (this.cursors.right.isDown)
		{
			this.lastDir = false;
			this.body.velocity.x = 80;

			this.anims.play('right', true);
		}
		else
		{
			this.body.velocity.x = 0;
			if (this.lastDir == null || this.lastDir === false)
			{
				this.anims.play('leftStop');

			}
			else
			{
				this.anims.play('rightStop');
			}
		}

		//If we are in front of a ladder and we're not moving up or down
		if((this.cursors.up.isDown || this.cursors.down.isDown) && this.isOnLadder && this.body.velocity.y == 0)
		{
			this.body.position.x = this.snapTo
			this.isClimbing = true;
		}

		//Otherwise, we can jump
		else if(this.cursors.up.isDown && this.body.touching.down && this.body.velocity.y == 0)
		{
			this.body.velocity.y = -200;
		}
	}
	
	climbingMovement()
	{
		this.body.allowGravity = false;
		this.body.setSize(this.originalWidth, this.body.height);
		if(this.cursors.up.isDown)
		{
			this.body.velocity.y = -40;
		}
		else if(this.cursors.down.isDown)
		{
			this.body.velocity.y = 40;
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
			this.anims.play('rightStop');
		}
	}

    attack(weapon,enemy){

    }

    hurtBy(enemy) {
    }

    die() {

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
}
