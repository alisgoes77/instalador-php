<?php
session_start();
include("../conexiones/conexion.php");
date_default_timezone_set('America/Monterrey');
$ident = $_POST["ident"];

$user = $_SESSION["nombre"];
$query = "DELETE  FROM producto WHERE ident = '".$ident."'";
$exec = mysqli_query($conn,$query);

$query1 = "DELETE  FROM inventario WHERE ident = '".$ident."'";
$exec1 = mysqli_query($conn,$query1);

$query2 = "DELETE  FROM entradas WHERE prodid = '".$ident."'";
$exec2 = mysqli_query($conn,$query2);

$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Borrar producto".$ident."','".$user."','".date("Y-m-d")."')";
$exec2 = mysqli_query($conn,$registro);
if($exec){
	echo "Producto borrado";
}else{
	//echo $query;
	echo "Error".mysqli_error($conn);
}


mysqli_close($conn);



?>
