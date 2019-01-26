function catalogView() {
    let mainBg = $(".main-bg");
    progressAnimation.start(mainBg);
    $.ajax("flowers",
        {success: function (result) {
                window.location.hash = "catalog";
                mainBg.stop().animate({backgroundColor: "#fff6f9"}, 500, function () {
                    mainBg.css({backgroundColor: "#fff6f9"});
                    progressAnimation.stop(mainBg, function () {
                        mainBg.html(result);
                    });
                });
            }
        }
    )
}
