$(document).ready( function() {
  
  /*var source = "data/notes.json",
      notes = {};

  $.getJSON(source, function(data) {

    $.each( data, function( key, val ) {
      var notename = key;
      notes.push('<span id="' + key + '-tip" class="tooltip"><span class="inner">' + val + '</span></span>');
    });
    $(".feeds").css("display","none").html(items.join( "" )).slideDown();
  });*/

  $( ".tooled" ).click( function() {
      var tipped = $(this).attr('id') + '-tip';
      $('#' + tipped).slideToggle("slow","linear");

      return false;
  });

});
