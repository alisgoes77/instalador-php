<?php
function getData ($conn,$query){
    $QUERY_EXEC = mysqli_query($conn,$query);
    $ROW = mysqli_fetch_array($QUERY_EXEC);   
    return $ROW;
}

function getAllData ($conn,$query){
    $QUERY_EXEC = mysqli_query($conn,$query);
    $ARRAY = [];
    while($ROW = mysqli_fetch_array($QUERY_EXEC,MYSQLI_ASSOC)){
        $INNER = [];
        foreach($ROW as $KEY => $VALUE){
            //$inner[$KEY] = $VALUE; 
            array_push($INNER,$VALUE);
        }
        array_push($ARRAY,$INNER);
    }
    return $ARRAY;
}

function getDataRowLength($conn,$query){
    $QUERY_EXEC = mysqli_query($conn,$query);
    $ROW_SIZE = mysqli_num_rows($QUERY_EXEC); 
    return $ROW_SIZE;
}

function insertOrUpdate($conn,$query,$register_desc,$register_user){
    $QUERY_EXEC = mysqli_query($conn,$query);
    $REGISTER = "INSERT INTO registro (accion,user,fecha) VALUES ('$register_desc','$register_user','".date("Y-m-d")."')";
    $REGISTER_EXEC = mysqli_query($conn,$REGISTER);
    $RESPONSE = 'Success';
    if(!$QUERY_EXEC){
        $RESPONSE = "Error ".mysqli_error($conn);
    }
    if(!$REGISTER_EXEC){
        $RESPONSE = "Error ".mysqli_error($conn);
    }
    return $RESPONSE;
}
