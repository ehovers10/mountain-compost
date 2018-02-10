$(document).ready( function() {

  if ($(window).width() > 1600) {
    var nudge = ($(window).width() - 1600 ) / 2;
  } else {
    var nudge = 0;
  }
  var stretch = $(window).height();
  $(".pageback").css("height",stretch);
  $(".widewrap").css("margin-left",nudge);

/* Fixed header */
  $(window).scroll(function(){

    var winTop = $(window).scrollTop(),
        winWidth = $(window).width();
    if (winTop > 70 && winWidth > 800 ) {
      $("#site-nav").css({
        "position":"fixed",
        "top":"0",
        "left":"0",
        "width": "100%"
      });
      //$(".widewrap").css("left", nudge);
      $(".navtitle").css("display","block");
    }
    else {
      $("#site-nav").css({"position":"static"});
      $(".navtitle").css("display","none");
    }

    if (winTop > 150 && winWidth > 800) {
      $(".bunch .pagenav").css({
        "position":"fixed",
        "top":"70px",
        "left":nudge,
        "background": "#f5f5f5"
      });
    }
    else {
      $(".bunch .pagenav").css({"position":"static","background": "none"});
    }
  });
});
