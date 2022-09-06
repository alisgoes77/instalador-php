<?php
session_start();
include("../conexiones/conexion.php");
date_default_timezone_set('America/Monterrey');
$prodid = $_POST["prodid"];
$cant = $_POST["cant"];
$monto = $_POST["monto"];
$user = $_SESSION["nombre"];


$query = "UPDATE inventario SET existencia = ".$cant.",importe = ".$monto." WHERE ident = '".$prodid."'";
$exec = mysqli_query($conn,$query);

$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Actualizacion de inventario de producto ".$prodid."','".$user."','".date("Y-m-d")."')";
$exec2 = mysqli_query($conn,$registro);



if($exec){
	echo "Inventario actualizado";
}else{
	//echo $query;
	echo "Error".mysqli_error($conn);
}


mysqli_close($conn);



?>
