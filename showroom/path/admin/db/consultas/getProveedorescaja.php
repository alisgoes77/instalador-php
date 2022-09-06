<?php

session_start();
include("../conexiones/conexion.php");
$key = $_POST['key'];
$validator = $_POST['validator'];
$html = '';
$query = "";

$query = 'SELECT ident,nombre FROM proveedores WHERE nombre LIKE "%'.strip_tags($key).'%"';
$result = $conn->query($query);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {                
        $html .= '<div><a class="suggest-element" data="'.$row['nombre'].'" id="'.$row['ident'].'">'.$row['nombre'].'|'.$row['ident'].'</a></div>';
    }
}
echo $html;


?>