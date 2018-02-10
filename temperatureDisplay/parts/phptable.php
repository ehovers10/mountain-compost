<?php
  if ($_POST['includetable'] == "on") {
    echo "<h3>Table</h3><table class='sortable' style='margin-bottom:1em;width:100%;'><thead><tr>";
    for ($c=1; $c < $cols; $c++) {
      echo "<th>{$headline[$c]}</th>";
    }
    echo "</tr></thead><tbody>";
    for ($r=1; $r < $rows; $r++) {
      $data[$r][2] = $data[$r][2] * 1.8 + 32;
      echo "<tr>";
      for ($c=1; $c < $cols; $c++) {
        echo "<td>{$data[$r][$c]}</td>";
      }
      echo "</tr>";
    }
    echo "</tbody></table>";
  }
?>
