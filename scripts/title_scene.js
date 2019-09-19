class TitleScene extends Phaser.Scene{

    constructor(test) {
        super({
            key: 'TitleScene'
        });
        this.inTransition = false;
    }

    preload() {
        this.load.image('title_image', '../images/title_screen_v1.png');                                    //Title Screen
    }


    create() {
        this.title = this.add.sprite(500, 400, 'title_image');

        /*-*-*-*-*-*   Audio   *-*-*-*-*-*-*/
        //Base config
        let audioConfig =
            {
                mute: false,
                volume: 0.5,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            };

        this.input.keyboard.on('keydown-M', ()=> {       //Pressing M mutes / un-mutes
            this.game.mute = !this.game.mute;
        });
        /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('MenuScene');
        });

    }


    update()
    {
    }


}