class Level2 extends Phaser.Scene{
    constructor(test) {
        super({
            key: 'Level2'
        });
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
        this.moving_configuration={
            scene:this,
            key: 'move',
            x:398,
            y:568,
            setScale:false,
            setSize:false,
            width:75,
            height:10,
            scale:1,
        };
        this.simple_cat_configuration={
            scene:this,
            key:'stupid_cat',
            x: 150,
            y: 680,
            right_border:750,
            left_border:50
        };
        this.tigger_cat_configuration={
            scene:this,
            key:'tigger_cat',
            x: 100,
            y: 50,
        };
        this.tigger_loop=0;
        this.highestStory=6;
    }

	preload()
	{
        this.physics.world.bounds.width=800;
	    //Start up UI scene and assign to variable
		this.scene.launch('GameUI');
		this.uiOverlay = this.scene.get('GameUI');

		//For tracking the player's high score throughout the level
		this.highScore = 0; //TODO: Add to high score whenever you do something (get past a cat?)
	}

    create()
    {
        /*-*-*-*-*-*   Audio   *-*-*-*-*-*-*/
        //Base config
        let audioConfig =
            {
                mute: false,
                volume: 0.5,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0
            };

        //Initializes level sounds
        this.levelMus = this.sound.add('LevelMus');
        this.mouseWalk_SFX = this.sound.add('MouseWalk');
        this.mouseJump_SFX = this.sound.add('MouseJump', audioConfig);
        this.pointGain_SFX = this.sound.add('PointGain', audioConfig);
        this.lifeLost_SFX = this.sound.add('LifeLost', audioConfig);

        //Music
        this.levelMus.play(audioConfig);
        this.musicMute = this.game.mute;                                    //Music mutes by default
        this.levelMus.setMute(this.musicMute);
        this.input.keyboard.on('keydown-M', ()=> {       //Pressing M mutes / un-mutes
            this.game.mute = !this.game.mute;
            this.musicMute = this.game.mute;
            this.levelMus.setMute(this.musicMute);
        });

        //SFX
        this.walkMute = this.musicMute;                             //SFX mutes with music on initialization
        this.sfxMute = this.musicMute;
        this.mouseWalk_SFX.play(audioConfig);
        this.mouseWalk_SFX.setMute(this.walkMute);
        this.mouseJump_SFX.setMute(this.sfxMute);
        this.mouseJump_SFX.setLoop(false);
        this.pointGain_SFX.setMute(this.sfxMute);
        this.pointGain_SFX.setLoop(false);
        this.lifeLost_SFX.setMute(this.sfxMute);
        this.lifeLost_SFX.setLoop(false);
        /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/


        this.add.image(400, 400, 'sewer_background');
        this.add.image(50,470,'cat_sematary');
        //add cheese
        let cheese_config={
            scene:this,
            key:'delicious_cheese',
            x: 325,
            y: 50
        };
        this.cheese=new Cheese(cheese_config);

        this.cameras.main.backgroundColor.setTo(49, 64, 148);

        this.ladders = this.physics.add.group();
        this.platforms = this.physics.add.staticGroup();
		this.moving = this.physics.add.group();

        // let sematary_config={
        //     scene:this,
        //     key:'cat_sematary',
        //     x:30,
        //     y:720
        // };
        
        //this.catSematary=new CatSematary(sematary_config);
        
        this.PlatformOffset = 2;
        this.ladderWidth = 21;
        
        this.addPlatformConfiguration(400, 790, 0, false, true, 800, 10, 1);
		this.addPlatformConfiguration( 37, 650, 0, false, true,  74, 10, 1);
		this.addPlatformConfiguration(134, 650, 0, false, true,  74, 10, 1);
		this.addPlatformConfiguration(102, 510, 0, false, true, 158, 10, 1);
        this.addPlatformConfiguration(400, 370, 0, false, true, 100, 10, 1);
        this.addPlatformConfiguration(368, 230, 0, false, true,  38, 10, 1);
        this.addPlatformConfiguration(430, 230, 0, false, true,  38, 10, 1);
        this.addPlatformConfiguration(700, 510, 0, false, true, 200, 10, 1);
		this.addPlatformConfiguration(700, 650, 0, false, true, 200, 10, 1);

        this.addPlatformConfiguration(637, 280, 0, false, true, 100, 10, 1);
        this.addPlatformConfiguration(310, 140, 0, false, true, 630, 10, 1);
        this.addPlatformConfiguration(651, 140, 0, false, true,   1, 10, 1);



		//TODO change these to let AI work.
		this.addLadderConfiguration( 86, 715, 5);
		this.addLadderConfiguration( 12, 575, 5);
		this.addLadderConfiguration(400, 294, 5);
		this.addLadderConfiguration(637, 210, 5);
		
		this.addMovingConfiguration(100, 150, false, true, 300);
        this.addMovingConfiguration(275, 660, false, true, 300);
		this.addMovingConfiguration(525, 150, false, true, 300);
		this.addMovingConfiguration(525, 660, false, true, 300);
		this.addMovingConfiguration(97.43, 410, false, true, 300);
		this.addMovingConfiguration(525, 400, false, true, 300);

        this.physics.add.collider(this.ladders,this.platforms);


        //Mouse initialization
        //TODO: change y
        this.mouse=new Mouse({
            scene:this,
            key:'mouse',
            x:50,
            y:400
        });
        this.mouse.body.collideWorldBounds=true;

        this.cursors = this.input.keyboard.createCursorKeys();

		let that = this;

		this.physics.add.collider(this.mouse,this.platforms, (mouse,platform) =>
	    {
			mouse.hangOut(platform);
			mouse.climbOff();
            if(!mouse.isCeiling){
                mouse.currentStory=platform.story;
            }
		});

		// this.physics.add.collider(this.mouse,this.catSematary);
		// this.physics.add.collider(this.cats,this.catSematary,(cat,catSematary)=>{
		//     this.enter_sematary(cat);
        // });

        //TODO: kill mouse
        this.physics.add.overlap(this.mouse,this.cats,(mouse,cat)=>{
            mouse.hurtBy(cat);
        });
                
        this.physics.add.collider(this.mouse, this.moving, (mouse, move) =>{
           mouse.ridePlatform(move); 
        });
		
		this.tweens.timeline({
			targets: this.moving.children.entries[0].body.velocity,
			loop: -1,
			tweens: [
				{x:   0, y:  100, duration: 2600, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x: 100, y:    0, duration: 1750, ease: 'Stepped'},
				{x:   0, y:  100, duration: 2500, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x: 100, y:    0, duration: 2500, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x:   0, y: -100, duration: 5100, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x: -100, y:    0, duration: 4250, ease: 'Stepped'},
			]
		});
		
		this.tweens.timeline({
			targets: this.moving.children.entries[1].body.velocity,
			loop: -1,
			tweens: [
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x: 100, y:    0, duration: 2500, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x:   0, y: -100, duration: 5100, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x:-100, y:    0, duration: 4250, ease: 'Stepped'},
				{x:   0, y:  100, duration: 2600, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x: 100, y:    0, duration: 1750, ease: 'Stepped'},
				{x:   0, y:  100, duration: 2500, ease: 'Stepped'},
			]
		});

		this.tweens.timeline({
			targets: this.moving.children.entries[2].body.velocity,
			loop: -1,
			tweens: [
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x: -100, y:    0, duration: 4250, ease: 'Stepped'},
				{x:   0, y:  100, duration: 2600, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x: 100, y:    0, duration: 1750, ease: 'Stepped'},
				{x:   0, y:  100, duration: 2500, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x: 100, y:    0, duration: 2500, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x:   0, y: -100, duration: 5100, ease: 'Stepped'},
			]
		});
		
		this.tweens.timeline({
			targets: this.moving.children.entries[3].body.velocity,
			loop: -1,
			tweens: [
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x:   0, y: -100, duration: 5100, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x:-100, y:    0, duration: 4250, ease: 'Stepped'},
				{x:   0, y:  100, duration: 2600, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x: 100, y:    0, duration: 1750, ease: 'Stepped'},
				{x:   0, y:  100, duration: 2500, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x: 100, y:    0, duration: 2500, ease: 'Stepped'},
			]
		});

		this.tweens.timeline({
			targets: this.moving.children.entries[4].body.velocity,
			loop: -1,
			tweens: [
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x: 100, y:    0, duration: 1750, ease: 'Stepped'},
				{x:   0, y:  100, duration: 2500, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x: 100, y:    0, duration: 2500, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x:   0, y: -100, duration: 5100, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x:-100, y:    0, duration: 4250, ease: 'Stepped'},
				{x:   0, y:  100, duration: 2600, ease: 'Stepped'},

			]
		});
 
		this.tweens.timeline({
			targets: this.moving.children.entries[5].body.velocity,
			loop: -1,
			tweens: [
				{x:   0, y: -100, duration: 2500, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x:-100, y:    0, duration: 4250, ease: 'Stepped'},
				{x:   0, y:  100, duration: 2600, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x: 100, y:    0, duration: 1750, ease: 'Stepped'},
				{x:   0, y:  100, duration: 2500, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x: 100, y:    0, duration: 2500, ease: 'Stepped'},
				{x:   0, y:    0, duration: 1000, ease: 'Stepped'},
				{x:   0, y: -100, duration: 2600, ease: 'Stepped'},
			]
		});

        //add cats
        this.cats=[];
        this.simple_cat_configuration.x=150;
        this.simple_cat_configuration.y=680;
        this.simple_cat_configuration.left_border=50;
        let cur_cat=this.cat_factory.createCat(CatType.SIMPLE,this.simple_cat_configuration,this.mouse);
        this.cats.push(cur_cat);

        this.simple_cat_configuration.x=650;
        this.simple_cat_configuration.y=600;
        this.simple_cat_configuration.left_border=600;
        cur_cat=this.cat_factory.createCat(CatType.SIMPLE,this.simple_cat_configuration,this.mouse);
        this.cats.push(cur_cat);

        this.simple_cat_configuration.x=650;
        this.simple_cat_configuration.y=450;
        this.simple_cat_configuration.left_border=600;
        cur_cat=this.cat_factory.createCat(CatType.SIMPLE,this.simple_cat_configuration,this.mouse);
        this.cats.push(cur_cat);

        this.physics.add.collider(this.cats,this.platforms);
        this.physics.add.collider(this.cats,this.moving);
        this.physics.add.overlap(this.cats,this.mouse,(cat,mouse)=>{
            mouse.hurtBy(cat);
        });
        this.physics.add.overlap(this.mouse,this.cheese,()=>{
            this.nextScene();
        });
    }

    nextScene(){
        this.mouseJump_SFX.stop();
        this.pointGain_SFX.stop();
        this.mouseWalk_SFX.stop();
        this.lifeLost_SFX.stop();
        this.levelMus.stop();
        this.scene.start('ExampleScene');
    }

    update()
    {
        /*-*-*-*-*-*   Audio   *-*-*-*-*-*-*/
        //Mouse walk SFX
        if(this.mouse.isWalking)
        {
            this.walkMute = false;
            this.walkMute = this.musicMute;
            this.mouseWalk_SFX.setMute(this.walkMute);
        }
        else
        {
            this.walkMute = true;
            this.mouseWalk_SFX.setMute(this.walkMute);
        }

        //Update SFX mute with Music mute
        this.sfxMute = this.musicMute;
        this.mouseJump_SFX.setMute(this.sfxMute);
        this.pointGain_SFX.setMute(this.sfxMute);
        this.lifeLost_SFX.setMute(this.sfxMute);
        /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

        // alert(this.cats.length);
		let that = this;
		// console.log(this.moving.children.entries[3].body.position.x, this.moving.children.entries[3].body.position.y);
		if(!this.physics.overlap(this.mouse,this.ladders, this.mouse.saveLadderPos))
		{
			this.mouse.checkLadderStatus();
		}
		
        this.mouse.update(this.cursors);

        this.uiOverlay.updateMouseLives(this.mouse.lives);
        
        this.moving.children.entries.forEach((d) =>
        {
           d.update(); 
        });

        if(this.tigger_loop==0){
            let cur_cat=this.cat_factory.createCat(CatType.TIGGER,this.tigger_cat_configuration,this.mouse);
            cur_cat.setBounce(1);
            this.cats.push(cur_cat);
        }
        this.tigger_loop=(this.tigger_loop+1)%450;

        let index=0;
        while(index<this.cats.length){
            let cat=this.cats[index];
            if(cat instanceof TiggerCat){
                if(cat.tigger_loop>=600){
                    this.cats.splice(index,1);
                    cat.visible=false;
                    cat.destroy();
                    continue;
                }
                else{
                    cat.update();
                }
            }else{
                cat.update();
            }
            index++;
        }

        this.uiOverlay.updateHighScore(this.highScore);
    }

    addLadderConfiguration(x,y,story=5){
        this.ladder_configuration.x=x;
        this.ladder_configuration.y=y;
        this.ladder_configuration.story=story;
        this.ladder_configuration.width=this.ladderWidth;
        this.ladder_configuration.height=141.4;
        let ladd=new Ladder(this.ladder_configuration);
        this.ladders.add(ladd);
		ladd.body.allowGravity=false;
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
    
    addMovingConfiguration(x,y,setScale,setSize,width=75,height=10,scale=1){
        this.moving_configuration.x=x;
        this.moving_configuration.y=y;
        this.moving_configuration.setScale=setScale;
        this.moving_configuration.setSize=setSize;
        this.moving_configuration.width=width;
        this.moving_configuration.height=height;
        this.moving_configuration.scale=scale;
        let move=new MovingPlatform(this.moving_configuration);
        this.moving.add(move);
        move.body.allowGravity = false;
		move.body.setImmovable(true);
    }
	
    //Makes a level automatically from the following parameters:
    //floorCount: How many floors are there in this level? One-index.
    //offsetArray: From the left-most platform's left edge, how much space should there be? Should contain one entry per floor.
    //widthArray: A two-dimensional array, first containing arrays that correspond to each floor, which contain each platform's width on that floor.
    levelMaker(floorCount, offsetArray, widthArray)
    {        
        //Formula: firstPlat.XPos + firstPlat.width / 2 + 21 + secondPlat.width / 2 = secondPlat.XPos
        //Each floor is offset by 760 - 100 * floor number.
        let floorY = 790;
        for(let i = 1; i <= floorCount; i++)
        {
            let floorPlans = widthArray[i - 1];
            let lastXPos = offsetArray[i - 1] + floorPlans[0] / 2;
            this.addPlatformConfiguration(lastXPos, floorY - 100 * i, i, false, true, floorPlans[0] - this.PlatformOffset);
            for(let j = 1; j < floorPlans.length; j++)
            {
                //The ladder's position is determined from the gaps left in the floor.
                //Place the ladder 25 + firstPlat.XPos + firstPlat.width in x...
                //and 50 below the current floor's yPos. (in js, + 50)
                this.addLadderConfiguration(10 + lastXPos + floorPlans[j - 1] / 2, floorY - 100 * i + 45, i - 1);

                lastXPos = lastXPos + floorPlans[j-1] / 2 + this.ladderWidth + floorPlans[j] / 2;
                this.addPlatformConfiguration(lastXPos, floorY - 100 * i, i, false, true, floorPlans[j] - this.PlatformOffset);
            }
        }
    }
	
	checkOverlap()
	{
		if(this.physics.overlap(this.mouse, this.ladders))
		{
			return true;
		}
		
		return false;
	}

}