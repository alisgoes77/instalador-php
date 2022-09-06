<?php
session_start();
include("../conexiones/conexion.php");
date_default_timezone_set('America/Monterrey');
$monto = $_POST["monto"];
$prov = $_POST["prov"];
$mes = $_POST["mes"];
$cantidad = $_POST["cantidad"];
$user = $_SESSION["nombre"];

$query = "";


if($monto > $cantidad){
	$query = "UPDATE mensualidad SET pagado = 1 ,cantidad = ".$cantidad.", fechaPago = '".date("Y-m-d")."' WHERE mes_cobro = '".$mes."' AND marca = '".$prov."'";
}else if($monto < $cantidad){
	$query = "UPDATE mensualidad SET pagado = 2 ,cantidad = ".$cantidad.", fechaPago = '".date("Y-m-d")."' WHERE mes_cobro = '".$mes."' AND marca = '".$prov."'";
}else{
	$query = "UPDATE mensualidad SET pagado = 3 ,cantidad = ".$cantidad.", fechaPago = '".date("Y-m-d")."' WHERE mes_cobro = '".$mes."' AND marca = '".$prov."'";
}

$exec = mysqli_query($conn,$query);

$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Pago de mensualidad ".$prodid."','".$user."','".date("Y-m-d")."')";
$exec2 = mysqli_query($conn,$registro);



if($exec){
	echo "Pago registrado";
}else{
	//echo $query;
	echo "Error ".mysqli_error($conn).$query;
}


mysqli_close($conn);



?>