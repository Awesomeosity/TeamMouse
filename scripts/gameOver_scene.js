class GameOverScene extends Phaser.Scene{

    constructor(config) {
        super({
            key: 'GameOverScene'
        });

    }

    preload() {
    }


    create(data) {


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
        };

        this.add.text(gameOverX, gameOverY, 'GAME OVER', styleBlueCenter);

        //Store score in database for leaderboard
        if (storageAvailable('localStorage') &&
        localStorage.getItem('1stScore') &&
        localStorage.getItem('2ndScore') &&
        localStorage.getItem('3rdScore'))
        {
            let firstScore = localStorage.getItem('1stScore');
            let secondScore = localStorage.getItem('2ndScore');
            let thirdScore = localStorage.getItem('3rdScore');
            if(firstScore < data)
            {
                localStorage.setItem('1stScore', data);
                localStorage.setItem('2ndScore', firstScore);
                localStorage.setItem('3rdScore', secondScore);

            }
            else if (secondScore < data && data < firstScore)
            {
                localStorage.setItem('2ndScore', data);
                localStorage.setItem('3rdScore', secondScore);
            }
            else if (thirdScore < data && data < secondScore)
            {
                localStorage.setItem('3rdScore', data);
            }
        }
        else if (storageAvailable('localStorage'))
        {
            localStorage.setItem('1stScore', data);
            localStorage.setItem('2ndScore', '0');
            localStorage.setItem('3rdScore', '0');
        }


        //Go back to example scene on ENTER pressed
        this.input.keyboard.on('keydown-ENTER', () => {
            var level2Scene=this.scene.get('Level2', {CurrentScore: 0});
            level2Scene.cats=[];
            var theOtherScene=this.scene.get('ExampleScene', {CurrentScore: 0});
            theOtherScene.scene.restart();
            theOtherScene.cats=[];
            theOtherScene.cucumbers=[];
            CatFactory.getInstance().resetNumber();
            // this.scene.run('ExampleScene');
            this.scene.stop();
        });
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