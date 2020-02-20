var dialogOpen = false;

$(document).ready(function(){
  $("#dialog-info").dialog({
    autoOpen : false,
      modal : true,
      show : "blind",
      hide : "blind",
      dialogClass: "popUpDialog",
      closeOnEscape: true,
      closeText: "",
      buttons: [
        {
            text: "close",
            class: "close-button-dialog",
          click: function() {
              $( this ).dialog( "close" );
          }
      }
    ]
  });
  $("#info-button").click(function(){
    if(dialogOpen == true){
      $("#dialog-info").dialog("close");
      dialogOpen = false;
    } else {
      $("#dialog-info").dialog("open");
      dialogOpen = true;
    }
  });
})
