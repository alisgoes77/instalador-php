<?php
session_start();
include("../conexiones/conexion.php");
include("funcionesConsulta.php");
date_default_timezone_set('America/Monterrey');
$data = array();
$i = 0;
$cobrosamarca = "";
$idMarca = $_POST["idMarca"];

$cobrosamarca = "SELECT id,marca,nombre_marca,mes_cobro,fecha,importe,email,pagado,cantidad FROM mensualidad WHERE marca = '".$idMarca."' ORDER BY id DESC";
   





				
if(!empty(selectMultipleRows($conn, $cobrosamarca))){ 		

foreach(selectMultipleRows($conn, $cobrosamarca) as $row)
    {
        $array[$i]["id"] = $row['id'];
        $array[$i]["marca"] = $row['marca'];
        $array[$i]["nombre_marca"] = $row['nombre_marca'];
        $array[$i]["mes_cobro"] = $row['mes_cobro'];
        $array[$i]["fecha"] = $row['fecha'];
        $array[$i]["importe"] = $row['importe'];
        $array[$i]["email"] = $row['email'];
        $array[$i]["pagado"] = $row['pagado'];
        $array[$i]["cantidad"] = $row['cantidad'];
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
                 'marca' => utf8_encode($value["marca"]),
                 'nombre_marca' => utf8_encode($value["nombre_marca"]),
                 'mes_cobro' => utf8_encode($value["mes_cobro"]),
                 'fecha' => utf8_encode($value["fecha"]),
                 'importe' => utf8_encode($value["importe"]),
                 'email' => utf8_encode($value["email"]),
                 'pagado' => utf8_encode($value["pagado"]),
                 'cantidad' => utf8_encode($value["cantidad"]),
                 'consulta' => utf8_encode($cobrosamarca),
                 'message' => 'success'
             );
            
       }
    }
    else // Nothing found in database
    { 
        $json[] = array
        (    'consulta' => $cobrosamarca,
             'message' => 'nothing found'
        );
    }

$jsonT = array('resp' => $json);
echo json_encode($jsonT);
flush();



?>