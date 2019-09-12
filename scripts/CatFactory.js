var CatFactory=(function () {
    var factory;
    var stupid_max=10;
    var stupid_total=0;
    var maho_max=5;
    var maho_total=0;
    function init() {
        return {
            createCat: function (catType,config) {
                switch (catType) {
                    case CatType.STUPID:
                        if(stupid_total+1<=stupid_max){
                            let newCat=new StupidCat(config);
                            if(stupid_total%2==0){
                                newCat.isMuggle=false;
                            }else{
                                newCat.isMuggle=true;
                            }
                            stupid_total++;
                            return newCat;
                        }
                        else{
                            return null;
                        }
                    case CatType.MAHO:
                        if(maho_total+1<=maho_max){
                            maho_total++;
                            return new MahoCat(config);
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
                }else if(cat instanceof MahoCat){
                    maho_total--;
                }
            },
            resetNumber: function(cat){
                stupid_total=0;
                maho_total=0;
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