<?php

include("../conexiones/conexion.php");

$user = $_POST["user"];//telefono
$pass = $_POST["pass"];//numero proveedor


$sql = "SELECT * FROM proveedores WHERE tel = '".$user."'";


$stmt = mysqli_query( $conn, $sql);
if( $stmt === false ) {
	echo $sql;
     die( print_r( sqlsrv_errors(), true));
}
while( $row = mysqli_fetch_array( $stmt) ) {
	$passDB = $row["ident"];
      if($passDB == $pass){
      	session_start();
      	$_SESSION["email"] = $row["nombre"];
      	$_SESSION["nombre"] = $row["ident"];
      	$_SESSION["puesto"] = "Proveedor";
            $_SESSION["priv1"] = "";
            $_SESSION["priv2"] = "";
            $_SESSION["priv3"] = "";
            $_SESSION["priv4"] = "";
      	$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Inicio sesión ".$user."','".$user."','".date("Y-m-d")."')";
            $exec2 = mysqli_query($conn,$registro);
      	header('Content-Type: application/json');
      	echo json_encode(array('return' => 1));
      	exit;


      }else{
            $registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Fallo inicio de sesión ".$user."','".$user."','".date("Y-m-d")."')";
            $exec2 = mysqli_query($conn,$registro);
      	header('Content-Type: application/json');
      	echo json_encode(array('return' => $sql));
      	//echo $passDB."|".$hashed;
      	exit;
      }
}

mysqli_close($conn);
?>