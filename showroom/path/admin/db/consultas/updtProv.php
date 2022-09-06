<?php
session_start();
include("../conexiones/conexion.php");
date_default_timezone_set('America/Monterrey');
$ident = $_POST["ident"];
$nombre = $_POST["nombre"];
$fecha = $_POST["fecha"];
$tel = $_POST["tel"];
$email = $_POST["email"];
$bancaria = $_POST["bancaria"];
$ciudad = $_POST["ciudad"];
$mensualidad = $_POST["mensualidad"];
$sucursal = $_POST["sucursal"];
$query = "UPDATE proveedores SET nombre = '".$nombre."',fecha = '".$fecha."',tel ='".$tel."',email='".$email."',bancaria='".$bancaria."',ciudad='".$ciudad."', importe =".$mensualidad.", sucursal ='".$sucursal."' WHERE ident = '".$ident."'";
$exec = mysqli_query($conn,$query);

if($exec){
	echo "Proveedor actualizado";
}else{
	//echo $query;
	echo "Error ".$query;;
}


mysqli_close($conn);



?>


