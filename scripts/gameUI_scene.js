class GameUI extends Phaser.Scene{

    constructor(config) {
        super({key: 'GameUI'});

        this.levelNum = 1;

    }

    preload() {

    }


    create() {


        //Sets BG to black
        //this.cameras.main.setBackgroundColor('#000000');

        var graphics = this.add.graphics();
        var uiRect = new Phaser.Geom.Rectangle(800, 0, 200, 800);
        graphics.fillStyle(0x000000, 1);
        graphics.fillRectShape(uiRect);

        var uiWidth = 200;
        var startXUI = 800;
        var textObjWidth = 200;
        var lifeWidth = 40;
        var centerXText = startXUI + uiWidth / 2 - textObjWidth / 2;
        var centerXLives = startXUI + uiWidth / 2;

        var headerY1 = 0;
        var headerY2 = 200;
        var headerY3 = 400;
        var subY = 30;

        this.life1 = this.add.image(centerXLives - lifeWidth, headerY2 + subY * 3, 'LifeUI-Temp');
        this.life2 = this.add.image(centerXLives, headerY2 + subY * 3, 'LifeUI-Temp');
        this.life3 = this.add.image(centerXLives + lifeWidth, headerY2 + subY * 3, 'LifeUI-Temp');


        var styleRedCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'Red',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: textObjWidth,
        };

        var styleWhiteCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'White',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: textObjWidth,
        };

        this.add.text(centerXText, headerY2, '1UP', styleRedCenter);
        this.add.text(centerXText, headerY1, 'HIGH SCORE', styleRedCenter);
        this.add.text(centerXText, headerY3, 'LEVEL = ' + this.levelNum, styleRedCenter);
        this.currentScore = this.add.text(centerXText, headerY2 + subY, ''+ 0, styleWhiteCenter);
        this.highScoreText = this.add.text(centerXText, headerY1 + subY, "", styleWhiteCenter);

    }


    update(mouseLives)
    {
    }

    updateMouseLives(mouseLives)
    {
        if (mouseLives == 3)
        {
            this.life1.setVisible(true);
            this.life2.setVisible(true);
            this.life3.setVisible(true);
        }
        else if (mouseLives == 2)
        {
            this.life1.setVisible(true);
            this.life2.setVisible(true);
            this.life3.setVisible(false);
        }
        else if (mouseLives == 1)
        {
            this.life1.setVisible(true);
            this.life2.setVisible(false);
            this.life3.setVisible(false);
        }
        else if (mouseLives == 0)
        {
            this.life1.setVisible(false);
            this.life2.setVisible(false);
            this.life3.setVisible(false);
        }
    }

    updateHighScore(score)
    {
        this.currentScore.setText(score);

        //Use to reset local score (for testing)
        //localStorage.setItem('HighScore', '0');

        if (storageAvailable('localStorage'))
        {
            if (score > localStorage.getItem('HighScore'))
            {
                localStorage.setItem('HighScore', score);
                this.highScoreText.setText(localStorage.getItem('HighScore'));
            }
            else if (score <= localStorage.getItem('HighScore'))
            {
                this.highScoreText.setText(localStorage.getItem('HighScore'));
            }
            else if (score === 0)
            {
                this.highScoreText.setText(0);

            }


        }
        else
        {
            this.highScoreText.setText(score);
        }

    }





}

function storageAvailable(type) {
    var storage;
    try {
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