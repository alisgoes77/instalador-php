<?php
session_start();
include("../conexiones/conexion.php");
include("funcionesConsulta.php");
date_default_timezone_set('America/Monterrey');

$data = array();
$i = 0;
$productos = "";

$user = $_POST["user"];
$provid = $_POST["provid"];


$productos = "SELECT e.ident,e.nombre,e.descripcion,e.precio,f.existencia,e.precio * f.existencia as importe FROM `producto` e INNER JOIN inventario f ON e.ident = f.ident WHERE e.proveedorid = ".$provid;


if(!empty(selectMultipleRows($conn, $productos))){ 		

foreach(selectMultipleRows($conn, $productos) as $row)
    {
        $array[$i]["ident"] = $row['ident'];
        $array[$i]["nombre"] = $row['nombre'];
        $array[$i]["descripcion"] = $row['descripcion'];
        $array[$i]["precio"] = $row['precio'];
        $array[$i]["existencia"] = $row['existencia'];
        
        $array[$i]["importe"] = $row['importe'];
        
        $i++;
    }
}
    if(!(empty($array))) // If something was fetched
    {
        while(list($key, $value) = each($array))
        {
             $json[] = array
             (
                 'ident' => utf8_encode($value["ident"]),
                 'nombre' => utf8_encode($value["nombre"]),
                 'descripcion' => utf8_encode($value["descripcion"]),
                 'precio' => utf8_encode($value["precio"]),
                 'existencia' => utf8_encode($value["existencia"]),
                
                 'importe' => utf8_encode($value["importe"]),
                 
                 'consulta' => utf8_encode($productos),
                 'message' => 'success'
             );
            
       }
    }
    else // Nothing found in database
    { 
        $json[] = array
        (    'consulta' => $productos,
             'message' => 'nothing found'
        );
    }

   
$jsonT = array('resp' => $json);

echo json_encode(utf8ize($jsonT));
flush();



?>


