<?php
include("../conexiones/conexion.php");
include("tools.php");

$query = "
UPDATE promociones 
SET ".$_POST["name"]." = '".$_POST["value"]."' 
WHERE id = '".$_POST["pk"]."'
"; 

$conn->query($query);