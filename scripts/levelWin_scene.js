class LevelWinScene extends Phaser.Scene{

    constructor(test) {
        super({
            key: 'LevelWinScene'
        });
    }

    preload() {
    }


    create() {


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
            this.scene.run('ExampleScene');              //TODO: have it run the second level
            this.scene.stop();
        });
    }
}