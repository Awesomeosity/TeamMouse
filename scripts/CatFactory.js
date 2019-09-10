var CatFactory=(function () {
    var factory;
    var stupid_max=5;
    var stupid_total=0;
    function init() {
        return {
            createCat: function (catType,config) {
                switch (catType) {
                    case CatType.STUPID:
                        if(stupid_total+1<=stupid_max){
                            stupid_total++;
                            return new StupidCat(config);
                        }
                        else{
                            return null;
                        }
                    default:
                        return new StupidCat(config);
                }
            },
            killCat: function (cat) {
                if(cat instanceof StupidCat){
                    stupid_total--;
                }
            }
        }
    }

    return{
        getInstance:function () {
            if(!factory){
                factory=init();
            }
            return factory;
        }
    }
})();