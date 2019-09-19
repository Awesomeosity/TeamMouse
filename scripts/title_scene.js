class TitleScene extends Phaser.Scene{

    constructor(test) {
        super({
            key: 'TitleScene'
        });
        this.inTransition = false;
    }

    preload() {
        this.load.image('title_image', '../images/title_screen_v1.png');                                    //Title Screen
        this.load.audio('TitleMus', '../audio/Title_mus.wav');
    }


    create() {
        this.volume = 0.5;

        this.title = this.add.sprite(500, 400, 'title_image');

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

        /*-*-*-*-*-*   Audio   *-*-*-*-*-*-*/
        //Base config
        let audioConfig =
            {
                mute: false,
                volume: this.volume,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0
            };

        this.music = this.sound.add('TitleMus', audioConfig);
        this.music.play();

        this.input.keyboard.on('keydown-M', ()=> {       //Pressing M mutes / un-mutes
            this.game.mute = !this.game.mute;
        });
        /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

        this.input.keyboard.on('keydown-ENTER', () => {

            this.music.stop();
            this.scene.start('MenuScene', {Volume: this.volume});
        });

    }


    update()
    {
        this.music.setMute(this.game.mute);
        this.music.setVolume(this.volume);
    }


}