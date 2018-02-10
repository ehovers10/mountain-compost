---
title: Temperature display
description: >
  A method of displaying temperature readings data from a compost pile.
scripts: [bunch,notes,temperature,toc]
datatables: true
data:
  Mar-May 2015: temps2015-03-26.json
  Jan-Feb 2016: temps2016-01-15.json
back: barn-winter1600-min.jpg
permalink: temperatures/
---

<div id="begin" class="area begin">
  <div class="title">Enter your temperature data</div>
  <ul>
  <li><label for="datadelect">Choose data on file:</label>
  <select name="dataselect" id="dataselect">
    <option value="{{ "none.json" | prepend: "/data/" | prepend: site.baseurl }}">Choose</option>
    {% for datum in page.data %}
    <option value="{{ datum[1] | prepend: "/data/" | prepend: site.baseurl }}">{{datum[0]}}</option>
    {% endfor %}
  </select></li>
  <li><label for="dataurl">Or enter the url of a JSON object:</label>
  <input type="url" name="dataurl" id="dataurl" value="" placeholder="URL">{% note jsonformat %}</li>
  <li><span>Temperature scale of data:</span>
  <input type="radio" id="tempsinc" name="tempscale" value="centigrade" checked><label for="centigrade">Centigrade</label>
  <input type="radio" id="tempsinf" name="tempscale" value="fahrenheit"><label for="fahrenheit">Fahrenheit</label></li>
  </ul>

  <div class="title">Customize the display</div>
  <ul>
  <li><label for="barwidth">Chart bar size:</label>
  <input type="number" name="barwidth" id="barwidth" size="1" value="3"></li>
  <li><label for="barcolor">Chart bar color:</label>
  <select name="barcolor" id="barcolor">
    <option value="green">Green</option>
    <option value="red">Red</option>
    <option value="blue">Blue</option>
    <option value="purple">Purple</option>
  </select></li>
  <li><span>Temperature scale for output:</span>
  <input type="radio" id="tempsoutc" name="tabletempscale" value="centigrade" checked><label for="centigrade">Centigrade</label>
  <input type="radio" id="tempsoutf" name="tabletempscale" value="fahrenheit"><label for="fahrenheit">Fahrenheit</label></li>
  </ul>
  <div style="clear:both;"></div>

  <input type="hidden" name="screenwidth" id="screenwidth" value="900">
  <input type="hidden" name="screenheight" id="screenheight" value="600">

  <div class="internal block">
    <a href="#" class="chart" id="submit">Generate</a>
  </div>
</div>

<div id="chart" class="area chart hid">
  <div class="tempdisplay" style="margin-bottom: 100px;"></div>

  <table class="tabledata"></table>

</div>
