class InitializationScene extends Phaser.Scene{
    constructor(test) {
        super({
            key: 'InitializationScene'
        });
        this.currentGameScore = 0;

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
            this.scene.start('ExampleScene', {CurrentScore: 0});
        });

        //Load sprite textures
        this.load.image('sewer_background', '../images/background.png');
        this.load.image('ground', '../images/v2_platform.png');
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
        this.load.image('mouse_left_cu','../images/mouse_left_cu.gif');
		
		//Temp Life Icon
		this.load.image('LifeUI-Temp', '../images/MouseHeadUITemp.png');
		
		this.load.image('swing_left', '../images/mouse_swing_left_v2.png');
		this.load.image('swing_right', '../images/mouse_swing_right_v2.png');

        this.load.image('tigger_cat','../images/bouncing_cat_v1.png');


        //Load spritesheets
        this.load.spritesheet('mouse', '../images/mouse.png', {frameWidth: 45, frameHeight: 54});
        this.load.spritesheet('stupid_cat','../images/stupid_cat.png',{ frameWidth: 37, frameHeight: 54 });
        this.load.spritesheet('maho_cat','../images/maho_cat.png',{ frameWidth: 47, frameHeight: 56 });
        this.load.spritesheet('catClimb', '../images/catclimb w37h54.png', { frameWidth: 37, frameHeight: 54});
        this.load.spritesheet('mcCatClimb', '../images/smallcatclimb_w39h54.png', {frameWidth: 39, frameHeight: 54});

        //Loads audio
        this.load.audio('LevelMus', '../audio/Level1-Mus.wav');
        this.load.audio('MouseWalk', '../audio/Level1-MouseWalk.wav');
        this.load.audio('MouseJump', '../audio/MouseJump_sfx.wav');
        this.load.audio('PointGain', '../audio/PointGain_sfx.wav');
        this.load.audio('LifeLost', '../audio/LifeLost_sfx.wav');
    }

}