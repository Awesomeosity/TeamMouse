class Ladder extends Phaser.Physics.Arcade.Sprite{
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

        this.body.allowGravity=false;
        this.story=config.story;
    }

    update(){

    }
}