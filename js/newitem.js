function newitem(categories) {
// Add new resource
  /*var getin = prompt("Password required:","");
  if (getin=="smellsgood") {*/
    makeform();
  /*} else {
    $('#addblock').html("<p>You don't have permission to add new sources.</p>").slideDown();
  }*/

  function makeform() {
    var rkind = '<label for="kind">Choose category</label><select id="kind" name="kind"></select>',
        rcategory = '<div id="rcategory" style="display:none;"><label for="category">Resource category</label><input type="text" id="category" name="category" placeholder="Resource category"></div>'
        rtitle = '<label for="title">Resource title</label><input type="text" id="title" name="title" placeholder="Resource Title">',
        rlocation = '<label for="location">Resource location</label><input type="url" id="location" name="location" placeholder="URL of resource">',
        rsummary = '<label for="summary">Resource summary</label><input type="textarea" id="summary" name="summary" placeholder="Short summary of the resource content">',
        rnewsource = '<input type="hidden" name="newsource" value="on">',
        rsubmit = '<input type="submit" id="additem" name="additme" value="Generate JSON">',
        formbody = [rkind,rcategory,rtitle,rlocation,rsummary,rnewsource,rsubmit];

    for (i=0;i<formbody.length;i++){
      formbody[i] = '<div class="inputitem">' + formbody[i] + '</div>';
    }
    var addresource = formbody.join("");
    $('#addblock').html(formbody).slideToggle();

    var newfilters = '<option value="none">Select topic</option><option value="new">Add new</option>' + categories;
    $('#kind').html(newfilters).change( function() {
      if ($("#kind").val() == "new") {
        $('#rcategory').slideDown();
      }
    });
  }

// YAML item display
  $("#additem").click( function() {
    var newitem = '<div class="itemjson" contenteditable="true">';
    if ($("#kind").val() != "new") {
      newitem += '"' +
        $("#kind").val() + '":<br>&emsp;"' +
        $("#title").val() + '":<br>&emsp;&emsp;"summary": "' +
        $("#summary").val() + '"<br>&emsp;&emsp;"location": "' +
        $("#location").val() + '"</div>';
    } else {
      newitem += '"' +
        $("#category").val() + '":<br>&emsp;' +
        $("#title").val() + '":<br>&emsp;&emsp;"summary": "' +
        $("#summary").val() + '"<br>&emsp;&emsp;"location": "' +
        $("#location").val() + '"</div>';
    }
    $("#kind").val("none");
    $("#category").val("");
    $("#title").val("");
    $("#summary").val("");
    $("#location").val("");
    $("#addblock").html(newitem).slideDown();

    return false;
  });
}
