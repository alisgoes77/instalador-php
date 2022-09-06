<?php
session_start();
include("../conexiones/conexion.php");
include("funcionesConsulta.php");
date_default_timezone_set('America/Monterrey');
$data = array();
$i = 0;
$fecha1 = $_POST["fecha1"];
$fecha2 = $_POST["fecha2"];
$fec1 = $_POST["fecha"];
$idprov = $_POST["id"];
$message = "";

if(isset($_POST['user'])){
    $user = $_POST['user'];
    
    if($user == 1 || $user == 2){
        $ingresos = "SELECT id,idProd,nombre,fecha,total as totalventa,cant as totalprod,pUni*cant*totdesc/100 as totaldesc from ventadesg where idProd = 0 and proveedor = '".$idprov."' AND fecha BETWEEN '".$fecha1."' AND '".$fecha2."'";
    }else{
        $message = "Consulta no valida";
    }
  
}else{

$message = "Usuario no reconocido";

}





				
if(!empty(selectMultipleRows($conn, $ingresos))){ 		

foreach(selectMultipleRows($conn, $ingresos) as $row)
    {
        $array[$i]["id"] = $row['id'];
        $array[$i]["idProd"] = $row['idProd'];
        $array[$i]["nombre"] = $row['nombre'];
        $array[$i]["fecha"] = $row['fecha'];
        $array[$i]["totalventa"] = $row['totalventa'];
        $array[$i]["totalprod"] = $row['totalprod'];
        $array[$i]["totaldesc"] = $row['totaldesc'];
         
        $i++;
    }
}
    if(!(empty($array))) // If something was fetched
    {
        $message = "success";
        while(list($key, $value) = each($array))
        {
             $json[] = array
             (
                 'id' =>utf8_encode($value["id"]),
                 'idProd' => utf8_encode($value["idProd"]),
                 'nombre' => utf8_encode($value["nombre"]),
                 'fecha' => utf8_encode($value["fecha"]),
                 'totalventa' => utf8_encode($value["totalventa"]),
                 'totalprod' => utf8_encode($value["totalprod"]),
                 'totaldesc' => utf8_encode($value["totaldesc"]),
                 'consulta' => utf8_encode($ingresos),
                 'error' => false,
                 'message' => $message
             );
            
       }
    }
    else // Nothing found in database
    { 
        $message = "Sin resultados";
        $json[] = array
        (    'consulta' => $ingresos,
             'error' => true,
             'message' => $message
        );
    }

$jsonT = array('resp' => $json);
echo json_encode($jsonT);
flush();



?>