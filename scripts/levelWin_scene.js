class LevelWinScene extends Phaser.Scene{

    constructor(test) {
        super({
            key: 'LevelWinScene'
        });
    }

    preload() {

    }


    //////////////////////////////////////////////////////////////////////////
    //  When using this scene, use scene number (data) as second parameter  //
    //////////////////////////////////////////////////////////////////////////
    create(data) {

        this.volume = data.LaunchScene.volume;
        data.LaunchScene.highScore += 1000 * data.LaunchScene.mouse.lives;

        this.input.keyboard.on('keydown-NINE', () => {
            this.volume -= 0.1;
            if (this.volume < 0)
                this.volume = 0;
        });

        this.input.keyboard.on('keydown-ZERO', () => {
            this.volume += 0.1;
            if (this.volume > 1)
                this.volume = 1;
        });

        let audioConfig =
            {
                mute: this.game.mute,
                volume: this.volume,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            };
        this.Victory_SFX = this.sound.add('Victory', audioConfig);

        this.input.keyboard.on('keydown-M', ()=> {       //Pressing M mutes / un-mutes
            this.game.mute = !this.game.mute;
        });



        this.mouse = new Mouse(
            {
                scene : this,
                key : 'mouse',
                x : data.LaunchScene.mouse.x,
                y : data.LaunchScene.mouse.y
            });

        this.mouse.doCheer = true;
        this.mouse.disableBody();

        var gameOverX = 800 / 2  - 200;
        var gameOverY = 800 / 2 - 100;
        //Sets BG to black
        var graphics = this.add.graphics();
        var uiRect = new Phaser.Geom.Rectangle(gameOverX, gameOverY, 400, 30);
        graphics.fillStyle(0x000000, 1);
        graphics.fillRectShape(uiRect);

        var styleBlueCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'DeepSkyBlue',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: 400,
        }

        this.add.text(gameOverX, gameOverY, 'THE CHEESE IS YOURS', styleBlueCenter);
        this.Victory_SFX.play();


        this.input.keyboard.on('keydown-ENTER', () => {
            this.Victory_SFX.stop();
            if (data.SceneIndex === 1)
            {
                this.scene.resume('ExampleScene');              //TODO: have it run the second level
                this.scene.stop();
            }
            else if (data.SceneIndex === 2)
            {
                this.scene.resume('Level2');              //TODO: have it run the second level
                this.scene.stop();
            }


        });
    }

    update()
    {
        this.mouse.update();
        this.Victory_SFX.setMute(this.game.mute);
        this.Victory_SFX.setVolume(this.volume);
    }
}