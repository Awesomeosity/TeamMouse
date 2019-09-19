class MenuScene extends Phaser.Scene{

    constructor(test) {
        super({
            key: 'MenuScene'
        });

        this.numCoins = 0;
    }

    preload()
	{
        this.load.image('background', '../images/background.jpg');
        this.load.audio('InsertCoin', '../audio/InsertCoin_sfx.wav');
    }


    create(data)
	{
	    this.volume = data.Volume;
        /*-*-*-*-*-*   Audio   *-*-*-*-*-*-*/
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

        //Base config
        let audioConfig =
            {
                mute: false,
                volume: this.volume,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            };
        this.insertCoin_SFX = this.sound.add('InsertCoin', audioConfig);
        this.insertCoin_SFX.setMute(this.game.mute);

        this.input.keyboard.on('keydown-M', ()=> {       //Pressing M mutes / un-mutes
            this.game.mute = !this.game.mute;
        });

        /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

        //Sets BG to black
        this.cameras.main.setBackgroundColor('#28272c');

        var screenWidth = 1000;
        var screenHeight = 800;
        var textObjWidth = 200;
        var largeTextObjWidth = 400;
        var textCenterPos = screenWidth / 2 - textObjWidth / 2;
        var longTextCenterPos = screenWidth / 2 - largeTextObjWidth / 2;

        //Style for red centered text on screen
        var styleRedCenter = {
            fontFamily: 'ArcadeClassic',
            fill: '#ff7a02',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: textObjWidth,

        }

        var styleWhiteCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'White',
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
            fill: '#ff7a02',
            fontSize: 'xx-large',
        }



        this.firstScore = 0;
        this.secondScore = 0;
        this.thirdScore = 0;

        //Adds menu text to the screen
        this.add.text(textCenterPos, 40, 'HIGH SCORE', styleRedCenter);
        this.add.text(longTextCenterPos, 350, 'PRESS C TO INSERT COIN', styleBlueCenter);


        this.highScoreText = this.add.text(textCenterPos, 80, '0', styleWhiteCenter);

        if (storageAvailable('localStorage') && localStorage.getItem('HighScore') > 0)
        {
            this.highScoreText.setText(localStorage.getItem('HighScore'));
            this.firstScore = localStorage.getItem('HighScore');
        }
        else
        {
            this.firstScore = 0;
            this.highScoreText.setText('0');
        }




        if (storageAvailable('localStorage') &&
            localStorage.getItem('1stScore') &&
            localStorage.getItem('2ndScore') &&
            localStorage.getItem('3rdScore'))
        {
            this.secondScore = localStorage.getItem('2ndScore');
            this.thirdScore = localStorage.getItem('3rdScore');
        }


        this.coinText = this.add.text(longTextCenterPos, 155, 'INSERT  COIN', styleBlueCenter);
        this.add.text(longTextCenterPos, 225, 'PLAYER     COIN', styleBlueCenter);
        this.add.text(400, 450, 'RANK   SCORE', styleBlueLeft);
        this.add.text(400, 500, '1st\t\t\t\t\t\t' + this.firstScore, styleRedLeft);
        this.add.text(400, 550, '2nd\t\t\t\t\t\t' + this.secondScore, styleRedLeft);
        this.add.text(400, 600, '3rd\t\t\t\t\t\t' + this.thirdScore, styleRedLeft);



        this.numCoinsText = this.add.text(longTextCenterPos, 275, '1               ' + this.numCoins, styleBlueCenter);


        this.input.keyboard.on('keydown-ENTER', () => {
            if (this.numCoins >= 1)
                this.scene.start('InitializationScene', {Volume: this.volume});
        });

        this.input.keyboard.on('keydown-C', () => {
            this.insertCoin_SFX.play();
            this.numCoins += 1;
        });

    }


    update()
    {
        this.insertCoin_SFX.setMute(this.game.mute);
        this.insertCoin_SFX.setVolume(this.volume);
        this.changeNumCoinsText()
        this.changeCoinText()
    }


    changeNumCoinsText()
    {
        this.numCoinsText.setText('1         ' + this.numCoins);
    }

    changeCoinText()
    {
        if (this.numCoins > 0)
            this.coinText.setText('PRESS  ENTER  TO  START');
    }


}


function storageAvailable(type) {
    var storage;
    try
	{
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
                // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}