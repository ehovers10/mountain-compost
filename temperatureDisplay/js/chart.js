$(document).ready( function() {

  $( ".chartnav li.internal a" ).click( function() {
    var temp = $( this ).attr( "class" );
    $( this ).closest( "li" ).addClass("active");
    $( this ).closest( "li" ).siblings().removeClass("active");
    $( this ).closest( ".bunch" ).find( ".area" ).each( function() {
      if ( $( this ).hasClass( temp ) ) {
        $( this ).removeClass("hid");
      } else {
        $( this ).addClass("hid");
      }
    });
    return false;
  });

  $( "#screenwidth").val( $(window).width() );
  $( "#screenheight" ).val( $(window).height() );
});
