<?php
session_start();
include("../conexiones/conexion.php");
include("funcionesConsulta.php");
date_default_timezone_set('America/Monterrey');
$data = array();
$i = 0;
$ingresos = "";
$fec1 = $_POST["fecha1"];
$fec2 = $_POST["fecha2"];

if(isset($_POST['user'])){
    $user = $_POST['user'];
    $provid = $_POST['provid'];
    if($user == 1 || $user == 2){
        $ingresos = "SELECT e.*,f.nombre FROM `entradas` e inner join proveedores f on e.provid = f.ident WHERE e.fecha BETWEEN '".$fec1."' AND '".$fec2."'";
    }else{
        $ingresos = "SELECT e.*,f.nombre FROM `entradas` e inner join proveedores f on e.provid = f.ident WHERE e.fecha BETWEEN '".$fec1."' AND '".$fec2."' WHERE provid =".$provid;

    }
  
}else{

$ingresos = "SELECT e.*,f.nombre FROM `entradas` e inner join proveedores f on e.provid = f.ident WHERE e.fecha BETWEEN '".$fec1."' AND '".$fec2."'";

}





if(!empty(selectMultipleRows($conn, $ingresos))){ 		

foreach(selectMultipleRows($conn, $ingresos) as $row)
    {
        $array[$i]["id"] = $row['id'];
        $array[$i]["prodnombre"] = $row['prodnombre'];
        $array[$i]["prodid"] = $row['prodid'];
        $array[$i]["provid"] = $row['provid'];
        $array[$i]["ingreal"] = $row['ingreal'];
        $array[$i]["fecha"] = $row['fecha'];
        $array[$i]["accion"] = $row['accion'];
        $array[$i]["usuario"] = $row['usuario'];
         $array[$i]["nombre"] = $row['nombre'];
       
        
        $i++;
    }
}
    if(!(empty($array))) // If something was fetched
    {
        while(list($key, $value) = each($array))
        {
             $json[] = array
             (
                'id' => utf8_encode($value["id"]),
                 'prodnombre' => utf8_encode($value["prodnombre"]),
                 'prodid' => utf8_encode($value["prodid"]),
                 'provid' => utf8_encode($value["provid"]),
                 'ingreal' => utf8_encode($value["ingreal"]),
                 'fecha' => utf8_encode($value["fecha"]),
                 'accion' => utf8_encode($value["accion"]),
                 'usuario' => utf8_encode($value["usuario"]),
                 'nombre' => utf8_encode($value["nombre"]),
                 'consulta' => utf8_encode($ingresos),
                 'message' => 'success'
             );
            
       }
    }
    else // Nothing found in database
    { 
        $json[] = array
        (    'consulta' => $ingresos,
             'message' => 'nothing found'
        );
    }

$jsonT = array('resp' => $json);
echo json_encode($jsonT);
flush();



?>