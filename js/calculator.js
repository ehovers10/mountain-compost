$(document).ready( function() {
  var source = $("#datasource").val(),
      mctarget = $("#mctarget").val(),
      cntarget = $("#cntarget").val(),
      bdtarget = $("#bdtarget").val();
  var chosen = {},
      feedMC = [],
      feedBD = [],
      feedCN = [],
      matrixA = [],
      matrixB = [],
      output = [];
  var items = [],
      source = [],
      index = 0;
  var chartwidth = $(".formwrap").width(),
      parts = {};

  //$(".calcdisplay").addClass("hid");

  $("#datasource").change( function() {
      source = $("#datasource").val();

      $.ajax({
        url: source,
        dataType: 'json',
        async: false,
        success: function(data) {
          $.each( data, function( key, val ) {
            var feedname = key.toLowerCase().replace(/\s+/g, '-');
            items.push( "<div class='feed'><input type='checkbox' id='" + feedname + "' name='fstock[]' value='" + key + "'><label for='" + key + "'>" + key + "</label></div>" );
          });
        }
      });

      $(".feeds").css("display","none").html(items.join( "" )).slideDown();
  });
  $( ".datamanual").click( function() {
    ++index;
    $( ".additional" ).append( "<ul><li><label for='customfeed" + index + "'>Feedstock: </label><input class='name' type='text' name='customfeed" + index + "' id='customfeed" + index + "' placeholder='name'></li><li><label for='customcarbon" + index + "'>Carbon:Nitrogen: </label><input class='cn' type='number' name='customcarbon" + index + "' id='customcarbon" + index + "' size='2' placeholder='25'></li><li><label for='custommoisture" + index + "'>Moisture content (%): </label><input class='mc' type='number' name='custommoisture" + index + "' id='custommoisture" + index + "' size='2' placeholder='50'></li><li><label for='custombulk" + index + "'>Bulk density: </label><input class='bd' type='number' name='custombulk" + index + "' id='custombulk" + index + "' size='3' placeholder='800'></li></ul>");

    return false;
  });

  $("#submit").click( function() {
    choices();
    listfeeds();
    $.each(chosen, function(key,val) {
      parts[key] = 1;
    });
    listparts();
    calculate();
    //$(".calcdisplay").removeClass("hid");
  });

  function listfeeds() {
    $(".feedlist").html("");
    $.each(chosen, function(key,val) {
      $(".feedlist").append(
        '<div class="feed">' +
        "<b>" + key + "</b><br>" +
        "Moisture Content: " + val["M"].toFixed(0) + "<br>" +
        "Bulk Density: " + (val["D"] * 100).toFixed(0) + "<br>" +
        "Carbob:Nitrogen: " + (val["C"] / val["N"]).toFixed(0) + "<br>" +
        "</div>"
      );

    });
    //$(".feedlist").append('<div style="clear:both;"></div>');
  }

  function listparts() {
    partstable = '<table class="partstable">';
    $.each(chosen, function(key,val) {
      var feedname = key.toLowerCase().replace(/\s+/g, '-');
      partstable += '<tr><td></td><th><label for="' + feedname + '">' + key + '</label></th><td></td></tr>' + '<tr><td><a class="partdown button" href="#">-</a></td><td><input type="number" size="3" class="feed-part" name="' + feedname + '-parts" id="' + feedname + '-parts" value="'+ parts[key] + '"></td><td><a class="partup button" href="#">+</a></td></tr>'
    });
    partstable += '</table>'
    $(".partslist").html(partstable);
    $(".partup").click( function() {
      var feed = $(this).parents("tr").prev().find("label").html();
      var newval = parseInt($(this).parents("tr").find(".feed-part").val(),10) + 1;
      $(this).parents("tr").find(".feed-part").val(newval);
      parts[feed] = newval;
      calculate();
      return false;
    });
    $(".partdown").click( function() {
      var feed = $(this).parents("tr").prev().find("label").html();
      var newval = parseInt($(this).parents("tr").find(".feed-part").val(),10) - 1;
      $(this).parents("tr").find(".feed-part").val(newval);
      parts[feed] = newval;
      calculate();
      return false;
    });
  }

  function calculate() {
    var mctotal = bdtotal = cntotal = mcwidth = bdwidth = cnwidth = 0,
        partstotal = 0;

    if ($(window).width() >= 900 ) {
      var blockwidth = 900 - 100;
    } else {
      var blockwidth = $(window).width() - 20;
    }
    $.each(chosen, function(key,val) {
      var mcbit = val["M"] * parts[key],
          bdbit = (val["D"] * 100) * parts[key],
          cnbit = (val["C"] / val["N"]) * parts[key];

      mctotal += mcbit;
      bdtotal += bdbit;
      cntotal += cnbit;
      partstotal += parts[key];
    });
    mctotal = (mctotal / partstotal).toFixed(0);
    bdtotal = (bdtotal / partstotal).toFixed(0);
    cntotal = (cntotal / partstotal).toFixed(0);

    mcwidth = blockwidth / 100 * mctotal;
    bdwidth = blockwidth / 100 * bdtotal;
    cnwidth = blockwidth / 100 * cntotal;

    $(".mcvalue .tape").css("width",mcwidth + "px");
    $(".mcvalue .optimum").css("width",mcwidth + "px");
    $(".bdvalue .tape").css("width",bdwidth + "px");
    $(".cnvalue .tape").css("width",cnwidth + "px");

    $(".mcvalue .num").html(mctotal);
    $(".bdvalue .num").html(bdtotal);
    $(".cnvalue .num").html(cntotal);
  }

  function choices() {
    //var chosen = {};
    $(".feeds").find(":checked").each(function() {
      var selected = $(this).val();
      $.ajax({
        url: source,
        dataType: 'json',
        async: false,
        success: function(data) {
          $.each( data, function( key, val ) {
            if ( key == selected ) {
              chosen[key] = val;
            }
          });
        }
      });
    });
  }

  function sourcefeeds() {

  }

  function manualfeed() {

  }

  $( "#screenwidth").val( $(window).width() );
  $( "#screenheight" ).val( $(window).height() );
});
