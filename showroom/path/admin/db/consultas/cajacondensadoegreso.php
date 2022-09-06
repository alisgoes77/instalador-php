<?php
session_start();
include("../conexiones/conexion.php");
include("funcionesConsulta.php");
date_default_timezone_set('America/Monterrey');
$data = array();
$i = 0;

$user = $_POST["user"];
$fecha = $_POST["fecha"];
$fecha1 = $_POST["fecha1"];
$fecha2 = $_POST["fecha2"];

$cajaventas = "";
if($user == 1 || $user == 2){
    if($fecha1 == "-" || $fecha2 == "-"){
    $cajaventas = " SELECT sum(e.total) as totalventa,e.proveedor as provid ,sum(e.totdesc) as totaldesc ,e.fecha,f.nombre from ventadesg e INNER JOIN proveedores f ON e.proveedor = f.ident WHERE e.fecha = '".$fecha."' and e.idProd == 0 group by proveedor";
    }else{
    $cajaventas = " SELECT sum(e.total) as totalventa,e.proveedor as provid ,sum(e.totdesc) as totaldesc ,e.fecha,f.nombre from ventadesg e INNER JOIN proveedores f ON e.proveedor = f.ident WHERE e.fecha BETWEEN '".$fecha1."' AND '".$fecha2."' and e.idProd == 0 group by proveedor";

       
    }
   
}
				
if(!empty(selectMultipleRows($conn, $cajaventas))){ 		

foreach(selectMultipleRows($conn, $cajaventas) as $row)
    {
        $array[$i]["totalventa"] = $row['totalventa'];
        $array[$i]["provid"] = $row['provid'];
        $array[$i]["totaldesc"] = $row['totaldesc'];
        $array[$i]["fecha"] = $row['fecha'];
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
                 'totalventa' => utf8_encode($value["totalventa"]),
                 'provid' => utf8_encode($value["provid"]),
                 'totaldesc' => utf8_encode($value["totaldesc"]),
                 'fecha' => utf8_encode($value["fecha"]),
                 'nombre' => utf8_encode($value["nombre"]),
                 'consulta' => utf8_encode($cajaventas),
                 'message' => 'success'
             );
            
       }
    }
    else // Nothing found in database
    { 
        $json[] = array
        (    'consulta' => $cajaventas,
             'message' => 'nothing found'
        );
    }

$jsonT = array('resp' => $json);
echo json_encode($jsonT);
flush();



?>