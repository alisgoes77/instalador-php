<?php
session_start();
include("../conexiones/conexion.php");
include("funcionesConsulta.php");
date_default_timezone_set('America/Monterrey');
$data = array();
$i = 0;

$fec1 = $_POST["fecha"];




$cajaconsulta = "SELECT * FROM estadocaja WHERE fecha ='".$fec1."'";



				
if(!empty(selectMultipleRows($conn, $cajaconsulta))){ 		

foreach(selectMultipleRows($conn, $cajaconsulta) as $row)
    {
        $array[$i]["fecha"] = $row['fecha'];
        $array[$i]["estado"] = $row['estado'];
        $array[$i]["saldo"] = $row['saldo'];
        $array[$i]["saldosistema"] = $row['saldosistema'];
        $array[$i]["usuario"] = $row['usuario'];
      
       
        
        $i++;
    }
}
    if(!(empty($array))) // If something was fetched
    {
        while(list($key, $value) = each($array))
        {
             $json[] = array
             (
                'fecha' => utf8_encode($value["fecha"]),
                 'estado' => utf8_encode($value["estado"]),
                 'saldo' => utf8_encode($value["saldo"]),
                 'saldosistema' => utf8_encode($value["saldosistema"]),
                 'usuario' => utf8_encode($value["usuario"]),
                 'consulta' => utf8_encode($cajaconsulta),
                 'message' => 'success'
             );
            
       }
    }
    else // Nothing found in database
    { 
        $json[] = array
        (    'consulta' => $cajaconsulta,
             'message' => 'nothing found'
        );
    }

$jsonT = array('resp' => $json);
echo json_encode($jsonT);
flush();



?> 