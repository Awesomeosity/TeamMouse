class Mouse extends Phaser.Physics.Arcade.Sprite {

    //TODO change anything you want, but remeber to inform us all of new interfaces
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.alive = true;
        this.anims.play('stand');
        this.isClimbing=false;
    }

    update(cursors) {
		this.cursors = cursors;
        if(this.isOnLadder)
        {
			if(this.isClimbing)
			{
				this.body.velocity.x = 0;
				this.body.allowGravity = false;
				this.climbingMovement();
			}
			else
			{
				if(this.cursors.up.isDown)
				{
					this.body.velocity.y = -40;
					this.isClimbing=true;
					this.body.allowGravity = false;

				}
				else if(this.cursors.down.isDown)
				{
					this.body.velocity.y = 40;
					this.isClimbing=true;
					this.body.allowGravity = false;
				}
				else
				{
					this.normalMovement();
				}
			}
        }
		else
		{
			this.normalMovement();
		}
    }
	
	normalMovement()
	{
		if(this.cursors.up.isDown && this.body.touching.down)
		{
			this.body.velocity.y = -200;
		}

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

		this.isClimbing = false;
	}
	
	climbingMovement()
	{
		if(this.cursors.up.isDown)
		{
			this.body.velocity.y = -40;
			this.isClimbing=true;
		}
		else if(this.cursors.down.isDown)
		{
			this.body.velocity.y = 40;
			this.isClimbing=true;
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
}
