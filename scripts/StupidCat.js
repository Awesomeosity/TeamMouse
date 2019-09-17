class StupidCat extends Cat{
    constructor(config){
        super(config);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.isMuggle=true;
    }

    move(){
        if(this.left){
            this.body.velocity.x=-120;
            this.anims.play('scleft', true);
        }else{
            this.body.velocity.x=120;
            this.anims.play('scright', true);
        }
    }

    climb(){
        //stupid cat can only climb down (because it's stupid) //hahah
        //this.anims.play('scclimb',true);          //Temporary climb-down animation
        this.body.position.x=this.ladder.body.position.x;
        this.body.velocity.x=0;
        this.body.setSize(this.originalWidth, this.body.height);
        this.body.velocity.y = 40;
    }

    catAlgorithm(mouse){
        if(this.currentStory!=this.ladder.story){
            // if(this.ladder.story==5){
            //     alert('crap');
            // }
            if(this.currentStory-mouse.currentStory==0){
                this.isClimbing=false;
            }else if(this.currentStory-mouse.currentStory==1){
                // alert(4);
                if((this.left&&this.body.position.x<=mouse.body.position.x)||(!this.left&&this.body.position.x>=mouse.body.position.x)){
                    // alert(5);
                    this.isClimbing=true;
                }else{
                    this.isClimbing=this.left^mouse.left;
                }
            }else{
                this.isClimbing=false;
            }
        }
    }
}