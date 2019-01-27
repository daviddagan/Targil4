let userClickedName;

function usersView() {
    queryAndUpdate("users");
}

$(".main-bg").on('click', ".editUserButton", function () {
    let $this = $(this);
    let index = $(".editUserButton").index($this);
    var username = $this.parent().parent().find(".editUserName");
    $(".list-group-item").css({"border-color": "rgba(0,0,0,.125)"});
    $this.parent().parent().css({"border-color": "green"});
    $.ajax({
        url: "users/get/" + username.text(),
        success: function (user) {
            if (user.role === "manager")
                managerUpdate(user);
            else if (user.role === "worker")
                workerUpdate(user);
            else
                clientUpdate(user);
            userClickedName = user.name;
            optionChanged()
        }
    })


})

function managerUpdate(user) {
    $("#selectUser").val(user.role);
    $("#one").val(user.name);
    $("#two").val(user.password);
    $("#three").val(user.branch);
    $("#four").val(user.age);
    $("#five").val(user.rank);


    $("#L2").text("סיסמא");
    $("#L3").text("סניף");
    $("#L4").text("גיל");
}

function workerUpdate(user) {
    $("#selectUser").val(user.role);
    $("#one").val(user.name);
    $("#two").val(user.password);
    $("#three").val(user.username);
    $("#four").val(user.salary);


    $("#L2").text("סיסמא");
    $("#L3").text("כינוי");
    $("#L4").text("משכורת");

}

function clientUpdate(user) {
    $("#selectUser").val(user.role);
    $("#one").val(user.name);
    $("#two").val(user.favorite);
    $("#three").val(user.password);
    $("#four").val(user.phone);

    $("#L2").text("סניף מועדף");
    $("#L3").text("סיסמא");
    $("#L4").text("טלפון");
}


function optionChanged() {
    var photographyTypeElement = document.getElementById("selectUser");
    var selectedValue = photographyTypeElement.options[photographyTypeElement.selectedIndex].value;
    var optionalValues = ["manager", "worker", "client"];

    if (selectedValue == "manager") {
        document.getElementById("rankId").style.display = "";
    }
    else {
        document.getElementById("rankId").style.display = "none";
    }
}


$(".main-bg").on('submit', "#formUser", function () {
    let user = {};
    let role = $("#selectUser").val();
    if (role === "manager") {
        user.role = $("#selectUser").val();
        user.name = $("#one").val();
        user.password = $("#two").val();
        user.branch = $("#three").val();
        user.age = $("#four").val();
        user.rank = $("#five").val();
    }
    else if (role === "worker") {
        user.role = $("#selectUser").val();
        user.name = $("#one").val();
        user.favorite = $("#two").val();
        user.password = $("#three").val();
        user.phone = $("#four").val();
    }
    else if (role === "client") {
        user.role = $("#selectUser").val();
        user.name = $("#one").val();
        user.favorite = $("#two").val();
        user.password = $("#three").val();
        user.phone = $("#four").val();
    }
    let container = $(".edit-form-conatiner");
    progressAnimation.start(container)
    $.ajax({
        url: "userUpd/" + userClickedName,
        body: user,
        success: function (result) {
            progressAnimation.stop(container, function () {
                $("#formUser")[0].reset();
                userClickedName = '';
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
            progressAnimation.stop(container, function () {
                $(".main-bg").prepend("<p>there was an error on the server....</p>")
            })
        }
    });
    return false;
})

 
