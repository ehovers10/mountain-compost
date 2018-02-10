<!DOCTYPE html>
<html>
<head>
  <title>Compost calculator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

  <link href="./css/goredisplay.css" rel="stylesheet">
  <link href="./css/calculator.css" rel="stylesheet">

  <script src="http://code.jquery.com/jquery-3.1.0.min.js" integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s=" crossorigin="anonymous"></script>
  <script src="./js/calculator.js"></script>

</head>

<body>

<header>
  <div class="wrap">
    <div class="exleft">
      <a class="extitle" href="/">Compost calculator</a>
      <div class="exdescription">by Erik Hoversten <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img class="icon" src="./images/cc.svg"> <img class="icon" src="./images/cca.svg"></a></div>
    </div>
    <div class="exright">
      <div class="exdescription">An application for formulating a compost recipe.</div>
    </div>
  </div>
</header>

<div class="wrap">

<div class="formwrap">
<form id="calculator" action="#" method="post">

<div class="input-thing">
<h3>What feedstocks do you have?</h3>
<ul>
<li><label for="datasource">Choose items on file:</label>
<select name="datasource" id="datasource">
  <option value="none">Choose</option>
  <option value="./data/feedstocks.json">GMT</option>
  <option value=""></option>
</select>
<div class="feeds"></div></li>
<li><a href="#" class="datamanual">Add your own: <img class="icon" src="./images/plus.svg"></a>
<div class="additional"></div></li>
</ul>
<!--<div class="submitwrap">
<a class="lockin button" href="#">Lock in recipe</a>
</div>-->
</div>

<div class="input-thing">
<h3>How are you measuring?</h3>
<ul>
<li><input type="radio" name="measure" value="weight" checked><label for="weight">by Weight</label></li>
<li><input type="radio" name="measure" value="volume"><label for="volume">by Volume</label></li>
</ul>
</div>

<div class="input-thing">
<h3>What are your target values?</h3>
<ul>
<li><input type="number" name="mctarget" value="65"><label for="mctarget">Moisture content (%)</label></li>
<li><input type="number" name="cntarget" value="25"><label for="cntarget">Carbon:Nitrogen</label></li>
<li><input type="number" name="bdtarget" value="40"><label for="bdtarget">Bulk density</label></li>
</ul>
</div>

<div style="clear:both;"></div>

<input type="hidden" name="screenwidth" id="screenwidth" value="900">
<input type="hidden" name="screenheight" id="screenheight" value="600">
<input type="hidden" name="gotfeeds" id="gotfeeds" value="off">

<div class="submitwrap">
  <a href="#"><input class="button" type="submit" name="submit" id="submit" value="Submit"></a>
</div>

</form>
</div>

<?php
if ($_POST['gotfeeds'] == "on") {
  # Include equations class
  include("./php/phpequations.class.php");
  $eqnset = new phpequations;

  # Parse feedstocks
  $feedfile = file_get_contents($_POST['datasource']);
  $feedjson = json_decode($feedfile, true);
  $checkboxes = isset($_POST['fstock']) ? $_POST['fstock'] : array();
  foreach($checkboxes as $value) {
    if ($feedjson[$value]) {
      $feedMC[] = round($feedjson[$value]['M'],0);
      $feedBD[] = round($feedjson[$value]['D'] * 100,0);
      $feedCN[] = round($feedjson[$value]['C'] / $feedjson[$value]['N'], 0);
    }
  }

  # Moisture content
  $x = 'a';
  $mceqn = "";
  $mctarget = $_POST['mctarget'];
  foreach($feedMC as $i=>$moist) {
    $mceqn .= "{$moist}*$x";
    if (($i+1) != count($feedMC)) {
      $mceqn .= "+";
    }
    $x++;
  }
  $mceqn .= "={$mctarget}";

  # Bulk density
  $y = 'a';
  $bdeqn = "";
  $bdtarget = $_POST['bdtarget'];
  foreach($feedBD as $i=>$bulk) {
    $bdeqn .= "{$bulk}*$y";
    if (($i+1) != count($feedBD)) {
      $bdeqn .= "+";
    }
    $y++;
  }
  $bdeqn .= "={$bdtarget}";

  # C:N ratio
  $z = 'a';
  $cneqn = "";
  $cntarget = $_POST['cntarget'];
  foreach($feedCN as $i=>$carbon) {
    $cval = round($carbon);
    $cneqn .= "{$carbon}*$z";
    if (($i+1) != count($feedCN)) {
      $cneqn .= "+";
    }
    $z++;
  }
  $cneqn .= "={$cntarget}";

  echo "Moisture content: {$mceqn}<br>Bulk density: {$bdeqn}<br>Carbon:Nitrogen: {$cneqn}<br>";

  $solution = $eqnset->solve("
    69*a+15*b+53*c=65\r\n
    70*a+18*b+83*c=40\r\n
    15*a+55*b+7*c=25\r\n
  ");

  if($solution)	//If the solution is obtained
  {
   echo "Success: ";
   print_r($solution);	//then print resulting array
  }
  else
  {
   echo "Error: ";
   print_r($eqnset->errors());	//otherwise, print reason why give equations can not be solved
  }
   //echo $equations;
  //echo "Recipe: <pre>{$_POST['feedstocks']}</pre><br>{$_POST['measure']}";
}
?>

</div>

</body>
</html>
