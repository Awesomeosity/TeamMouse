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


        this.input.keyboard.on('keydown-ENTER', () => {
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
}