<?php
session_start();
include("../conexiones/conexion.php");
include("funcionesConsulta.php");
date_default_timezone_set('America/Monterrey');
$data = array();
$i = 0;
$inventario = "";
if(isset($_POST["user"])){
$user = $_POST["user"];
$provid = $_POST["provid"];
    if($user == 1 || $user == 2){
        $inventario = "SELECT e.ident,e.existencia,e.importe,e.provee,f.nombre as producto,g.nombre as proveedor, f.precio as precio FROM `inventario` e INNER JOIN producto f ON e.ident = f.ident INNER JOIN proveedores g ON e.provee = g.ident";
    }else{
        $inventario = "SELECT e.ident,e.existencia,e.importe,e.provee,f.nombre as producto,g.nombre as proveedor, f.precio as precio FROM `inventario` e INNER JOIN producto f ON e.ident = f.ident INNER JOIN proveedores g ON e.provee = g.ident WHERE e.provee = ".$provid;
    }
}else{

$inventario = "SELECT * FROM producto";

}				
if(!empty(selectMultipleRows($conn, $inventario))){ 		

foreach(selectMultipleRows($conn, $inventario) as $row)
    {
        $array[$i]["ident"] = $row['ident'];
        $array[$i]["existencia"] = $row['existencia'];
        $array[$i]["importe"] = $row['importe'];
        $array[$i]["provee"] = $row['provee'];
        $array[$i]["producto"] = $row['producto'];
        $array[$i]["proveedor"] = $row['proveedor'];
        $array[$i]["precio"] = $row['precio'];
        
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
                 'existencia' => utf8_encode($value["existencia"]),
                 'importe' => utf8_encode($value["importe"]),
                 'provee' => utf8_encode($value["provee"]),
                 'producto' => utf8_encode($value["producto"]),
                 'proveedor' => utf8_encode($value["proveedor"]),
                 'precio' => utf8_encode($value["precio"]),
                 'consulta' => utf8_encode($inventario),
                 'message' => 'success'
             );
            
       }
    }
    else // Nothing found in database
    { 
        $json[] = array
        (    'consulta' => $inventario,
             'message' => 'nothing found'
        );
    }

$jsonT = array('resp' => $json);
//echo json_encode($jsonT);
echo json_encode(utf8ize($jsonT));
flush();



?>


