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

        //Style for red centered text on screen
        var styleRedCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'Red',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: 200,

        }

        //Style for blue centered text on screen
        var styleBlueCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'DeepSkyBlue',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: 400,

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
        this.add.text(300, 0, 'HIGH SCORE', styleRedCenter);

        this.coinText = this.add.text(200, 115, 'INSERT  COIN', styleBlueCenter);
        this.add.text(200, 225, 'PLAYER     COIN', styleBlueCenter);
        this.add.text(0, 450, 'RANK   SCORE   NAME', styleBlueLeft);
        this.add.text(0, 500, '1st      0', styleRedLeft);
        this.add.text(0, 550, '2nd      0', styleRedLeft);
        this.add.text(0, 600, '3rd      0', styleRedLeft);



        this.numCoinsText = this.add.text(200, 275, '1               ' + this.numCoins, styleBlueCenter);


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