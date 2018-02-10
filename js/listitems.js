function listitems(source,depth,header) {
  var bibdisplay = "",
      section = [],
      topics =  "";
  if (depth == 1) {
    $.each( source, function( key1, val1 ) {
      var head = key1,
          headslug = head.toLowerCase().replace(/\s+/g, '-');
      section[head] = getgroup(val1);
    });
    for (var key in section) {
      var sectbody = "<" + header + ">" + key + "</" + header + ">" + section[key],
          opthead = '<option value="' + key + '">' + key + '</option>';
      bibdisplay += sectbody;
      topics += opthead;
    }
    return [section,bibdisplay,topics];
  } else {
    return getgroup(source);
  }
}

function getgroup(value) {
  var sectbody = "";
  $.each(value, function(key2,val2) {
    var itembody = '<div class="exitem">';
        //itemsize = val2.length;
    if (val2["location"]) {
      title = '<div class="extitle">' +
        '<a href="' + val2["location"] + '">' + key2 + '</a></div>';
      //itemsize--;
    } else {
      title = '<div class="extitle">' + key2 + '</div>';
    }
    $.each(val2, function(key3,val3) {
      if (key3 == 'location') {
        return true;
      } else {
        var itembit = '<span class="exdescription">' +
              '<span class="exsubtitle">' + key3 + '</span>';
        if (val3 instanceof Array) {
          var itemlist = '<ul>';
          $.each(val3, function(key4,val4) {
            itemlist += '<li>' + val4 + '</li>';
          });
          itemlist += '</ul>';
        } else {
          var itemlist = '<span>' + val3 + '</span>';
        }
        itembit = itembit + itemlist + '<br>';
        itembody += itembit;
      }
    });
    itembody += '</div>';
    var itemfull = title + itembody;
    sectbody += itemfull;
  });
  return sectbody;
}

function filteritems(sectchoice,allitems) {
  var displaytopic = "";

  if ( sectchoice == "all") {
    displaytopic = allitems[1];
  } else {
    var secthead = "<" + header + ">" + sectchoice + "</" + header + ">";
    displaytopic = secthead + allitems[0][sectchoice];
  }

  return displaytopic;
}
