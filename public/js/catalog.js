function catalogView() {
$.ajax("flowers",
    {success:function (result) {
            $(".main-bg").html(result);
        }
    }
)

}
