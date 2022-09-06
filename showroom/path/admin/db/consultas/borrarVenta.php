<?php
session_start();
include("../conexiones/conexion.php");
date_default_timezone_set('America/Monterrey');
$ident = $_POST["ident"];
$ventaid = $_POST["ventaid"];
$ventaidprod = $_POST["ventaidprod"];
$user = $_SESSION["nombre"];






$query2 = "DELETE  FROM ventadesg WHERE id = '".$ident."' AND idventa = '".$ventaid."'";
$exec2 = mysqli_query($conn,$query2);

$query1 = mysqli_query($conn,"SELECT idventa FROM ventadesg WHERE idventa = '".$ventaid."'");
$numero_filas = mysqli_num_rows($query1);

if($numero_filas == 0){
  $query4 = "DELETE  FROM ventas WHERE id = '".$ident."'";
  $exec4 = mysqli_query($conn,$query4);  
}//else{
   // $query5 = mysqli_query($conn,"UPDATE ventas SET totalventa = (SELECT SUM(total) as newtotal FROM ventadesg WHERE idventa = '".$ventaid."')");
   // $row5 = mysqli_fetch_array($query5);
   // $totalUpdt = $row5["newtotal"];
//}

$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Borrar venta producto ".$ventaidprod."','".$user."','".date("Y-m-d")."')";
$exec3 = mysqli_query($conn,$registro);
if($exec2 && $exec3){
	echo "Venta de producto eliminada ".$numero_filas;
}else{
	echo $query2;
	echo "Error".mysqli_error($conn);
}


mysqli_close($conn);



?>
