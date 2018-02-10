function categories(source,depth,header,title) {

  if (depth != 0) {
    var listarray = listitems(source,depth,header);
    $("#resources").html(listarray[1]);

    var filters = '<option value="all">Filter by topic</option>' + listarray[2];
    $("#viewsources").html(filters).change( function() {
      var sectchoice = $(this).val();
      $("#resources").css("display","none").html(filteritems(sectchoice,listarray)).slideDown();
    });

    $("#addsource").click( function() {
      newitem(listarray[2]);
    });
  } else {
    var listarray = listitems(source,depth,header),
        target = "#" + title + "-hash";
    $(target).html(listarray);
  }
}
