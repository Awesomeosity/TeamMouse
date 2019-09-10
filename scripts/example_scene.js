class ExampleScene extends Phaser.Scene{
    constructor(test) {
        super({
            key: 'ExampleScene'
        });
        this.stupid_loop_count=0;
        this.stupid_config={
            scene:this,
            key:'stupid_cat',
            x:400,
            y:10,
            originalStory:6
        };
        this.cat_factory=CatFactory.getInstance();
        this.ladder_configuration={
            scene:this,
            key: 'ladder',
            x:400,
            y:445,
            setScale:false,
            setSize:true,
            scale:1,
            width:32,
            height:182,
            story:0
        };
        this.platform_configuration={
            scene:this,
            key: 'ground',
            x:398,
            y:568,
            setScale:false,
            setSize:false,
            width:200,
            height:10,
            scale:1,
            story:0
        };
    }

    create()
    {
        //TODO after colliding with another platform, this should be set to false

        // this.isClimbing=false;

        // this.add.image(400, 300, 'background');

        //
        this.ladders = this.physics.add.group();
        this.platforms = this.physics.add.staticGroup();

        this.addLadderConfiguration(100,604,1);
        this.addLadderConfiguration(399,604,1);
        this.addLadderConfiguration(699, 704, 0);
        this.addLadderConfiguration(250, 504, 2);
        this.addLadderConfiguration(649, 504, 2);
        this.addLadderConfiguration(100, 404, 3);
        this.addLadderConfiguration(330, 404, 3);
        this.addLadderConfiguration(524, 404, 3);
        this.addLadderConfiguration(160, 304, 4);
        this.addLadderConfiguration(649, 304, 4);
        this.addLadderConfiguration(300, 204, 5);
        this.addLadderConfiguration(500, 204, 5);

        let sematary_config={
            scene:this,
            key:'cat_sematary',
            x:30,
            y:720
        };
        this.catSematary=new CatSematary(sematary_config);

        // this.platforms = this.physics.add.staticGroup();
        this.addPlatformConfiguration(398,785,0,true,false,250,10,2);
        this.addPlatformConfiguration(100,660,1,false,true,350);
        this.addPlatformConfiguration(475,660,1,false,true,399);
        this.addPlatformConfiguration(250,560,2,false,true,249);
        this.addPlatformConfiguration(550,560,2,false,true);
        this.addPlatformConfiguration(750,560,2,false,true,150);
        this.addPlatformConfiguration(100,460,3,false,true);
        this.addPlatformConfiguration(450,460,3,false,true,348);
        this.addPlatformConfiguration(215,360,4,false,true,180);
        this.addPlatformConfiguration(428,360,4,false,true,144);
        this.addPlatformConfiguration(675,360,4,false,true);
        this.addPlatformConfiguration(405,260,5,false,true,439);
        this.addPlatformConfiguration(400,160,6,false,true,150);

        this.physics.add.collider(this.ladders,this.platforms);

        this.mouse=new Mouse({
            scene:this,
            key:'mouse',
            x:100,
            y:700
        });
        this.mouse.body.collideWorldBounds=true;

        this.cats=[];

        // let cur_cat=CatFactory.getInstance().createCat(CatType,config);
        // cur_cat.body.collideWorldBounds=true;
        // this.cats.push(cur_cat);

        this.cursors = this.input.keyboard.createCursorKeys();

		let that = this;

		this.physics.add.collider(this.mouse,this.platforms, (mouse,platform) =>
	    {
			mouse.climbOff();
			mouse.currentStory=platform.story;
			// if(mouse.currentStory==1){
			//     alert(1);
            // }
		});

		this.physics.add.collider(this.mouse,this.catSematary);
		this.physics.add.collider(this.cats,this.catSematary,(cat,catSematary)=>{
		    this.enter_sematary(cat);
        });
        this.physics.add.collider(this.cats,this.platforms,(cat,platform)=>{
            if(cat.currentStory!=platform.story){
                cat.left=cat.left? false: true;
                cat.currentStory=platform.story;
                if(cat.isClimbing){
                    cat.climbOff();
                }
            }
            cat.currentStory=platform.story;
            cat.body.velocity.x=0;
        });

        //TODO: kill mouse
        this.physics.add.overlap(this.mouse,this.cats,(mouse,cat)=>{
            mouse.hurtBy(cat);
        });
    }

    update()
    {
		let that = this;
		this.stupid_loop_count=(this.stupid_loop_count+1)%100;
		if(!this.stupid_loop_count){
		    let cur_cat=this.cat_factory.createCat(CatType.STUPID,this.stupid_config);
		    if(cur_cat){
		        cur_cat.body.collideWorldBounds=true;
                this.cats.push(cur_cat);
            }
        }
		if(this.physics.overlap(this.mouse,this.ladders, this.mouse.saveLadderPos))
		{
			this.mouse.isOnLadder = true;
		}
		else
		{
			this.mouse.isOnLadder = false;

			this.mouse.snapTo = null;
			this.mouse.climbOff();
		}
        this.mouse.update(this.cursors);
        this.physics.overlap(this.cats,this.ladders,(cat,ladder)=>{
            // alert(2);
            // if(ladder.story==0){
            //     alert(2);
            // }
            cat.climbOrNot(ladder);
        });
		this.cats.forEach(function (cat) {
           cat.update();
        });

    }

    enter_sematary(cat){
        if(cat instanceof StupidCat){
            CatFactory.getInstance().killCat(cat);
            var pos = this.cats.indexOf(cat);
            this.cats.splice(pos,1);
            cat.visible=false;
            cat.destroy();
        }
    }

    addLadderConfiguration(x,y,story){
        this.ladder_configuration.x=x;
        this.ladder_configuration.y=y;
        this.ladder_configuration.story=story;
        this.ladder_configuration.width=50;
        this.ladder_configuration.height=101;
        let ladd=new Ladder(this.ladder_configuration);
        ladd.body.allowGravity=false;
        this.ladders.add(ladd);
    }

    addPlatformConfiguration(x,y,story,setScale,setSize,width=250,height=10,scale=1){
        this.platform_configuration.x=x;
        this.platform_configuration.y=y;
        this.platform_configuration.story=story;
        this.platform_configuration.setScale=setScale;
        this.platform_configuration.setSize=setSize;
        this.platform_configuration.width=width;
        this.platform_configuration.height=height;
        this.platform_configuration.scale=scale;
        let plat=new Platform(this.platform_configuration);
        this.platforms.add(plat);
    }
	
}