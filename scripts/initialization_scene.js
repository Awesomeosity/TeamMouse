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

        //Load up the basic textures needed
        this.load.image('sewer_background', '../images/environment_background concept (tileable).png');     //Main background
        this.load.image('ground', '../images/platform_tileable_middle_10px.png');                           //Platforms
        this.load.image('ladder', '../images/manhole_tunnel_ladder.png');                                   //Ladders
		this.load.image('LifeUI-Temp', '../images/MouseHeadUITemp.png');                                    //Temp Life Icon
        this.load.image('breaker', '../images/background.jpg');
        this.load.image('cat_sematary','../images/linku.png');

        //Load in the spritesheets
        this.load.spritesheet('mouse', '../images/MouseWalkFlippedSmall.png', {frameWidth: 56, frameHeight: 67});
        this.load.spritesheet('stupid_cat','../images/cat walking pixel_w37h54.png',{ frameWidth: 37, frameHeight: 54 });
    }

}