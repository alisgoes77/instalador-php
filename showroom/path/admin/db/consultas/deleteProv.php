<?php
session_start();
include("../conexiones/conexion.php");
date_default_timezone_set('America/Monterrey');
$ident = $_POST["ident"];
$user = $_SESSION["nombre"];

$query = "DELETE  FROM proveedores WHERE ident = '".$ident."'";
$query2 = "DELETE  FROM inventario WHERE provee = '".$ident."'";
$query3 = "DELETE  FROM producto WHERE proveedorid = '".$ident."'";
$exec = mysqli_query($conn,$query);
$exec2 = mysqli_query($conn,$query2);
$exec3 = mysqli_query($conn,$query3);
$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Borrar proveedor ".$ident."','".$user."','".date("Y-m-d")."')";
$exec2 = mysqli_query($conn,$registro);
if($exec){
	echo "Proveedor borrado";
}else{
	//echo $query;
	echo "Error".mysqli_error($conn);
}


mysqli_close($conn);



?>


