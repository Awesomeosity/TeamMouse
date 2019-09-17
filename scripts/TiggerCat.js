class TiggerCat extends Cat{
    constructor(config,type){
        super(config);
        this.body.velocity.x=type;
    }
}