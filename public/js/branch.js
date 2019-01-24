function branchView() {
  $.ajax({
    url : "branch",
    success: function(result){
      $(".main-bg").html(result);

    }
  })
}//todo put all things in succses!
function hideAllDelButtons(){
  var items = $(".btn-del-b");
  items.hide();
}
function showAllDelButtons(){
  var items = $(".btn-del-b");
  items.show();
}
function hideAllUpdateButtons(){
  var items = $(".btn-upd-b");
    items.hide();
}
function showAllUpdateButtons(){
  var items = $(".btn-upd-b");
    items.show();
}
var idB;
var addButtonB;
function press(event){
    var $this = $(this);
    var item = $this.parent().parent();
     var index =$(".list-branch").index(item);
     if($this.hasClass("btn-upd-b") === true){
       idB= $this.parent().find("h4").text().replace("name: ",'');
      item.hide();
      var p = item.parent();
    //  p.prepend('<div class="container list-branch"><a href="#" class="list-group-item"><h4 class="list-group-item-heading top">name: <input value='+ $this.parent().find("h4").text().replace("name: ",'')+'></input></h4><p class="list-group-item-text top">city:<input class= "right" value="'+$this.parent().find("p").text().replace("city: ",'')+'"></input></p><button  class="btn btn-light btn-sav-b">save</button><button  class="btn btn-light btn-del-b">delete</button></a></div>');
    item.before('<div class="container list-branch"><a href="#" class="list-group-item"><h4 class="list-group-item-heading top">name: <input value='+ $this.parent().find("h4").text().replace("name: ",'')+'></input></h4><p class="list-group-item-text top">city:<input class= "right" value="'+$this.parent().find("p").text().replace("city: ",'')+'"></input></p><button  class="btn btn-light btn-sav-b">save</button><button  class="btn btn-light btn-del-b">delete</button></a></div>');
    //item.append('</div><div class="container list-branch"><a href="#" class="list-group-item"><h4 class="list-group-item-heading top">name: <input value='+ $this.parent().find("h4").text().replace("name: ",'')+'></input></h4><p class="list-group-item-text top">city:<input class= "right" value="'+$this.parent().find("p").text().replace("city: ",'')+'"></input></p><button  class="btn btn-light btn-sav-b">save</button><button  class="btn btn-light btn-del-b">delete</button></a></div>');
       item.remove();
       hideAllUpdateButtons();
       hideAllDelButtons();
     }
     else if ($this.hasClass("btn-del-b") === true){
       
       idB= $this.parent().find("h4").text().replace("name: ",'');
    if(idB !== ''){
     $.ajax({
       url : "branchDel/"+idB,
       success: function(result){
       }});
       item.slideUp(500);
       item.remove();
       }
     }
     else if ($this.hasClass("btn-delMid-b") === true){
      //item.hide();
      addButtonB.show();
      item.remove();
     }
     else if ($this.hasClass("btn-sav-b") === true){
      
        var $this = $(this);
        var item = $this.parent().parent();
         var name= $this.parent().find("h4").find("input").val();
         var city= $this.parent().find("p").find("input").val();
         if(name !== '' && city !==''){
          let sendInfoB = {name, city};
           $.ajax({
              url : "branchUpd/"+idB,
               type: "POST",
               dataType: "json",
               success: function (result) {   item.hide();
                var p = item.parent();
                  item.before('<div class="container list-branch"><a href="#" class="list-group-item"><h4 class="list-group-item-heading top">name: '+ $this.parent().find("h4").find("input").val()+'</h4><p class="list-group-item-text top">city: '+$this.parent().find("p").find("input").val()+'</p><button  class="btn btn-light btn-upd-b">update</button><button  class="btn btn-light btn-del-b">delete</button></a></div>');
                 // p.append('<div class="container list-branch"><a href="#" class="list-group-item"><h4 class="list-group-item-heading top">name: '+ $this.parent().find("h4").find("input").val()+'</h4><p class="list-group-item-text top">city: '+$this.parent().find("p").find("input").val()+'</p><button  class="btn btn-light btn-upd-b">update</button><button  class="btn btn-light btn-del-b">delete</button></a></div>');
                  item.remove();              
                  showAllUpdateButtons();
                  showAllDelButtons();
                  },
               data: sendInfoB
      });
      
      }
}
     else if ($this.hasClass("btn-add-b") === true ){
       addButtonB =  $this;
       addButtonB.hide();
        var listBranch =$(".branch");
         listBranch.append('<div class="container list-branch"><a href="#" class="list-group-item"><h4 class="list-group-item-heading top">name: <input></input></h4><p class="list-group-item-text top">city:<input class= "right"></input></p><button  class="btn btn-light btn-addFinish-b">add</button><button  class="btn btn-light btn-delMid-b">delete</button></a></div>');

     }
     else if ($this.hasClass("btn-addFinish-b") === true ){
        var $this = $(this);
        var item = $this.parent().parent();
         var index =$(".list-branch").index(item);
         var p = item.parent();
         var name= $this.parent().find("h4").find("input").val();
         var city= $this.parent().find("p").find("input").val();
         if(name !== '' && city !==''){
          
           let sendInfoB = {name, city};
           $.ajax({
              url : "branchAdd",
               type: "POST",
               dataType: "json",
               success: function (result) { 
                 console.log("here!");
                item.hide();
                item.before('<div class="container list-branch"><a href="#" class="list-group-item"><h4 class="list-group-item-heading top">name: '+ $this.parent().find("h4").find("input").val()+'</h4><p class="list-group-item-text top">city: '+$this.parent().find("p").find("input").val()+'</p><button  class="btn btn-light btn-upd-b">update</button><button  class="btn btn-light btn-del-b">delete</button></a></div>');
               //p.append('<div class="container list-branch"><a href="#" class="list-group-item"><h4 class="list-group-item-heading top">name: '+ $this.parent().find("h4").find("input").val()+'</h4><p class="list-group-item-text top">city: '+$this.parent().find("p").find("input").val()+'</p><button  class="btn btn-light btn-upd-b">update</button><button  class="btn btn-light btn-del-b">delete</button></a></div>');
               item.remove()  
               addButtonB.show();
              },complete:function(){
               
              },
              error:function(xhr,status,err){
                    console.log(err);
              },
               data: sendInfoB
      });
           
         }
   }
}
$(document).on("click",".btn-upd-b",press);
$(document).on("click",".btn-del-b",press);
$(document).on("click",".btn-sav-b",press);
$(document).on("click",".btn-add-b",press);
$(document).on("click",".btn-delMid-b",press);
$(document).on("click",".btn-addFinish-b",press);
