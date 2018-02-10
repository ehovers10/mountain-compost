$(document).ready( function() {
  var index = 0;
      down = '<svg version="1.1" id="Chevron_thin_down" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path d="M17.418,6.109c0.272-0.268,0.709-0.268,0.979,0c0.27,0.268,0.271,0.701,0,0.969l-7.908,7.83 c-0.27,0.268-0.707,0.268-0.979,0l-7.908-7.83c-0.27-0.268-0.27-0.701,0-0.969c0.271-0.268,0.709-0.268,0.979,0L10,13.25 L17.418,6.109z"/></svg>',
      up = '<svg version="1.1" id="Chevron_thin_up" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path d="M2.582,13.891c-0.272,0.268-0.709,0.268-0.979,0s-0.271-0.701,0-0.969l7.908-7.83c0.27-0.268,0.707-0.268,0.979,0 l7.908,7.83c0.27,0.268,0.27,0.701,0,0.969c-0.271,0.268-0.709,0.268-0.978,0L10,6.75L2.582,13.891z"/></svg>',
      pre = '<span class="icon">',
      post = '</span>';

  /* Open hidden elements */
  $(".hid").css("display","none");
  $(".open .mark").html( pre + down + post );
  $(".open").click( function() {
    var hidden = $(this).attr('id') + '-hid';
    $('#' + hidden).slideToggle('slow',function() {
      // Animation complete
    });

    $(".open .mark").html( function() {
      index++;
      if (index % 2 == 0) { return pre + down + post; } else { return pre + up + post; }
    });
    return false;
  });
});
