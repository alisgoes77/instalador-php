<?php
session_start();
include("../conexiones/conexion.php");
include("funcionesConsulta.php");
date_default_timezone_set('America/Monterrey');
$data = array();
$json = array();
$i = 0;

$user = $_POST["user"];
$fecha = $_POST["fecha"];
$fecha1 = $_POST["fecha1"];
$fecha2 = $_POST["fecha2"];

$cajaventas = "SELECT ident,nombre FROM proveedores";
$exec = mysqli_query($conn,$cajaventas);
$idx = 0;
$array = array();
while($row = mysqli_fetch_array($exec)){
    $id = $row['ident'];
    $nombre = $row['nombre'];
    $ventas = "SELECT IFNULL(SUM(total),0) as ventas FROM ventadesg WHERE idProd != 0 AND fecha BETWEEN '".$fecha1."' AND '".$fecha2."' AND proveedor = ".$id;
    $ex = mysqli_query($conn,$ventas);
    $vnt = mysqli_fetch_array($ex);
    $vent = $vnt['ventas'];

    $pagos = "SELECT IFNULL(SUM(total),0) as pagos FROM ventadesg WHERE idProd = 0 AND fecha BETWEEN '".$fecha1."' AND '".$fecha2."' AND proveedor = ".$id;
    $exp = mysqli_query($conn,$pagos);
    $pgs = mysqli_fetch_array($exp);
    $pag = $pgs['pagos'];

    $descu = "SELECT IFNULL(SUM(((pUni*cant)*totdesc)/100),0) as descuentos FROM ventadesg WHERE fecha BETWEEN '".$fecha1."' AND '".$fecha2."' AND proveedor = ".$id;
    $esd = mysqli_query($conn,$descu);
    $desc = mysqli_fetch_array($esd);
    $descuentos = $desc['descuentos'];

$data['ident'] = $id;
$data['nombre'] = $nombre;
$data['ventas'] = $vent;
$data['pagos'] = $pag;
$data['descuentos'] = $descuentos;
$data['consulta'] = $cajaventas;
array_push($json, $data);
$idx++;     



}


if(!empty(jsonparser($json))){       

foreach(jsonparser($json) as $row)
    {
        $array[$i]["ident"] = $row['ident'];
        $array[$i]["nombre"] = $row['nombre'];
        $array[$i]["ventas"] = $row['ventas'];
        $array[$i]["pagos"] = $row['pagos'];
        $array[$i]["descuentos"] = $row['descuentos'];
        $array[$i]["consulta"] = $cajaventas;
        //$array[$i]["json"] = $json;
        
        $i++;
    }
}
    if(!(empty($array))) // If something was fetched
    {
        while(list($key, $value) = each($array))
        {
             $jsonArr[] = array
             (
                 'ident' => utf8_encode($value["ident"]),
                 'nombre' => utf8_encode($value["nombre"]),
                 'ventas' => utf8_encode($value["ventas"]),
                 'pagos' => utf8_encode($value["pagos"]),
                 'descuentos' => utf8_encode($value["descuentos"]),
                 'consulta' => utf8_encode($cajaventas),
                 'message' => 'success'
             );
            
       }
    }
    else // Nothing found in database
    { 
        $jsonArr[] = array
        (    'message' => 'nothing found'
        );
    }


    $jsonT = array('resp' => $jsonArr);
    echo json_encode(utf8ize($jsonT));
    flush();






?>


