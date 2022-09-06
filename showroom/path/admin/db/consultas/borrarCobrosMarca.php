<?php
session_start();
include("../conexiones/conexion.php");
date_default_timezone_set('America/Monterrey');
$ident = $_POST["id"];

$user = $_SESSION["nombre"];
$query = "DELETE  FROM mensualidad WHERE id = '".$ident."'";
$exec = mysqli_query($conn,$query);
$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Borrar cobro ".$ident."','".$user."','".date("Y-m-d")."')";
$exec2 = mysqli_query($conn,$registro);
if($exec){
	echo "Cobro a marca borrado";
}else{
	//echo $query;
	echo "Error".mysqli_error($conn);
}


mysqli_close($conn);



?>