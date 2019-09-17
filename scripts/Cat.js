class Cat extends Phaser.Physics.Arcade.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.isClimbing = false;

        this.originalWidth = 21;
        this.body.setSize(this.originalWidth + 4, 40);
        this.currentStory=config.originalStory;
        this.left=false;
        this.down=true;
        this.ladder=null;
        this.initScore=false;

        this.styleWhiteCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'White',
            fontSize: 'x-large',
            align: 'center',
            fixedWidth: 200,
        };

        this.scoreText=null;
        this.scoreLoop=0;
    }

    update(){
        // alert('yes');
        if(this.isClimbing){
            this.climb();
        }else{
            this.move();
            this.passBy();
        }
        if(this.initScore){
            //TODO: identify what kind of enemy it is
            let x=this.scene.mouse.body.position.x;
            let y=this.scene.mouse.body.position.y;
            let height=this.scene.mouse.body.height;
            if(this.left){
                if(this.body.position.x<x-this.originalWidth){
                    this.scene.pointGain_SFX.play();
                    this.scene.highScore+=100;
                    this.initScore=false;
                    this.scoreText=this.scene.add.text(x-50, y+height/2, "100", this.styleWhiteCenter);
                }
            }else {
                if(this.body.position.x>x+this.originalWidth){
                    this.scene.pointGain_SFX.play();
                    this.scene.highScore+=100;
                    this.initScore=false;
                    this.scoreText=this.scene.add.text(x-50, y+height/2, "100", this.styleWhiteCenter);
                }
            }
            if(!this.scene.mouse.isCeiling){
                this.initScore=false;
            }
        }
        if(this.scoreText){
            this.scoreLoop=(this.scoreLoop+1)%50;
            if(!this.scoreLoop){
                this.scoreText.destroy();
                this.scoreText=null;
            }
        }
    }


    climbOrNot(ladder){
        // alert(3);
        let mouse=this.scene.mouse;
        //stupid cat algorithmeow
        this.ladder=ladder;
        if(!this.isClimbing){
            this.catAlgorithm(mouse);
        }
    }

    catAlgorithm(){

    }

    move(){

    }


    climb(){

    }

    climbOff()
    {
        this.isClimbing = false;
        this.body.setSize(this.originalWidth + 4, this.body.height);
        this.body.allowGravity=true;
    }

    enterSematary(){

    }

    passBy(){
        if(this.scene.mouse.currentStory==this.currentStory&&this.scene.mouse.isCeiling){
            // alert('hey');
            let x=this.scene.mouse.body.position.x;
            if(this.left){
                if(this.body.position.x>=x){
                    // alert('pass');
                    this.initScore=true;
                }
            }else {
                if(this.body.position.x<=x){
                    // alert('pass');
                    this.initScore=true;
                }
            }

        }
    }
}
