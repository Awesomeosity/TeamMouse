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
        this.load.image('ground', '../images/platform.png');
        this.load.image('ladder', '../images/ladder.png');
        this.load.spritesheet('mouse', '../images/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('cat','../images/zelda.png',{ frameWidth: 50, frameHeight: 100 });
    }

}