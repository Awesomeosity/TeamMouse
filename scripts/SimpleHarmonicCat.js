class SimpleHarmonicCat extends Cat{
    constructor(config,mouse)
	{
        super(config,mouse);
        this.right_border = config.right_border;
        this.left_border = config.left_border;
    }

    move() {
        // alert('yes');
        if(this.left){
            this.body.velocity.x = -120;
            this.anims.play('scleft', true);
            if(this.body.position.x <= this.left_border)
			{
                this.left = false;
            }
        }
		else
		{
            this.body.velocity.x = 120;
            this.anims.play('scright', true);
            if(this.body.position.x>=this.right_border)
			{
                this.left = true;
            }
        }
    }

}