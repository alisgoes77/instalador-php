<?php
session_start();
include("../conexiones/conexion.php");
date_default_timezone_set('America/Monterrey');

$nombre = $_POST["nombre"];
$idmarca = $_POST["idmarca"];
$mes = $_POST["mes"];
$fecha = $_POST["fecha"];
$importe = $_POST["importe"];
$user = $_SESSION["nombre"];
$date = date("Y-m-d");




$query = "SELECT email FROM proveedores WHERE ident = ".$idmarca;
$exec = mysqli_query($conn,$query);
$row = mysqli_fetch_array($exec);
$emailproveedor = $row['email'];

$query = "INSERT INTO mensualidad (marca,nombre_marca,mes_cobro,fecha,importe,email,pagado,fechaPago) VALUES ('".$idmarca."','".$nombre."','".$mes."','".$fecha."',".$importe.",1,3,'".$date."')";
//echo $query;
$exec = mysqli_query($conn,$query);

$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Cobro a marca ".$nombre."','".$user."','".date("Y-m-d")."')";
$exec2 = mysqli_query($conn,$registro);
if($exec){
	echo "Cobro creado";
}else{
	echo mysqli_error($conn);;
	//echo "Error".mysqli_error($conn);
}


mysqli_close($conn);



?>