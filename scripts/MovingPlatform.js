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
        this.newOrigin = config.width / this.frame.realWidth / 2;
        this.setOrigin(this.newOrigin, .5);
        this.setSizeToFrame(this.frame);
        this.setCrop(0,0,config.width, config.height);

        this.velocityY = config.velocityY;
        this.startY;
        this.endY;
        if((this.velocityY > 0 && config.startY > config.endY) || (this.velocityY < 0 && config.startY < config.endY))
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
        this.body.position.y += this.velocityY;
        if(this.body.position.y >= this.endY && this.velocityY > 0)
        {
            this.body.position.y = this.startY;
        }

        if(this.body.position.y <= this.endY && this.velocityY < 0)
        {
            this.body.position.y = this.startY;
        }

    }
}
