class Platform extends Phaser.Physics.Arcade.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this,1);
        config.scene.add.existing(this,1);

        if(config.setScale){
            this.setScale(config.scale);
        }else if(config.setSize){
            this.displayWidth = config.width;
            this.displayHeight = config.height;
        }

        this.body.updateFromGameObject();

        this.story=config.story;
    }

    update(){

    }
}