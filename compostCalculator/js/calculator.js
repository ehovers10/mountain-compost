$(document).ready( function() {

  var items = [],
      source = [];
  $("#datasource").change( function() {
    source = $("#datasource").val();

    $.getJSON(source, function(data) {

      $.each( data, function( key, val ) {
        var feedname = key.toLowerCase().replace(/\s+/g, '-');
        items.push( "<div class='feed'><input type='checkbox' id='" + feedname + "' name='fstock[]' value='" + key + "'><label for='" + key + "'>" + key + "</label></div>" );
      });
      $(".feeds").css("display","none").html(items.join( "" )).slideDown();
    });

  });

  index=0;
  $( ".datamanual").click( function(){
    ++index;
    $( ".additional" ).append( "<ul><li><label for='customfeed" + index + "'>Feedstock: </label><input class='name' type='text' name='customfeed" + index + "' id='customfeed" + index + "' placeholder='name'></li><li><label for='customcarbon" + index + "'>Carbon:Nitrogen: </label><input class='cn' type='number' name='customcarbon" + index + "' id='customcarbon" + index + "' size='2' placeholder='25'></li><li><label for='custommoisture" + index + "'>Moisture content (%): </label><input class='mc' type='number' name='custommoisture" + index + "' id='custommoisture" + index + "' size='2' placeholder='50'></li><li><label for='custombulk" + index + "'>Bulk density: </label><input class='bd' type='number' name='custombulk" + index + "' id='custombulk" + index + "' size='3' placeholder='800'></li></ul>");

    return false;
  });

  $("#submit").click( function() {
    var jsonitems = choices();

  });

  function choices() {
    var source = $("#datasource").val(),
        mctarget = $("#mctarget").val(),
        cntarget = $("#cntarget").val(),
        bdtarget = $("#bdtarget").val();
    var chosen = {},
        feedMC = [],
        feedBD = [],
        feedCN = [],
        matrixA = [],
        matrixB = [];
    $(".feeds").find(":checked").each(function() {
      //chosen.push($(this).val());
      var selected = $(this).val();
      $.getJSON(source, function(data) {
        $.each( data, function( key, val ) {
          var temp = { key: val };
          if ( key == selected ) {
            chosen[key] = val;
            feedMC.push(val["M"]);
            feedBD.push(val["D"] * 100);
            feedCN.push(val["C"] / val["N"]);
          }
        });
        matrixA = [feedMC,feedBD,feedCN];
        matrixB = [mctarget,bdtarget,cntarget];
        $(".itemsjson").html(matrixA + "<br>" + matrixB);
      });
    });
  }

  $( "#screenwidth").val( $(window).width() );
  $( "#screenheight" ).val( $(window).height() );
});
