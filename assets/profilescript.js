const createTabs = ["#c-info", "#c-food", "#c-drinks", "#c-guests", "#c-specials"];
const createForm = ["#f-info", "#f-food", "#f-drinks", "#f-guests", "#f-specials"];
const closeBtn = ["#fi-close", "#ff-close", "#fd-close", "#fg-close", "#fs-close"];
var sCounter = 0;
var sIDString;
var sInIDString;
var sDelIDString;
var sUlIDString;
var voteAnswers = [];
var voteAnswersChar = ["a", "b", "c", "d", "e", "f","g"];

$(document).ready(function() {
  $(".createBasic").click(function(){
     var selected = "#" + jQuery(this).attr("id");
    toggleForm(selected);
  });

  $(".close-btn").click(function(){
    var selected = "#" + jQuery(this).attr("id");
    toggleCloseButton(selected);
    console.log(selected)
  });

  $("input[name='foodOrigin']").on("change", function(){
      if ($(this).val()=="provide") {
           $("#food-list1").text("What food are you going to provide?");
           $("#food-list2").text("Do your guests have to bring food too?");
           resort(1,2);
      } else  {
           $("#food-list1").text("What food does urparty need?");
           $("#food-list2").text("Are you going to provide some food?");
           resort(2,1);
      }
  });

  $(".btn-add").click(function(){
    var listArr = ["btn-add","#btn-add1", "#btn-add2", "#btn-add3", "#btn-add4", "#btn-add5"];
    var listSelect = "#" + jQuery(this).attr("id");
    var listPos;
    for(var i = 0; i<listArr.length; i++){
      if(listSelect == listArr[i]){
        listPos = i;
      }
    }
    var itemInput = "Item" + listPos;
    var itemToAdd = $("input[name='item"+listPos+"']").val();
    if(itemToAdd != ""){
      $("#List" + listPos).append("<li class='itemList'><input class='c-input' id='Input"+listPos+"' name="+itemInput+" type='text' value='"+itemToAdd+"'></input></li>");
      console.log(itemToAdd);
      $("input[name='item"+listPos+"']").val("");
    };
  });

  $("input[name='drinkOrigin']").on("change", function(){
    if($(this).val()=="provide"){
      $("#drink-list1").text("What drinks are you going to provide?");
      $("#drink-list2").text("Do your guests have to bring drinks too?");
      resort(3,4);
    } else {
      $("#drink-list1").text("What drinks does urparty need?");
      $("#drink-list2").text("Are you also going to provide some drinks?");
      resort(4,3);
    }
  });

  $("#s-add").click(function(){
    if(sCounter < 7){
		sIDString = "sPoll" + sCounter;
		sInIDString = "sIn" + sCounter;
		sDelIDString = "sOut" + sCounter;
		sUlIDString = voteAnswersChar[sCounter];
		var specialsDIV = "<div class='pollStyle' id='"+sIDString+ "'>" +
					"<input class='c-input' type='text' name='voteTopic' placeholder='Topic'>"+
					"<ul class='ul-itemList' id='"+sUlIDString+"'>"+
          "<input id='answer1' class='c-input' type='text' name='vote' placeholder='Vote Answer'>"+
          "<input id='answer2' class='c-input' type='text' name='vote' placeholder='Vote Answer'>"+
          "<input id='answer3' class='c-input' type='text' name='vote' placeholder='Vote Answer'>"+
          "<input id='answer4' class='c-input' type='text' name='vote' placeholder='Vote Answer'>"+
          "</ul><hr></div>"
		$("#s-votes").append(specialsDIV);
		sCounter++;
		console.log(sCounter);
  }
	});



	$("#s-delete").click(function(){
		console.log(sCounter);
		if(sCounter > 1){
			var i = sCounter - 1;
			console.log(i);
			$("#sPoll" + i).detach();
			sCounter--;
		} else{
			$("#sPoll0").detach();
		}

	});

  $(document).on("dblclick",".itemList", function(){
        $(this).fadeOut("slow");
        console.log(this);
        $(this).remove();
      });

  $("#List1,#List2,#List3,#List4,#List5").sortable();

  $("input[name='Item1']").keyup(function(event){
    if(event.keyCode == 13){
      $(".btn-add").click();
    }
  });

  $("input[name='Item2']").keyup(function(event){
    if(event.keyCode == 13){
      $(".btn-add").click();
    }
  });

  $("input[name='Item3']").keyup(function(event){
    if(event.keyCode == 13){
      $(".btn-add").click();
    }
  });

  $("input[name='Item4']").keyup(function(event){
    if(event.keyCode == 13){
      $(".btn-add").click();
    }
  });

  $("input[name='Item5']").keyup(function(event){
    if(event.keyCode == 13){
      $(".btn-add").click();
    }
  });

  $("input[name='guestPlus']").on("keyup keydown", function(event){
    if($(this).val() > 50 && event.keyCode != 46 && event.keyCode != 8){
      event.preventDefault();
      $(this).val(50);
    }
  });

  $("input[name='wishlist']").on("change", function(){
    if($(this).val() == "wish-yes"){
      $("#wishInput").prop('disabled', false);
    } else{
      $("#wishInput").prop('disabled', true);
    }
  });
});

function toggleForm(selected){
   var posInArray = createTabs.indexOf(selected);
   var heightVar;
   if($(window).width() < 500){
     heightVar = 0;
   } else {
     heightVar = "450px";
   }
   for(var i = 0; i<createTabs.length; i++){
     $(createTabs[i]).animate({opacity: 0}, 300, function(){
       $(createTabs[i]).css({"visibility": "hidden", "zIndex": "-1", "height": heightVar});
       });
   }
   $(createForm[posInArray]).css({"visibility": "visible", "zIndex": "10", "height": "100%"});
   $(createForm[posInArray]).animate({"opacity": "1.0"}, 1000);
   $(".createBasic").unbind("click", toggleForm);
 }

function toggleCloseButton(selected){
   var posInArray = closeBtn.indexOf(selected);
   var heightVar;
   if($(window).width() < 500){
     heightVar = "100px";
   } else {
     heightVar = "450px";
   }
   $(createForm[posInArray]).animate({opacity: 0}, 300, function(){
     $(createForm[posInArray]).css({"visibility": "hidden", "zIndex": "-10", "height": "0"});
   });
   for(var i = 0; i<createTabs.length; i++){
     $(createTabs[i]).css({"visibility": "visible", "zIndex": "0", "height": heightVar});
     $(createTabs[i]).animate({"opacity": "1.0"}, 1000);
   };
   $(".createBasic").bind("click", toggleForm);
   console.log("closed");
 }

function resort( mList, mList2){
   var listArr1 = $("#List" + mList + " li").toArray();
   var listArr2 = $("#List" + mList2 + " li").toArray();
   $("#List" + mList + " li").remove();
   $("#List" + mList2 + " li").remove();
   for(var i = 0; i<listArr1.length; i++){
     $("#List" + mList2).append(listArr1[i]);
   };
   for(var j = 0; j<listArr2.length; j++){
     $("#List" + mList).append(listArr2[j]);
   }
   console.log("Resort successfull");
 }
