class GameOverScene extends Phaser.Scene{

    constructor(test) {
        super({
            key: 'GameOverScene'
        });
    }

    preload() {
    }


    create() {


        var gameOverX = 800 / 2  - 100;
        var gameOverY = 800 / 2 - 100;
        //Sets BG to black
        var graphics = this.add.graphics();
        var uiRect = new Phaser.Geom.Rectangle(gameOverX, gameOverY, 200, 30);
        graphics.fillStyle(0x000000, 1);
        graphics.fillRectShape(uiRect);

        var styleBlueCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'DeepSkyBlue',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: 200,
        }

        this.add.text(gameOverX, gameOverY, 'GAME OVER', styleBlueCenter);


        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.run('ExampleScene')
            this.scene.stop();
        });
    }

    /*
    update()
    {
        var styleBlueCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'DeepSkyBlue',
            fontSize: 'xx-large',
            boundsAlignH: 'center',
            boundsAlignV: 'middle',
        }

        function addCoin()
        {
            numCoins = numCoins + 1;
        }




        this.input.keyboard.on('keydown-S', addCoin);

    }
    */



}