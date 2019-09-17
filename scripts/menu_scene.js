class MenuScene extends Phaser.Scene{

    constructor(test) {
        super({
            key: 'MenuScene'
        });

        this.numCoins = 0;
    }

    preload() {
        this.load.image('background', '../images/background.jpg');
    }


    create() {

        //Sets BG to black
        this.cameras.main.setBackgroundColor('#000000');

        var screenWidth = 1000;
        var screenHeight = 800;
        var textObjWidth = 200;
        var largeTextObjWidth = 400;
        var textCenterPos = screenWidth / 2 - textObjWidth / 2;
        var longTextCenterPos = screenWidth / 2 - largeTextObjWidth / 2;

        //Style for red centered text on screen
        var styleRedCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'Red',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: textObjWidth,

        }

        //Style for blue centered text on screen
        var styleBlueCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'DeepSkyBlue',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: largeTextObjWidth,

        }

        //Style  for blue left-justified text on screen
        var styleBlueLeft = {
            fontFamily: 'ArcadeClassic',
            fill: 'DeepSkyBlue',
            fontSize: 'xx-large',
        }

        var styleRedLeft = {
            fontFamily: 'ArcadeClassic',
            fill: 'Red',
            fontSize: 'xx-large',
        }




        //Adds menu text to the screen
        this.add.text(0, 0, '1UP', styleRedCenter);
        this.add.text(textCenterPos, 0, 'HIGH SCORE', styleRedCenter);

        this.coinText = this.add.text(longTextCenterPos, 115, 'INSERT  COIN', styleBlueCenter);
        this.add.text(longTextCenterPos, 225, 'PLAYER     COIN', styleBlueCenter);
        this.add.text(0, 450, 'RANK   SCORE   NAME', styleBlueLeft);
        this.add.text(0, 500, '1st      0', styleRedLeft);
        this.add.text(0, 550, '2nd      0', styleRedLeft);
        this.add.text(0, 600, '3rd      0', styleRedLeft);



        this.numCoinsText = this.add.text(longTextCenterPos, 275, '1               ' + this.numCoins, styleBlueCenter);


        this.input.keyboard.on('keydown-ENTER', () => {
            if (this.numCoins >= 1)
                this.scene.start('InitializationScene');
        });

        this.input.keyboard.on('keydown-C', () => {
            this.numCoins += 1;
        });

    }


    update()
    {
        this.changeNumCoinsText()
        this.changeCoinText()
    }


    changeNumCoinsText()
    {
        this.numCoinsText.setText('1               ' + this.numCoins);
    }

    changeCoinText()
    {
        if (this.numCoins > 0)
            this.coinText.setText('PRESS  ENTER  TO  START');
    }


}