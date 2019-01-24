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
            returnBackgroundColor();
            branchView();
            break;
        case 2:
            returnBackgroundColor();
            usersView();
            break;
        case 3:
            returnBackgroundColor();
            aboutView();
            break;
        case 4:
            returnBackgroundColor();
            contactView();
            break;
        default:
            returnBackgroundColor();
            break;

    }

});
function returnBackgroundColor(){
    $(".main-bg").stop().animate({backgroundColor:"#fff"},500,function(){
        $(".main-bg").css({backgroundColor:"#fff"});
    });
}


function aboutView() {
    console.log("activated");
    $.ajax({
        url: "about",
        success: function (result) {
            window.location.hash = "about";
            $(".main-bg").html(result);
        }
    });
}

function contactView() {
    $.ajax({
        url:"contact",
        success: function(result){
            $(".main-bg").html(result);
        }
    })
}


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
        login("hide");
        $.ajax({
            url: "login",
            type: "POST",
            dataType: "json",
            success: function (result) {
                let tabs =$(".tab-item-t4");
                usernameLocal =username;//TODO: after git merging add to all http bodies the username
                if(result.message ==="manager"){
                    console.log(result,"logged");
                    $(tabs.get(1)).removeClass("disabled1");

                }
               else if(result.message ==="user"){
                    console.log(result,"logged");


                }
                if(result.message!=="not user"){
                    $(tabs.get(0)).removeClass("disabled1");
                    $(tabs.get(2)).removeClass("disabled1");
                    let logout =$("#logoutB");
                    logout.removeClass("nonish");
                }

            },
            data: sendInfo
        });
        // console.log(password,username);
        // fetch("login",{
        //     method: 'post',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(sendInfo)
        // })
        //     .then(function(response){
        //         return response.json()
        //     }).then(function(data){
        //         console.log(data.message);
        //     if(data.message ==="manager"){
        //         console.log(result,"logged");
        //         let tabs =$(".tab-item-t4");
        //         $(tabs.get(0)).removeClass("disabled1");
        //         $(tabs.get(1)).removeClass("disabled1");
        //         $(tabs.get(2)).removeClass("disabled1");
        //
        //         let logout =$("#logoutB");
        //         logout.removeClass("nonish");
        //     }
        //    else if(data.message ==="user"){
        //         let tabs =$(".tab-item-t4");
        //         $(tabs.get(0)).removeClass("disabled1");
        //         $(tabs.get(2)).removeClass("disabled1");
        //     }
        // });
        return false;
    });
});

function logout() {
    $.ajax({url:"reset"})
    let tabs =$(".tab-item-t4");
    $(tabs.get(0)).addClass("disabled1");
    $(tabs.get(1)).addClass("disabled1");
    $(tabs.get(2)).addClass("disabled1");
    location.reload();
}
console.log(window.location.hash)
$(document).ready(function(){
    if(window.location.hash){
        switch(window.location.hash){
            case "#about":
                aboutView();
                break;
            case "#catalog":
                console.log("catalog reload?")
                catalogView();
                break;
            default:
                aboutView();
        }
    }else{
        aboutView();
    }
})


// catalog
// branch managment
// user managment
// about
// contact