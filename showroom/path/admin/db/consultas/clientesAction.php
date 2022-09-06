<?php
include("../conexiones/conexion.php");
include("tools.php");

if(isset($_POST['action']) && $_POST['action'] == 'update'){
    $query = "
    UPDATE clientes 
    SET ".$_POST["name"]." = '".$_POST["value"]."' 
    WHERE id = '".$_POST["pk"]."'
    ";  
}else{
    $query = "
    DELETE FROM clientes 
    WHERE id = '".$_POST["pk"]."'";

    
}


$conn->query($query);