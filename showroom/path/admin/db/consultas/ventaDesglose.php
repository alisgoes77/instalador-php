<?php
session_start();
include("../conexiones/conexion.php");
date_default_timezone_set('America/Monterrey');

$ventaid = $_POST["ventaid"];
$idProd = $_POST["idProd"];
$nombre = $_POST["nombre"];
$prov = $_POST["prov"];
$pUni = $_POST["pUni"];
$cant = $_POST["cant"];
$porcen = $_POST["porcen"];
$total = $_POST["total"];
$vendedor = $_POST["vendedor"];
$date = date("Y-m-d");
$hora = date("H:i:s");
$query = "INSERT INTO ventadesg (idventa,fecha,idProd,nombre,proveedor,pUni,cant,total,totdesc,hora) VALUES (".$ventaid.",'".$date."',".$idProd.",'".$nombre."',".$prov.",".$pUni.",".$cant.",".$total.",".$porcen.",'".$hora."')";
$exec = mysqli_query($conn,$query);



$queryInv = "UPDATE inventario SET existencia = existencia -".$cant." WHERE ident = ".$idProd;
$execInv = mysqli_query($conn,$queryInv);


$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Desglose de venta con id ".$ventaid."','".$vendedor."','".date("Y-m-d")."')";
$exec2 = mysqli_query($conn,$registro);
if($exec && $exec2 && $execInv){
	echo "Venta registrada";
}else{
	echo mysqli_error($conn);
	$deletelast = "DELETE FROM ventas WHERE idventa = ".$ventaid;
	mysqli_query($conn,$deletelast);
	$queryInv = "UPDATE inventario SET existencia = existencia +".$cant." WHERE ident = ".$idProd;
	$execInv = mysqli_query($conn,$queryInv);
	
}


mysqli_close($conn);



?>