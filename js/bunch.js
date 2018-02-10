$(document).ready( function() {

  /* Fade areas */
  $(".area.hid").css({"display":"none","opacity":"0"});

  /* Initialize TOC */
  $( ".pagenav li.active" ).each( function() {
    var temp = $( this ).children( "a" ).attr( "class" );
    $("#" + temp + "-toc").toc({ headers: '.' + temp + ' h2, .' + temp + ' h3' });
  });

  /* Navigation update */
  $( ".pagenav li.internal a" ).click( function() {
    $( this ).closest( "li" ).addClass("active");
    $( this ).closest( "li" ).siblings().removeClass("active");
  });

  /* Fade other bunches */
  $( ".internal a" ).click( function() {
    var temp = $( this ).attr( "class" );
    $( this ).closest( ".bunch" ).find( ".area" ).each( function(index) {
      var elem = $(this);
      if ( $( elem ).hasClass( temp ) ) {
        $( elem ).css("display","block").animate({"opacity":"1"},1000);
      } else {
        $( elem ).css({"display":"none","opacity":"0"});
      }
    });
    $(window).scrollTop(0);
    return false;
  });

  /* Regenerate TOC */
  $( ".internal a" ).click( function() {
    var temp = $( this ).attr( "class" ),
        tocli = "#" + temp + '-toc';
    $( this ).closest( ".bunch" ).find( ".area" ).each( function(index) {
      var elem = $(this);
      if ( $( elem ).hasClass( temp ) ) $( tocli ).toc({ headers: '.' + temp + ' h2, .' + temp + ' h3' });
    });
  });
  //$(".bunch").offset({top: 500});

});
