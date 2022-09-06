<?php
session_start();
include("../conexiones/conexion.php");

$provee = $_POST["provee"];
$prodID = $_POST["prodID"];
$prod = $_POST["prod"];

$cant = $_POST["cant"];
$fecha = $_POST["fecha"];
$act = $_POST["act"];

$user = $_SESSION["nombre"];

$query = "INSERT INTO entradas (prodnombre,prodid,provid,ingreal,fecha,accion,usuario)VALUES ('".$prod."','".$prodID."','".$provee."',".$cant.",'".$fecha."',".$act.",'".$user."')";
$exec = mysqli_query($conn,$query);


$queryi = "UPDATE inventario SET existencia = existencia + ".$cant.",importe = (SELECT precio FROM producto WHERE ident = '".$prodID."') * existencia WHERE ident = '".$prodID."'";
$execi = mysqli_query($conn,$queryi);

$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Ingreso de producto a inventario ".$prodID." cantidad = ".$cant.",'".$user."','".date("Y-m-d")."')";
$exec2 = mysqli_query($conn,$registro);
if($exec){
	echo "Ingreso registrado";
}else{
	echo $query.mysqli_error($conn);
	//echo "Error".mysqli_error($conn);
}



mysqli_close($conn);



?>

