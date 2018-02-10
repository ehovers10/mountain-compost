$.ajaxSetup({
  async: false
});

$(document).ready( function() {
  $(".tempdisplay").addClass("hid");

  var source = "none"
      swidth = $(window).width(),
      sheight = $(window).height()
      yaxiswidth = 30,
      textsize = 14,
      unit = 'px;',
      axisscale = 5,
      chartheight = 300,
      dates = [],
      readings = {},
      tablerows = [],
      nonce = {};

  if (swidth >= 900 ) {
    var chartwidth = 900 - 100 - (yaxiswidth * 2);
  } else {
    var chartwidth = swidth - 20 - (yaxiswidth * 2);
  }

  $("#submit").on("click", function() {

    var maxval = 0;
    if ($("#dataurl").val() != "") {
      source = $("#dataurl").val();
    } else {
      source = $("#dataselect").val();
    }
    $.getJSON(source, function(data) {
      $.each(data, function(key,val) {
        key = susgenconvert(key);
        dates.push(key);
        $.each(val, function(key1,val1) {
          val[key1] = adjusttemp(val1);
          if ( val[key1] > maxval) maxval = val[key1];
        });

        readings[key] = val;
        var nonce = jQuery.extend({"date": key}, val);
        tablerows.push(nonce);
      });
    });

    var barcolor = $("#barcolor").val(),
        barwidth = parseInt($("#barwidth").val()),
        barscale = barwidth * 5;

    var maxtemp = Math.ceil(maxval) + 10;

    var rows = dates.length,
        showrows = Math.floor(chartwidth / barscale);
    if (showrows >= rows) {
      var barskip = 1;
    } else {
      var barskip = Math.ceil((rows - showrows) / showrows + 1);
    }
    var showtemps = Math.floor(chartheight / textsize);

    if (showtemps >= maxtemp ) {
      var tempskip = 1;
    } else {
      var tempskip = Math.ceil((maxtemp - showtemps) / showtemps);
    }

    // Title
    var start = dates[0].slice(0,10),
        end = dates[rows - 1].slice(0,10),
        charttitle = '<div class="title">Temperature readings from ' + start + " to " + end + " in &deg;";
    if ($("#tempsoutf").is(":checked")) {
      charttitle += "F</div>";
    } else {
      charttitle += "C</div>";
    }

    // Navigation
    var chartnav = "<ul class='chartnav' style='border-bottom: none;'>";
    for ( temp in readings[dates[0]] ) {
      chartnav += '<li class="internal';
      if (temp == Object.keys(readings[dates[0]])[0]) {
        chartnav += ' active';
      }
      chartnav += '"><a href="#" id="' + temp + '" class="' + temp + '">' + temp +'</a></li>';
    }
    chartnav += "</ul>";

    // Y-axis
    var yaxis = '<div class="yaxis" style="height:' + chartheight + 'px;width:' + yaxiswidth + 'px;">';
    for ( var i = 0; i <= maxtemp; i += Math.ceil(maxtemp / 9) ) {
      var hpos = Math.round(i * (chartheight / maxtemp) - (textsize / 2));
      yaxis += '<div style="position: absolute; bottom:' + hpos + 'px;">' + i + '</div>';
    }
    yaxis += "</div>";

    // Graph
    var graph = '<div class="graphwrap" style="height:' + chartheight + 'px;">';
    for (reading in readings[dates[0]]) {
      graph += '<div class="area ' + reading;
      if (reading != Object.keys(readings[dates[0]])[0]) {
        graph += ' hid';
      }
      graph += '"><div class="graphspace">';
      for (var j=0; j <= maxtemp; j += Math.ceil(maxtemp / 9)) {
        var hpos = Math.round(j * (chartheight / maxtemp)),
            hsize = Math.ceil(maxtemp / 9) * Math.round(chartheight / maxtemp);
        if ( hpos + hsize > chartheight) hsize = chartheight - hpos;
        if ( j % (Math.ceil(maxtemp / 9) * 2) == 0 ) {
          var backcolor = "#ccc";
        } else {
          backcolor = "#fff";
        }
        graph += '<div style="position: absolute; bottom:' + hpos + 'px; height:' + hsize + 'px; background:' + backcolor + '; width:' + chartwidth + 'px; border-bottom: 1px solid #ccc;"></div>';
      }
      if ($("#tempsoutf").is(":checked")) {
        var pfrp = 131 * (chartheight / maxtemp) - 2;
      } else {
        var pfrp = (131 - 32) * 5/9 * (chartheight / maxtemp) - 2;
      }
      graph += '<div style="position: absolute; bottom:' + pfrp +'px; height:2px; background: blue; width:' + chartwidth + 'px; border-bottom: 1px solid #ccc;"></div>';
      var k=0;
      for ( var r=1; r < rows; r += barskip) {
        var temp = parseInt(readings[dates[r]][reading]),
            bheight = temp * chartheight / maxtemp,
            bwidth = barwidth * 2,
            lpos = barwidth + k++ * barscale;
        graph += '<div class="point" style="height:' + bheight + 'px; left:' + lpos + 'px; width:' + bwidth + 'px; background:' + barcolor + '; margin:0;" title="' + dates[r] + ', ' + temp + '&deg;F"></div>';
      }
      graph += "</div></div>";
    }
    graph += "</div><div style='clear:both'></div>";

    // X-axis
    var xadjust =  0 - (textsize / 2),
        xaxis = '<div class="xwrap"><div class="xaxis" style="width:' + chartwidth + 'px; margin-left:' + yaxiswidth + 'px; text-indent:-' + textsize + 'px;">',
        j=0;
    for ( var r=1; r < rows; r += (barskip * axisscale) ) {
      var date = dates[r].slice(0,10);
          lpos = barwidth + j++ * barscale * axisscale;
      xaxis += '<div class="xlabel" style="left:' + lpos + 'px;"><span>' + date + '</span></div>';
    }
    xaxis += "</div></div></div>";

    var chart = charttitle + chartnav + yaxis + graph + xaxis;

    $(".tempdisplay").html(chart).removeClass("hid");

    var tablecols = [];
    for (col in tablerows[0]) {
      var tempcol = {};
      tempcol["data"] = col;
      tablecols.push(tempcol);
    }
    $(".tabledata").DataTable( {
      data: tablerows,
      responsive: {},
      columns: tablecols,
      columnDefs: [
        {
          className: 'expand',
          orderable: false,
          targets:   0
      }
      ],
    });

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

    return false;
  });

  function susgenconvert(date) {
    var getday = date.slice(0,2),
        getmo = date.slice(3,5),
        getyr = date.slice(6,10),
        gettime = date.slice(12,17);
    return getyr + "-" + getmo + "-" + getday + "T" + gettime;
  }
  function adjusttemp(temp) {
    if ($("#tempsinf").is(":checked")) {
      if ($("#tempsoutf").is(":checked")) {
        return temp;
      } else {
        return (temp - 32) * 5/9;
      }
    } else {
      if ($("#tempsoutf").is(":checked")) {
        return temp * 9/5 + 32;
      } else {
        return temp;
      }
    }
  }
});
