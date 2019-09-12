class InitializationScene extends Phaser.Scene{
    constructor(test) {
        super({
            key: 'InitializationScene'
        });
    }

    preload() {
        const progress = this.add.graphics();

        //load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        //load complete event
        this.load.on('complete', () => {
            animations(this);
            progress.destroy();
            this.scene.start('ExampleScene');
        });

        this.load.image('background', '../images/background.jpg');
        //this.load.image('ground', '../images/platform.png');
        this.load.image('ground', '../images/platform_tileable_middle_10px.png');
        //this.load.image('ladder', '../images/ladder.png');
        this.load.image('ladder', '../images/manhole_tunnel_ladder.png');
		this.load.image('breaker', '../images/background.jpg');
		this.load.image('cat_sematary','../images/linku.png');
        this.load.image('MarioSprite', '../images/MarioSprite.png');

        this.load.spritesheet('mouse', '../images/MouseWalkFlippedSmall.png', {frameWidth: 40, frameHeight: 48});
        this.load.spritesheet('stupid_cat','../images/dude2.png',{ frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('maho_cat','../images/dude3.png',{ frameWidth: 32, frameHeight: 48 });
    }

}