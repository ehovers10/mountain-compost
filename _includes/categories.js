function categories(source) {

  var listarray = listitems(source);
  $("#resources").css("display","none").html(listarray[1]).slideDown();

  var filters = '<option value="all">Filter by topic</option>' + listarray[2];
  $("#viewsources").html(filters).change( function() {
    var sectchoice = $(this).val();
    $("#resources").css("display","none").html(filteritems(sectchoice,listarray)).slideDown();
  });

  $("#addsource").click( function() {
    newitem(listarray[2]);
  });

}
