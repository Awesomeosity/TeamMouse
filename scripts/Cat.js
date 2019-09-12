class Cat extends Phaser.Physics.Arcade.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.isClimbing = false;

        this.originalWidth = 50;
        this.body.setSize(this.originalWidth + 4, 40);
        this.currentStory=config.originalStory;
        this.left=true;
        this.down=true;
        this.ladder=null;
    }

    update(){
        //TODO how do you reset climbing
        //TODO after resetting, how will it keep moving instead of choosing again
        if(this.isClimbing){
            this.climb();
        }else{
            this.move();
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
}
