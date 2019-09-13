class MovingPlatform extends Phaser.Physics.Arcade.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this, 0);
        config.scene.add.existing(this, 0);

        if(config.setScale){
            this.setScale(config.scale);
        }else if(config.setSize){
            this.displayWidth = config.width;
            this.displayHeight = config.height;
        }
        
        this.body.setSize(config.width, config.height);


        //Cuts out an appropriate section of the sprite and aligns it within the GameObject bounds
        this.newOrigin = config.width / this.frame.realWidth / 2;
        this.setOrigin(this.newOrigin, .5);
        this.setSizeToFrame(this.frame);
        this.setCrop(0,0,config.width, config.height);

        this.startY;
        this.endY;
		//Fixes the endpoints
        if((config.velocityY > 0 && config.startY > config.endY) || (config.velocityY < 0 && config.startY < config.endY))
        {
            this.startY = config.endY;
            this.endY = config.startY;
        }
        else
        {
            this.startY = config.startY;
            this.endY = config.endY;
        }
    }

    update(){
		//Reset the block as appropriate.
        if(this.body.position.y >= this.endY && this.body.velocity.y > 0)
        {
            this.body.position.y = this.startY;
        }

        if(this.body.position.y <= this.endY && this.body.velocity.y  < 0)
        {
            this.body.position.y = this.startY;
        }
    }
}
