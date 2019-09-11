class GameUI extends Phaser.Scene{

    constructor(config) {
        super({key: 'GameUI'});

    }

    preload() {

    }


    create() {


        //Sets BG to black
        //this.cameras.main.setBackgroundColor('#000000');

        var graphics = this.add.graphics();
        var uiRect = new Phaser.Geom.Rectangle(0, 0, 800, 100);
        graphics.fillStyle(0x000000, 1);
        graphics.fillRectShape(uiRect);

        this.life1 = this.add.image(75, 80, 'MarioSprite');
        this.life2 = this.add.image(100, 80, 'MarioSprite');
        this.life3 = this.add.image(125, 80, 'MarioSprite');


        var styleRedCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'Red',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: 200,
        }

        var styleWhiteCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'White',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: 200,
        }

        this.add.text(0, 0, '1UP', styleRedCenter);
        this.add.text(300, 0, 'HIGH SCORE', styleRedCenter);
        this.currentScore = this.add.text(0, 30, ''+ 0, styleWhiteCenter);
        this.highScoreText = this.add.text(300, 30, "", styleWhiteCenter);

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

        if (storageAvailable('localStorage'))
        {
            if (score > localStorage.getItem('HighScore'))
            {
                localStorage.setItem('HighScore', score);
                this.highScoreText.setText(localStorage.getItem('HighScore'));
            }
            else if (score == 0)
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