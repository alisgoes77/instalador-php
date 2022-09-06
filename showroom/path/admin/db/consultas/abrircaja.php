<?php
session_start();
include("../conexiones/conexion.php");

date_default_timezone_set('America/Monterrey');
$fecha = $_POST["fecha"];
$accion = $_POST["accion"];
$saldo = $_POST["saldo"];
$nombre = $_POST["nombre"];
$yesterday = date('Y-m-d',strtotime("-1 days"));
$query = "INSERT INTO estadocaja (fecha,estado,saldo,saldosistema,usuario)VALUES ('".$fecha."',".$accion.",".$saldo.",0,'".$nombre."')";
$exec = mysqli_query($conn,$query);
$updtcaja = "";
if($accion == 2){
	$updtcaja = "UPDATE estadocaja SET saldosistema = (SELECT sum(totalventa) FROM ventas WHERE ie = 1) - (SELECT sum(totalventa) FROM ventas WHERE ie = 2) WHERE fecha = '".date("Y-m-d")."' AND estado = 2";
}else{
	$updtcaja = "UPDATE estadocaja SET saldosistema = (SELECT sum(totalventa) FROM ventas WHERE ie = 1) - (SELECT sum(totalventa) FROM ventas WHERE ie = 2) WHERE fecha = '".$yesterday."' AND estado = 1";
}
$execUpdt = mysqli_query($conn,$updtcaja);



$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Apertura de caja ".$accion."','".$nombre."','".date("Y-m-d")."')";
$exec2 = mysqli_query($conn,$registro);
if($exec){
	if($accion == 1){
		echo "Apertura registrada";
	}else{
		echo "Cierre registrado";
	}
}else{
	//echo $query;
	echo "Error".mysqli_error($conn);
}


mysqli_close($conn);



?>