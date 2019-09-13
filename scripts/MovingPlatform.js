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
    }

    update(){
    }
}
