<?php
session_start();
include("../conexiones/conexion.php");
include("funcionesConsulta.php");
date_default_timezone_set('America/Monterrey');
$data = array();
$i = 0;

$user = $_POST["user"];
$provid = $_POST["provid"];
$fecha = $_POST["fecha"];
$fecha1 = $_POST["fecha1"];
$fecha2 = $_POST["fecha2"];

$cajaventas = "";
if($user == 1 || $user == 2){
    if($fecha1 == "-" || $fecha2 == "-"){
        $cajaventas = "SELECT e.*,TRIM(f.vendedor) as vendedor,f.ie as ie,f.concepto as concepto,f.metodo as metodo, g.nombre as provname, (e.pUni * e.cant) - total  as descuento,e.hora as hora FROM ventadesg e INNER JOIN ventas f ON e.idventa = f.idventa INNER JOIN proveedores g ON e.proveedor = g.ident WHERE e.fecha ='".$fecha."'";
    }else{
        $cajaventas = "SELECT e.*,TRIM(f.vendedor) as vendedor,f.ie as ie,f.concepto as concepto,f.metodo as metodo, g.nombre as provname, (e.pUni * e.cant) - total as descuento,e.hora as hora FROM ventadesg e INNER JOIN ventas f ON e.idventa = f.idventa INNER JOIN proveedores g ON e.proveedor = g.ident WHERE e.fecha BETWEEN '".$fecha1."' AND '".$fecha2."'";
    }
   
}else if($user == "Proveedor"){
    if($fecha1 == "-" || $fecha2 == "-"){
        $cajaventas = "SELECT e.*,TRIM(f.vendedor) as vendedor,f.ie as ie,f.concepto as concepto,f.metodo as metodo, g.nombre as provname ,(e.pUni * e.cant) - total as descuento,e.hora as hora FROM ventadesg e INNER JOIN ventas f ON e.idventa = f.idventa INNER JOIN proveedores g ON e.proveedor = g.ident WHERE e.proveedor = ".$provid ." AND e.fecha ='".$fecha."'";
    }else{
        $cajaventas = "SELECT e.*,TRIM(f.vendedor) as vendedor,f.ie as ie,f.concepto as concepto,f.metodo as metodo, g.nombre as provname, (e.pUni * e.cant) - total as descuento,e.hora as hora FROM ventadesg e INNER JOIN ventas f ON e.idventa = f.idventa INNER JOIN proveedores g ON e.proveedor = g.ident WHERE e.proveedor = ".$provid ." AND e.fecha BETWEEN '".$fecha1."' AND '".$fecha2."'";

    }
   
}
				
if(!empty(selectMultipleRows($conn, $cajaventas))){ 		

foreach(selectMultipleRows($conn, $cajaventas) as $row)
    {
        $array[$i]["id"] = $row['id'];
        $array[$i]["idventa"] = $row['idventa'];
        $array[$i]["fecha"] = $row['fecha'];
        $array[$i]["idProd"] = $row['idProd'];
        $array[$i]["nombre"] = $row['nombre'];
        $array[$i]["proveedor"] = $row['proveedor'];
        $array[$i]["pUni"] = $row['pUni'];
        $array[$i]["cant"] = $row['cant'];
        $array[$i]["total"] = $row['total'];
        $array[$i]["vendedor"] = $row['vendedor'];
        $array[$i]["ie"] = $row['ie'];
        $array[$i]["concepto"] = $row['concepto'];
        $array[$i]["metodo"] = $row['metodo'];
        $array[$i]["provname"] = $row['provname'];
        $array[$i]["descuento"] = $row['descuento'];
        $array[$i]["hora"] = $row['hora'];
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
                 'idventa' => utf8_encode($value["idventa"]),
                 'fecha' => utf8_encode($value["fecha"]),
                 'idProd' => utf8_encode($value["idProd"]),
                 'fecha' => utf8_encode($value["fecha"]),
                 'nombre' => utf8_encode($value["nombre"]),
                 'proveedor' => utf8_encode($value["proveedor"]),
                 'pUni' => utf8_encode($value["pUni"]),
                 'cant' => utf8_encode($value["cant"]),
                 'total' => utf8_encode($value["total"]),
                 'vendedor' => utf8_encode($value["vendedor"]),
                 'ie' => utf8_encode($value["ie"]),
                  'concepto' => utf8_encode($value["concepto"]),
                  'metodo' => utf8_encode($value["metodo"]),
                  'provname' => utf8_encode($value["provname"]),
                  'descuento' => utf8_encode($value["descuento"]),
                  'hora' => utf8_encode($value["hora"]),
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
