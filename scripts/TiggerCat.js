class TiggerCat extends Cat{
    constructor(config,type)
	{
        super(config);
        this.body.velocity.x = type;
        this.body.collideWorldBounds = true;
        this.tigger_loop = 0;
    }

    update(){
        this.tigger_loop++;
    }
}