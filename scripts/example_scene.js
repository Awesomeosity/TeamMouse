class ExampleScene extends Phaser.Scene{
    constructor(test) {
        super({
            key: 'ExampleScene'
        });
        this.stupid_loop_count=0;
        this.stupid_config={
            scene:this,
            key:'stupid_cat',
            x:100,
            y:10,
            originalStory:5,
            isMuggle:true
        };
        this.maho_config={
            scene:this,
            key:'maho_cat',
            x:100,
            y:670,
            originalStory:0
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
        this.highestStory=6;
    }

	preload()
	{
	    //Start up UI scene and assign to variable
		this.scene.launch('GameUI');
		this.uiOverlay = this.scene.get('GameUI');

		//For tracking the player's high score throughout the level
		this.highScore = 0; //TODO: Add to high score whenever you do something (get past a cat?)

        //Loads level music
        this.load.audio('LevelMus', '../audio/Level1-Mus.wav'); //TODO: Make music reset when level reloads
        this.load.audio('MouseWalk', '../audio/Level1-MouseWalk.wav');
	}

    create()
    {
        this.add.image(400, 400, 'sewer_background');

        //Initializes and plays level sounds
        this.levelMus = this.sound.add('LevelMus');
        this.mouseWalk_SFX = this.sound.add('MouseWalk');
        let musConfig =
            {
                mute: false,
                volume: 0.5,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0
            };
        //Music
        this.levelMus.play(musConfig);
        this.musicMute = true;                                      //Music mutes by default
        this.levelMus.setMute(this.musicMute);
        this.input.keyboard.on('keydown-M', ()=> {       //Pressing M mutes / un-mutes
            this.musicMute = !this.musicMute;
            this.levelMus.setMute(this.musicMute);
        });

        //SFX
        this.mouseWalk_SFX.play(musConfig);
        this.sfxMute = true;
        this.mouseWalk_SFX.setMute(this.sfxMute);




        this.ladders = this.physics.add.group();
        this.platforms = this.physics.add.staticGroup();

        let sematary_config={
            scene:this,
            key:'cat_sematary',
            x:30,
            y:720
        };
        
        this.catSematary=new CatSematary(sematary_config);
        
        this.PlatformOffset = 2;
        this.ladderWidth = 21;
		this.floorHeight = 100;

        this.addPlatformConfiguration(400, 790, 0, false, true, 800, 10, 1);

        
        let offSetArray = [20, 60, 20, 60, 20, 325];
        let widthArray = [];
        widthArray[0] = [200, 400, 1];
        widthArray[1] = [50, 200, 400];
        widthArray[2] = [200, 400, 1];
        widthArray[3] = [50, 300, 400];
        widthArray[4] = [190, 400, 1];
        widthArray[5] = [150];
        this.levelMaker(5, offSetArray, widthArray);

        this.physics.add.collider(this.ladders,this.platforms);


        //Mouse initialization
        this.mouse=new Mouse({
            scene:this,
            key:'mouse',
            x:100,
            y:730
        });
        this.mouse.body.collideWorldBounds=true;

        this.cats=[];

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
        
        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('Level2');
            this.scene.stop();
        });

    }

    update()
    {
		let that = this;
		this.stupid_loop_count=(this.stupid_loop_count+1)%150;
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

		//Mouse SFX
       if(this.mouse.isWalking)
       {
            this.sfxMute = false;
            this.sfxMute = this.musicMute;
            this.mouseWalk_SFX.setMute(this.sfxMute);
       }
       else
       {
           this.sfxMute = true;
           this.mouseWalk_SFX.setMute(this.sfxMute);
       }

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
        this.uiOverlay.updateMouseLives(this.mouse.lives);

        //Win condition
        if (this.mouse.currentStory == this.highestStory)
        {
            //TODO: transition to the next level, play any animations
            this.scene.launch('GameOverScene');
            this.scene.pause();
        }

        //Lose condition
        // if (this.mouse.lives <= 0)
        // {
        //     this.scene.launch('GameOverScene');
        //     this.scene.pause();
        // }

        this.uiOverlay.updateHighScore(this.highScore); //TODO: use a HighScore text class to store and update high score
    }

    enter_sematary(cat){
        if(cat instanceof StupidCat){
            if(!cat.isMuggle){
                let newCat=CatFactory.getInstance().createCat(CatType.MAHO,this.maho_config);
                if(newCat){
                    newCat.body.collideWorldBounds=true;
                    this.cats.push(newCat);
                }
            }

            CatFactory.getInstance().killCat(cat);
            var pos = this.cats.indexOf(cat);
            this.cats.splice(pos,1);
            cat.visible=false;
            cat.destroy();
        }
    }

    addLadderConfiguration(x,y,story=5){
        this.ladder_configuration.x=x;
        this.ladder_configuration.y=y;
        this.ladder_configuration.story=story;
        this.ladder_configuration.width=this.ladderWidth;
        this.ladder_configuration.height=141.4;
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
	
    //Makes a level automatically from the following parameters:
    //floorCount: How many floors are there in this level? One-index.
    //offsetArray: From the left-most platform's left edge, how much space should there be? Should contain one entry per floor.
    //widthArray: A two-dimensional array, first containing arrays that correspond to each floor, which contain each platform's width on that floor.
    //TODO: Modify this so that we can tell it which ladders are broken.
    levelMaker(floorCount, offsetArray, widthArray)
    {        
        //Formula: firstPlat.XPos + firstPlat.width / 2 + 21 + secondPlat.width / 2 = secondPlat.XPos
        //Each floor is offset by 760 - 100 * floor number.
        let storeyHeight = 140;
        let floorY = 790;
        for(let i = 1; i <= floorCount; i++)
        {
            let floorPlans = widthArray[i - 1];
            let lastXPos = offsetArray[i - 1] + floorPlans[0] / 2;
            this.addPlatformConfiguration(lastXPos, floorY - storeyHeight * i, i, false, true, floorPlans[0] - this.PlatformOffset);
            for(let j = 1; j < floorPlans.length; j++)
            {
                //The ladder's position is determined from the gaps left in the floor.
                //Place the ladder 25 + firstPlat.XPos + firstPlat.width in x...
                //and 50 below the current floor's yPos. (in js, + 50)
                this.addLadderConfiguration(10 + lastXPos + floorPlans[j - 1] / 2, floorY - storeyHeight * i + 45, i - 1);

                lastXPos = lastXPos + floorPlans[j-1] / 2 + this.ladderWidth + floorPlans[j] / 2;
                this.addPlatformConfiguration(lastXPos, floorY - storeyHeight * i, i, false, true, floorPlans[j] - this.PlatformOffset);
            }
        }
    }
}