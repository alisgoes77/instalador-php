<?php
session_start();
include("../conexiones/conexion.php");

$html = '';
$query = 'SELECT * FROM clientes ORDER BY id DESC';
$result = $conn->query($query);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {                
        $html .= '<option value="'.$row['nombre'].'" data="'.$row['email'].'">'.$row['nombre'].'|'.$row['email'].'</option>';
    }
}
echo $html;
?> 