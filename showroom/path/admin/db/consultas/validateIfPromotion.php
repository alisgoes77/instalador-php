<?php

use LDAP\Result;

session_start();
include("../conexiones/conexion.php");
include("tools.php");;
date_default_timezone_set('America/Monterrey');

$product_code = $_POST['productId'];

$query = "SELECT * FROM promociones WHERE producto = '".$product_code."' ORDER BY id DESC LIMIT 1";

$result = getData($conn,$query);

if(!is_null($result)){
    if (count($result) > 0 ) {
        echo json_encode(array("resp" => $result,"status" => "success"));
    }
}else{
    echo json_encode(array("resp" => "Sin promocion","status" => "error"));
}
