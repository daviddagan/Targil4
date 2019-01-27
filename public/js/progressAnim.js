let progressAnimation = {
    start : function($div){
        let loader =$("<div class=\"lds-circle\"><div></div></div>");
        loader.hide();
        $div.append(loader);
        $div.find(".lds-circle").fadeIn(300);
    },
    stop:function($div,cb){
        $div.find(".lds-circle").fadeOut(200,function(){
            $(this).remove();
            if (cb){
                cb();
            }
        });
    }
};