class TiggerCat extends Cat{
    constructor(config,mouse,type)
	{
        super(config,mouse);
        this.body.velocity.x = type;
        this.body.collideWorldBounds = true;
        this.tigger_loop = 0;
    }

    update(){
        this.tigger_loop++;
    }
}