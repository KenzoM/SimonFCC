$(document).ready(function(){

  $("#on-off-slider").click(function(){
    $(this).toggleClass("on")
  })

  $("#level-slider").click(function(){
    $(this).toggleClass("strict")
  })

  $(".btn-round").click(function(){
    if($("#on-off-slider").hasClass("on")){
      console.log("It's on!")
      console.log($("#level-slider").hasClass("strict"))
    } else{
      console.log("it's off")
    }
  })
})
