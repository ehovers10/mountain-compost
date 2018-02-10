function trends() {
  $(".positive").html('<svg version="1.1" id="Triangle_up" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path d="M15,14H5l5-9L15,14z"/></svg>')
    .find("path").css("fill","green");
  $(".negative").html('<svg version="1.1" id="Triangle_down" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path d="M5,6h10l-5,9L5,6z"/></svg>')
    .find("path").css("fill","red");
  $(".neutral").html('<svg version="1.1" id="Triangle_left" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path d="M14,5v10l-9-5L14,5z"/></svg><svg version="1.1" id="Triangle_right" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path d="M15,10l-9,5V5L15,10z"/></svg>')
    .find("path").css("fill","gold");
}
