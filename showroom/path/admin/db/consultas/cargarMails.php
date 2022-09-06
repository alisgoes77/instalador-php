<?php
session_start();
include("../conexiones/conexion.php");
include("funcionesConsulta.php");
date_default_timezone_set('America/Monterrey');
$data = array();
$i = 0;
$tipo = $_POST["tipo"];
$cobrosamarca = "SELECT * FROM mailer WHERE subject = '".$tipo."'";
   





				
if(!empty(selectMultipleRows($conn, $cobrosamarca))){ 		

foreach(selectMultipleRows($conn, $cobrosamarca) as $row)
    {
        $array[$i]["id"] = $row['id'];
        $array[$i]["email_to"] = $row['email_to'];
        $array[$i]["name"] = $row['name'];
        $array[$i]["subject"] = $row['subject'];
        $array[$i]["fecha"] = $row['fecha'];
        $array[$i]["data"] = $row['data'];
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
                 'email_to' => utf8_encode($value["email_to"]),
                 'name' => utf8_encode($value["name"]),
                 'subject' => utf8_encode($value["subject"]),
                 'fecha' => utf8_encode($value["fecha"]),
                 'data' => base64_decode($value["data"]),
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