class MahoCat extends Cat{
    constructor(config){
        super(config);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.left=false;
        this.originalWidth = 50;
        this.body.setSize(this.originalWidth + 4, this.body.height);
    }

    move(){
        if(this.left){
            this.body.velocity.x=-120;
            this.anims.play('left', true);
        }else{
            this.body.velocity.x=120;
            this.anims.play('right', true);
        }
        if((this.x>=700&&(!this.left))||(this.x<=100&&this.left)){
            this.left=!this.left;
        }
    }

    climb(){
        this.body.allowGravity=false;
        this.body.position.x=this.ladder.body.position.x;
        this.body.setSize(this.originalWidth, this.body.height);
        if(this.down){
            this.body.velocity.y = 60;
        }else{
            this.body.velocity.y=-60;
            if(this.body.position.y<=this.ladder.body.y-this.ladder.displayHeight/2-1){
                // alert('off ladder');
                this.climbOff();
                this.currentStory+=1;
                this.left=this.left?false:true;
            }
        }
    }

    catAlgorithm(mouse){
        if(this.currentStory==this.ladder.story&&this.currentStory<mouse.currentStory){
            this.isClimbing=true;
            this.down=false;
        }else if(this.currentStory>this.ladder.story&&this.currentStory>mouse.currentStory){
            this.isClimbing=true;
            this.down=true;
        }else{
            this.isClimbing=false;
        }
    }

    climbOff()
    {
        this.isClimbing = false;
        this.body.setSize(this.originalWidth + 4, this.body.height);
        this.body.allowGravity=true;
    }
}