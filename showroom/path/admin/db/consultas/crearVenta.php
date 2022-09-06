<?php
session_start();
include("../conexiones/conexion.php");
date_default_timezone_set('America/Monterrey');

$ventaid = $_POST["ventaid"];
$totalPago = $_POST["totalPago"];
$metodoPago = $_POST["metodoPago"];
$recepcion = $_POST["recepcion"];
$cambio = $_POST["cambio"];
$vendedor = $_POST["vendedor"];
$tipoing = $_POST["tipoing"];
$concepto = $_POST["concepto"];
$date = date("Y-m-d");


$validador = "SELECT estado FROM estadocaja WHERE fecha = '".$date."' and estado != 2";
$execValid = mysqli_query($conn,$validador);
$row_cnt = mysqli_num_rows($execValid);
$row = mysqli_fetch_array($execValid);
$esta = $row['estado'];
if($esta != 1){
	echo "2";
}else{
	
	$query = "INSERT INTO ventas (idventa,totalventa,metodo,recibo,cambio,vendedor,fecha,ie,concepto) VALUES (".$ventaid.",".$totalPago.",'".$metodoPago."','".$recepcion."','".$cambio."','".$vendedor."','".$date."','".$tipoing."','".$concepto."')";
	$exec = mysqli_query($conn,$query);
	$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Venta realizada con id ".$ventaid."','".$vendedor."','".date("Y-m-d")."')";
	$exec2 = mysqli_query($conn,$registro);
	if($exec){
		echo "Venta registrada";
	}else{
		echo "Error ".mysqli_error($conn);
	}
}






mysqli_close($conn);



?>