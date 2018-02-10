// https://github.com/ghiculescu/jekyll-table-of-contents
(function($){
  $.fn.toc = function(options) {
    var defaults = {
      noBackToTopLinks: false,
      title: '',
      minimumHeaders: 3,
      headers: 'h1, h2',
      listType: 'ol', // values: [ol|ul]
      showEffect: 'none', // values: [show|slideDown|fadeIn|none]
      showSpeed: 'slow', // set to 0 to deactivate effect
      classes: { list: '',
                 item: ''
               }
    },
    settings = $.extend(defaults, options);

    function fixedEncodeURIComponent (str) {
      return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16);
      });
    }

    function createLink (header) {
      var innerText = (header.textContent === undefined) ? header.innerText : header.textContent;
      return "<a href='#" + fixedEncodeURIComponent(header.id) + "'>" + innerText + "</a>";
    }

    var headers = $(settings.headers).filter(function() {
      // get all headers with an ID
      var previousSiblingName = $(this).prev().attr( "name" );
      if (!this.id && previousSiblingName) {
        this.id = $(this).attr( "id", previousSiblingName.replace(/\./g, "-") );
      }
      return this.id;
    }), output = $(this);
    if (!headers.length || headers.length < settings.minimumHeaders || !output.length) {
      $(this).hide();
      return;
    }

    if (0 === settings.showSpeed) {
      settings.showEffect = 'none';
    }

    var render = {
      show: function() { output.hide().html(html).show(settings.showSpeed); },
      slideDown: function() { output.hide().html(html).slideDown(settings.showSpeed); },
      fadeIn: function() { output.hide().html(html).fadeIn(settings.showSpeed); },
      none: function() { output.html(html); }
    };

    var get_level = function(ele) { return parseInt(ele.nodeName.replace("H", ""), 10); };
    var highest_level = headers.map(function(_, ele) { return get_level(ele); }).get().sort()[0];
    var return_to_top = '<a href="#" onclick="return false;" class="icon-arrow-up back-to-top"><svg version="1.1" id="Chevron_thin_up" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path d="M2.582,13.891c-0.272,0.268-0.709,0.268-0.979,0s-0.271-0.701,0-0.969l7.908-7.83c0.27-0.268,0.707-0.268,0.979,0l7.908,7.83c0.27,0.268,0.27,0.701,0,0.969c-0.271,0.268-0.709,0.268-0.978,0L10,6.75L2.582,13.891z"/></svg> Return to top</a>';

    var level = get_level(headers[0]),
      this_level,
      html = settings.title + " <" +settings.listType + " class=\"" + settings.classes.list +"\">",
      index = 0;
    headers.on('click', function() {
      if (!settings.noBackToTopLinks) {
        window.location.hash = this.id;
      }
    })
    .addClass('clickable-header')
    .each(function(_, header) {
      index++;
      this_level = get_level(header);
      if (!settings.noBackToTopLinks && this_level === highest_level) {
        $(header).addClass('top-level-header');
        if (index != 1) {
          $(header).before(return_to_top);
        }
      }
      if (this_level === level) // same level as before; same indenting
        html += "<li class=\"" + settings.classes.item + "\">" + createLink(header);
      else if (this_level <= level){ // higher level than before; end parent ol
        for(i = this_level; i < level; i++) {
          html += "</li></"+settings.listType+">"
        }
        html += "<li class=\"" + settings.classes.item + "\">" + createLink(header);
      }
      else if (this_level > level) { // lower level than before; expand the previous to contain a ol
        for(i = this_level; i > level; i--) {
          html += "<" + settings.listType + " class=\"" + settings.classes.list +"\">" +
                  "<li class=\"" + settings.classes.item + "\">"
        }
        html += createLink(header);
      }
      level = this_level; // update for the next one
    });
    html += "</"+settings.listType+">";

    if (!settings.noBackToTopLinks) {
      $(document).on('click', '.back-to-top', function() {
        $("body,html").animate({scrollTop: 0}, 800);
        window.location.hash = '';
      });
    }

    render[settings.showEffect]();

    $('.sect-toc a').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
  };
})(jQuery);
