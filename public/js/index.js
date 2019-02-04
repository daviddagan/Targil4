let role = "";
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
    queryAndUpdate("about");
}

function contactView() {
   queryAndUpdate("contact");
}
function queryAndUpdate(url,cb){
    let mainBg = $(".main-bg");
    progressAnimation.start(mainBg);
    $.ajax({
        url:url,
        success: function(result){
            window.location.hash = url;
            progressAnimation.stop(mainBg,function () {
                mainBg.html(result);
                if(cb) cb();
            })
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
                    role = "manager";
                    console.log(result,"logged");
                    $(tabs.get(1)).removeClass("disabled1");

                }
                else if(result.message ==="user"){
                    role = "user";
                    console.log(result,"logged");
                }
                if(result.message!=="not user"){
                    insertParam("username",username);
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
    window.history.replaceState(null, null, window.location.pathname);
    location.reload();
}
console.log(window.location.hash)
$(document).ready(function(){
    if(window.location.hash){
        let tabs = $(".tab-item-t4");
        switch(window.location.hash){
            case "#catalog":
                tabs.removeClass("active");
                $(tabs[0]).addClass("active");
                catalogView();
                break;
            case "#branch":
                tabs.removeClass("active");
                $(tabs[1]).addClass("active");
                branchView();
                break;
            case "#users":
                tabs.removeClass("active");
                $(tabs[2]).addClass("active");
                usersView();
                break;
            case "#about":
                aboutView();
                break;
            case "#contact":
                tabs.removeClass("active");
                $(tabs[4]).addClass("active");
                contactView();
                break;
            default:
                aboutView();
        }
    }else{
        aboutView();
    }
});
function insertParam(key, value) {
    key = encodeURI(key); value = encodeURI(value);

    var kvp = document.location.search.substr(1).split('&');

    var i=kvp.length; var x; while(i--)
{
    x = kvp[i].split('=');

    if (x[0]==key)
    {
        x[1] = value;
        kvp[i] = x.join('=');
        break;
    }
}

    if(i<0) {kvp[kvp.length] = [key,value].join('=');}

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&');
}
// catalog
// branch managment
// user managment
// about
// contact

