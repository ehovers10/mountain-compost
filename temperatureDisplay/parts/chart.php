<h3>Chart</h3>

<div class="bunch">

<!-- Title -->
<?php echo "<div class='title'>Gore temps: {$data[0][1]} to {$data[$rows - 1][1]}</div>"; ?>

<!-- Navigation -->
<?php
  echo "<ul class='chartnav' style='border-bottom: none;'>";
  for ($i=1; $i < 6; $i++) {
    echo "<li class='internal";
    if ($i == 1) { echo " active"; }
    echo "'><a href='#' class='T$i'>T$i</a></li>";
  }
  echo "</ul>";
?>

<!-- Areas -->
<?php
  for ($i=1; $i < 6; $i++) {
    echo "<div class='area T$i";
    if ($i != 1) { echo " hid"; }
    echo "'><div class='pointspace'>";

    for ($r=1; $r < $rows; $r += 10) {
      $temp = $data[$r][$t] * 1.8 + 32;
      $height = ($temp - ($_POST['barwidth'] * 2)) * $scale;
      $lpos = $r * $scale;
      echo "<div class='point' style='height:$height$unit left:$lpos$unit width:{$_POST['barwidth']}$unit border: solid {$_POST['barcolor']} {$_POST['barwidth']}$unit border-radius:{$_POST['barwidth']}$unit margin:0 {$_POST['barwidth']}$unit' title='{$data[$r][1]}, $temp&deg;F'></div>";
    }

    echo "</div></div>";
  }
?>

<!-- y-axis -->
<?php
  echo "<div class='yaxis' style='height:$gheight$unit'>";
  for ($i=200; $i >= 0; $i--) {
    $j = $i % 20;
    echo "<div class='ylabel' style='padding-top:$yscale$unit'>";
    if ($j == 0) { echo $i; } else { echo "&nbsp;"; }
    echo "</div>";
  }
  echo "</div>";
?>

<!-- x-axis -->
<?php
  echo "<div class='xwrap'><div class='xaxis'>";
  for ($r=1; $r < $rows; $r += 35) {
    $date = substr($data[$r][1],0,10);
    $lpos = $r * $scale;
    echo "<div class='xlabel' style='left:{$lpos}px; width:{$_POST['barwidth']}px; margin:0 {$_POST['barwidth']}px;'><span>$date</span></div>";
  }
  echo "</div></div>";
?>

</div>
