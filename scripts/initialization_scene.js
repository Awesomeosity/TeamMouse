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

        this.load.image('sewer_background', '../images/background.png');
        //this.load.image('ground', '../images/platform.png');
        this.load.image('ground', '../images/platform_tileable_middle_10px.png');
        this.load.image('ladder', '../images/ladder_v2.png');
        this.load.image('broken_ladder','../images/broken_ladder_v2.png');
		this.load.image('breaker', '../images/background.jpg');
        this.load.image('move', '../images/platform_tileable_middle_10px.png');
		this.load.image('cat_sematary','../images/cat_spawn_door_v1.png');
		this.load.image('cucumber','../images/cucumber.png');
		this.load.image('delicious_cheese','../images/v2_win_state_cheese.png');
        this.load.image('MarioSprite', '../images/MarioSprite.png');
		this.load.image('climb_left', '../images/mouse_climb_ceiling_left_v2.png');
        this.load.image('climb_right', '../images/mouse_climb_ceiling_right_v2.png');

        this.load.spritesheet('mouse', '../images/mouse.png', {frameWidth: 56, frameHeight: 67});
        this.load.spritesheet('stupid_cat','../images/stupid_cat.png',{ frameWidth: 37, frameHeight: 54 });
        this.load.spritesheet('maho_cat','../images/maho_cat.png',{ frameWidth: 47, frameHeight: 56 });
        this.load.image('tigger_cat','../images/bouncing_cat_v1.png');
    }

}