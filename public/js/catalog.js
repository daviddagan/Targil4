function catalogView() {
$.ajax("flowers",
    {success:function (result) {
            window.location.hash = "catalog";
            $(".main-bg").html(result);
            $(".main-bg").stop().animate({backgroundColor:"#fff6f9"},500,function(){
                $(".main-bg").css({backgroundColor:"#fff6f9"});
            });
        }
    }
)

}
