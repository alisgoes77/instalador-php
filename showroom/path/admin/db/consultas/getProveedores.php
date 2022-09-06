<?php

session_start();
include("../conexiones/conexion.php");


$query = "SELECT ident,nombre,importe FROM proveedores";

$exec = mysqli_query($conn,$query);
$cad = "";
while($row = mysqli_fetch_array($exec)){
	$ident = $row["ident"];
	$nombre = $row["nombre"];
	$importe = $row["importe"];
	$cad = $ident."|".$nombre."|".$importe."||".$cad;



}
echo $cad;

?>