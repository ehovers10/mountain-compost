$(document).ready(function() {

  var source = "/data/odors.json",
      sample = {};

  loader("selection","Generating odor descriptors");
  window.setTimeout( function() {
    $("#selection-load").slideUp();
    makedescriptors(source,sample);
  }, 2000);

  $("#submit").click( function() {
    loader("rose","Generating your odor rose");
    window.setTimeout( function() {
      $("#rose-load").slideUp();
      makerose(sample);
    }, 2000);
  });

});

function randomSelection(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    if (arr.length < size ) {
      return shuffled;
    } else {
      return shuffled.slice(0, size);
    }
}

function loader(element,title) {
  var loadsource = "http://cdn.mountaincompost.com/loader.gif",
      preload = '<div id="' + element +'-load" class="block"><div class="title">' + title + '</div><div class="run" style="width:100%;text-align:center;padding:1em;"><img src="' + loadsource + '"></div></div>';
  $('#' + element).prepend(preload);
}

function makedescriptors(source,sample) {
  $.ajax({
    url: source,
    dataType: 'json',
    async: false,
    success: function(data) {
      $.each(data, function(cat,desc) {
        sample[cat] = randomSelection(desc,5);
      });
    }
  });

  var choices = [];
  $.each(sample, function(cat,desc) {
    $.each(desc, function(key,item) {
      var choicebit = '<div class="feed" style="padding-bottom:45px;"><div class="descriptor"><input type="checkbox" id="' + item.toLowerCase().replace(/\s+/g, '-') + '" name="' + item.toLowerCase().replace(/\s+/g, '-') + '" value="' + item + '"><label for="' + item + '">' + item + '</label></div>';
      choicebit += '<div class="intensity ' + cat + '" style="display:none;"><input style="width:100px;" type="number" id="' + item.toLowerCase().replace(/\s+/g, '-') + '-intensity" name="' + item.toLowerCase().replace(/\s+/g, '-') + '-intensity" value="' + 1 + '" placeholder="Intensity (1-5)"><br><label for="' + item + '-intensity">Intensity (1-5)</label></div></div>';
      choices.push(choicebit);
    });
  });
  var title = '<div class="title">Choose all descriptors that apply to your odor</div>',
      descriptors = randomSelection(choices,choices.length).join("");

  $(".odorchoices").css("display","none").html(title + descriptors).slideDown();
  $("#submit").css("opacity", 1);

  $(".descriptor input").click( function() {
    $(this).parent().next(".intensity").slideToggle();
    $(this).parents(".feed").css("padding-bottom","5px");
  });
}

function makerose(sample) {
  var values = {}, score = {};
  for (key in sample) {
    values[key] = 1;
  }
  $(".descriptor").children("input:checked").each( function() {
    var intensity = $(this).parent().next(".intensity");
    for (key in sample) {
      if (intensity.hasClass(key)) {
        values[key] += parseInt(intensity.children("input").first().val());
      }
    }
  });
  var rotate = 0,
      back = "rgba(51, 153, 51, 0.8)",
      scale = 100,
      yshift = [0,0,0,0,10,15,20,60],
      breadth = 300,
      i = 0;
  if ($(window).width() < 640) {
    breadth = $(window).width() / 2;
    yshift = [0,0,0,0,0,0,0,0];
  }
  for (key in sample ) {
    score[key] = values[key] / 5;
    var size = score[key] * scale,
        label = '<div class="label"><div style="' + transform(rotate * -1,breadth,yshift[i++]) + '">' + key + '</div></div>',
        shape = '<div class="shape" style="' + makeshape(size,back) + '"></div>';
    $("#odorrose").append(directional(label,shape,rotate));
    rotate += 45;
  }
  var origin = '<div class="origin"></div>';
  $("#odorrose").append(origin);
  $("#odorrose").parent().prepend('<div class="title">The character of your odor</div>');
}

function directional(label,shape,rotate) {
  return '<div class="directional" style="' + transform(rotate,Math.cos(rotate),Math.sin(rotate)) + '">' + shape + label + '</div>';
}

function transform(rotate,shiftx,shifty) {
  return 'transform:rotate(' + rotate + 'deg);transform-origin:' + shiftx + 'px ' + shifty + 'px;';
}

function makeshape(size,back) {
  return 'border-right:' + size * 2 + 'px solid ' + back + ';top: -' + size + 'px; border-top:' + size + 'px solid transparent;	border-bottom:' + size + 'px solid transparent;';
}
