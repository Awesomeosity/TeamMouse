class MovingPlatform extends Phaser.Physics.Arcade.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        if(config.setScale){
            this.setScale(config.scale);
        }else if(config.setSize){
            this.displayWidth = config.width;
            this.displayHeight = config.height;
        }
        
        this.body.setSize(config.width, config.height);


        //Cuts out an appropriate section of the sprite and aligns it within the GameObject bounds
        this.newOrigin = config.width / this.frame.realWidth / 2
        this.setOrigin(this.newOrigin, .5);
        this.setSizeToFrame(this.frame);
        this.setCrop(0,0,config.width, config.height);
        this.body.setAllowGravity(false);

        this.body.setVelocityY(config.velocityY);
        this.startY = config.startY;
        this.endY = config.endY;
    }

    update(){
        if(this.body.position.y >= this.endY)
        {
            console.log(this.body.velocity.y);
            this.body.position.y = this.startY;
        }

    }
}
