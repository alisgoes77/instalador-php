<?php
function mysqli_fetch_all_alt($result) {
    $select = array();

    while( $row = mysqli_fetch_assoc($result) ) {
        $select[] = $row;
    }

    return $select;
}
function selectMultipleRows($db, $query)
{
    
    $array = array();



    $stmt = mysqli_query($db,$query);
    if($result = mysqli_fetch_all_alt($stmt))
    {
        foreach($result as $res)
        {
            foreach($res as $key=>$val)
            {
                $temp[$key] =$val;
            }
            array_push($array, $temp);
        }
        return $array;
     }
       return false;
 }
function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }
    return $d;
}
function jsonparser($result)
{
    
    $array = array();
    if($result != null)
    {
        foreach($result as $res)
        {
            foreach($res as $key=>$val)
            {
                $temp[$key] =$val;
            }
            array_push($array, $temp);
        }
        return $array;
     }
       return false;
 }
?>