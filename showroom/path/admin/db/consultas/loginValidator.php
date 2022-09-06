<?php


include("../conexiones/conexion.php");

$user = $_POST["user"];
$pass = $_POST["pass"];


$sql = "SELECT * FROM usuarios WHERE email = '".$user."'";


$stmt = mysqli_query( $conn, $sql);
if( $stmt === false ) {
   echo json_encode(array('return' => 2));   
}
while( $row = mysqli_fetch_array( $stmt) ) {
	$passDB = $row["password"];
      if($passDB == $pass){
      	session_start();
      	$_SESSION["email"] = $row["email"];
      	$_SESSION["nombre"] = $row["nombre"];
      	$_SESSION["puesto"] = $row["puesto"];
            $_SESSION["priv1"] = $row["priv1"];
            $_SESSION["priv2"] = $row["priv2"];
            $_SESSION["priv3"] = $row["priv3"];
            $_SESSION["priv4"] = $row["priv4"];
      	$registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Inicio sesión ".$user."','".$user."','".date("Y-m-d")."')";
            $exec2 = mysqli_query($conn,$registro);
      	header('Content-Type: application/json');
      	echo json_encode(array('return' => 1));
      	exit;


      }else{
            $registro = "INSERT INTO registro (accion,user,fecha) VALUES ('Fallo inicio de sesión ".$user."','".$user."','".date("Y-m-d")."')";
            $exec2 = mysqli_query($conn,$registro);
      	header('Content-Type: application/json');
      	echo json_encode(array('return' => 2));
      	exit;
      }
}

mysqli_close($conn);
?>