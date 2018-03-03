<!--Image Toggles -->
$(document).ready(function(){
  $("#img-field").click(function(){
    $("#img-tog").toggle();
  })
})
$(document).ready(function(){
  $("#img-field2").click(function(){
    $("#img-tog2").toggle();
  })
})

<!--Video Toggles -->
$(document).ready(function(){
  $("#vid-field1").click(function(){
    $("#video-tog").toggle();
  })
})

$(document).ready(function(){
  $("#vid-field2").click(function(){
    $("#video-tog2").toggle();
  })
})

var url = "http://allorigins.me/get?url=" + encodeURIComponent("http://www.nfl.com/rulebook/beginnersguidetofootball");
$.get(url, function(response){

  console.log(response);
})

var myText = response.match(/<div id="nflbasics">\*<\/div>/);
function test(){
  document.write(myText);
}
