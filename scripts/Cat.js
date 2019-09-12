class Cat extends Phaser.Physics.Arcade.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.isClimbing = false;

        this.originalWidth = 21;
        this.body.setSize(this.originalWidth + 4, 40);
        this.currentStory=config.originalStory;
        this.left=true;
        this.down=true;
        this.ladder=null;
        this.initScore=false;
    }

    update(){
        //TODO how do you reset climbing
        //TODO after resetting, how will it keep moving instead of choosing again
        if(this.isClimbing){
            this.climb();
        }else{
            this.move();
            this.passBy();
        }
        if(this.initScore){
            let x=this.scene.mouse.body.position.x;
            if(this.left){
                if(this.body.position.x<x-this.originalWidth){
                    this.scene.highScore++;
                    this.initScore=false;
                }
            }else {
                if(this.body.position.x>x+this.originalWidth){
                    this.scene.highScore++;
                    this.initScore=false;
                }
            }
            if(!this.scene.mouse.isCeiling){
                this.initScore=false;
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
