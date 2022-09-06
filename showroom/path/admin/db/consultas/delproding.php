<?php
session_start();
include("../conexiones/conexion.php");

$ident = $_POST["ident"];

$user = $_SESSION["nombre"];


$queryi = "UPDATE inventario SET existencia = existencia - (SELECT ingreal FROM entradas WHERE id =".$ident."), importe = (SELECT precio FROM producto WHERE ident = (SELECT prodid FROM entradas WHERE id =".$ident.")) * existencia WHERE ident = (SELECT prodid FROM entradas WHERE id =".$ident.")";
$execi = mysqli_query($conn,$queryi);
$query = "DELETE  FROM entradas WHERE id = '".$ident."'";
$exec = mysqli_query($conn,$query);
$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Borrar entrada de producto a inventario ".$ident."','".$user."','".date("Y-m-d")."')";
$exec2 = mysqli_query($conn,$registro);






if($exec && $execi){
	echo "Ingreso borrado";
}else{
	//echo $query;
	echo "Error".mysqli_error($conn).$queryi;
}


mysqli_close($conn);



?>
