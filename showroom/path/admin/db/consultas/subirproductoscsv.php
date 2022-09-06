<?php
session_start();
include("../conexiones/conexion.php");
$message = '';
$employee_file = $_POST['employee_file'];
$user = $_SESSION["nombre"];
 if(!empty($_FILES["file"]["name"]))
 {
  $filename = explode(".", $_FILES['file']['name']);
  if(end($filename) == "csv")
  {
   $handle = fopen($_FILES['file']['tmp_name'], "r");
   while($data = fgetcsv($handle))
   {
    $nombre= mysqli_real_escape_string($conn, $data[0]);
    $descripcion = mysqli_real_escape_string($conn, $data[1]);  
    $fecha = mysqli_real_escape_string($conn, $data[2]);
    $proveedorid = mysqli_real_escape_string($conn, $data[3]);
    $usuario = mysqli_real_escape_string($conn, $data[4]);
    $precio = mysqli_real_escape_string($conn, $data[5]);
    $cantini = mysqli_real_escape_string($conn, $data[6]);
    $total = $cantini * $precio;
    $six_digit = mt_rand(100000, 999999);
    $validate = mysqli_query($conn, "SELECT ident FROM producto WHERE ident = ".$six_digit);
    $rows_validate = mysqli_num_rows($validate);
   
    if($rows_validate != 0){
        $six_digit = mt_rand(100000, 999999);
    }
    $qq = "SELECT nombre FROM producto WHERE proveedorid = ".$proveedorid." AND nombre='".$nombre."'";
    $val2 = mysqli_query($conn, $qq);
    $rows_val = mysqli_num_rows($val2);
    if($rows_val == 0){
       $query = "INSERT INTO producto(ident,nombre,descripcion,fecha,proveedorid,usuario,precio)VALUES('".$six_digit."','".$nombre."','".$descripcion."','".$fecha."','".$proveedorid."','".$usuario."',".$precio.")";
    $insert = mysqli_query($conn, $query);
    if(!$insert){
        echo mysqli_error($conn);
    }else{
        $message = $message." Producto ".$rows_val." dado de alta\r\n";
        
        $queryi = "INSERT INTO inventario (ident,existencia,importe,provee) VALUES (".$six_digit.",".$cantini.",".$total.",".$proveedorid.")";
        $execi = mysqli_query($conn,$queryi);

       
        if(!$execi){
	        echo mysqli_error($conn).$queryi;
	    }
    } 
    }else{
        $message =$message."Producto ".$nombre." no subido, producto con nombre duplicado en mismo proveedor ".$proveedorid."\r\n";
        continue;
    }
    
    
   }
    echo $message; 
   fclose($handle);
   
  }
  else
  {
   echo 'Formato de archivo no valido';
  }
 }
 else
 {
  echo 'Selecciona un archivo';
 }



?>
