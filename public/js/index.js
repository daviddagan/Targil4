$(".tab-item-t4").on('click', function () {
    let $this = $(this);
    if ($this.hasClass("disabled1")) return;
    $(".tab-item-t4").removeClass("active");
    $this.addClass("active");
    let index = $(".tab-item-t4").index($this);
    switch (index) {
        case 0:
            catalogView();
            break;
        case 1:
            branchView();
            break;
        case 2:
            usersView();
            break;
        case 3:
            aboutView();
            break;
        case 4:
            contactView();
            break;
        default:
            break;

    }

});

function catalogView() {


}

function branchView() {

}

function usersView() {

}

function aboutView() {
    console.log("activated")
    $.ajax({
        url: "about", success: function (result) {
            $(".main-bg").html(result);
        }
    });
}

function contactView() {

}

aboutView();

function login(showhide) {
    if (showhide == "show") {
        document.getElementById('popupbox').style.visibility = "visible";
    } else if (showhide == "hide") {
        document.getElementById('popupbox').style.visibility = "hidden";
    }
}

$(function () {
    $("#loginForm").submit(function (event) {
        let password = $("#passwordF").val();
        let username = $("#usernameF").val();
        let sendInfo = {username, password};
        $.ajax({
            url: "login",
            type: "POST",
            dataType: "json",
            success: function (result) {
                if(result.message ==="manager"){
                    console.log(result,"logged");
                    let tabs =$(".tab-item-t4");
                    tabs.get(0).removeClass("disabled1");
                    tabs.get(1).removeClass("disabled1");
                    tabs.get(2).removeClass("disabled1");
                }
            },
            data: sendInfo
        });
        login("hide");
        return false;
    });
});

function logout() {
    $.ajax({url:"/reset"})
}
// catalog
// branch managment
// user managment
// about
// contact