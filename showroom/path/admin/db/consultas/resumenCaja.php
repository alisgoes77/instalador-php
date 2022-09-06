<?php
session_start();
include("../conexiones/conexion.php");
include("funcionesConsulta.php");
date_default_timezone_set('America/Monterrey');





$user = $_POST["user"];
$provid = $_POST["provid"];
$fecha = $_POST["fecha"];
$fecha1 = $_POST["fecha1"];
$fecha2 = $_POST["fecha2"];
$ingreso ="";
$egreso = "";
$cajaventas = "";
if($user == 1 || $user == 2){
    if($fecha1 == "-" || $fecha2 == "-"){
        $ingreso = "SELECT IFNULL(sum(totalventa),0) as ingreso FROM ventas WHERE ie = 1 and fecha = '".$fecha."'";

        $egreso = "SELECT IFNULL(sum(totalventa),0) as egreso FROM ventas WHERE ie = 2 and fecha = '".$fecha."'";

    }else{
    	$ingreso = "SELECT IFNULL(sum(totalventa),0) as ingreso FROM ventas WHERE ie = 1 and fecha BETWEEN '".$fecha1."' AND '".$fecha2."'";

    	$egreso = "SELECT IFNULL(sum(totalventa),0) as egreso FROM ventas WHERE ie = 2 and fecha BETWEEN '".$fecha1."' AND '".$fecha2."'";
    }
   
}else if($user == "Proveedor"){
    if($fecha1 == "-" || $fecha2 == "-"){
    	$ingreso = "SELECT IFNULL(sum(total),0) as ingreso FROM ventadesg WHERE idProd != 0 and fecha = '".$fecha."' AND proveedor = ".$provid;

    	$egreso = "SELECT IFNULL(sum(total),0) as egreso FROM ventadesg WHERE fecha = '".$fecha."' AND proveedor = ".$provid;
       
    }else{
    	$ingreso = "SELECT IFNULL(sum(total),0) as ingreso FROM ventadesg WHERE idProd != 0 and fecha BETWEEN '".$fecha1."' AND '".$fecha2."' AND proveedor = ".$provid;

    	$egreso = "SELECT IFNULL(sum(total),0) as egreso FROM ventadesg WHERE fecha BETWEEN '".$fecha1."' AND '".$fecha2."' AND proveedor = ".$provid;

      

    }
   
}
 

$ingexec = mysqli_query($conn,$ingreso);
$egrexec = mysqli_query($conn,$egreso);

$rowing = mysqli_fetch_array($ingexec);
$rowegr = mysqli_fetch_array($egrexec);

$ingtotal = $rowing['ingreso'];
$egretotal = $rowegr['egreso'];

echo $ingtotal."|".$egretotal."|".$ingreso."|".$egreso;





?>


