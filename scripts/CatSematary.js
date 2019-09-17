class CatSematary extends Phaser.Physics.Arcade.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this,1);
        config.scene.add.existing(this,1);
    }

    update(){

    }
}