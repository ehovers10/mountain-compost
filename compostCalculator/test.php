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

<?php
//Including class:
include_once("phpequations.class.php");

//Declaring object
$obj = new phpequations;

//Calling to solve system of equations
$solution = $obj->solve("a+b+2*c=5\r\n a-b = u\r\n u-2*a=4\r\n 2*b=a\r\n");

//Getting results on screen
if($solution)	//If the solution is obtained
{
 echo "Success :)\r\n";
 print_r($solution);	//then print resulting array
}
else
{
 echo "Error :)\r\n";
 print_r($obj->errors());	//otherwise, print reason why give equations can not be solved
}
?>
</body>
</html>
