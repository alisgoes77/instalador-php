<?php
session_start();
include("../conexiones/conexion.php");
date_default_timezone_set('America/Monterrey');

$nombre = $_POST["nombre"];
$descri = $_POST["descri"];
$fecha = $_POST["fecha"];
$provee = $_POST["provee"];

$ident = $_POST["ident"];
$user = $_SESSION["nombre"];
$precio = $_POST["precio"];
$cantini = $_POST["cantini"];
$total = $precio * $cantini;


$query = "INSERT INTO producto (ident,nombre,descripcion,fecha,proveedorid,usuario,precio) VALUES (".$ident.",'".$nombre."','".$descri."','".$fecha."',".$provee.",'".$user."',".$precio.")";
$exec = mysqli_query($conn,$query);


$queryi = "INSERT INTO inventario (ident,provee,existencia,importe) VALUES (".$ident.",".$provee.",".$cantini.",".$total.")";
$execi = mysqli_query($conn,$queryi);

$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Creación de producto".$nombre."','".$user."','".date("Y-m-d")."')";
$exec2 = mysqli_query($conn,$registro);
if($exec){
	echo "Producto creado";
}else{
	echo mysqli_error($conn);;
	//echo "Error".mysqli_error($conn);
}


mysqli_close($conn);



?>