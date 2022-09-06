<?php
$conn =  mysqli_connect('127.0.0.1:3306', 'root', 'Lp098xdr', 'rosa');
if (!$conn) {
     die('No pudo conectarse: ' . mysqli_error());
}
// $conn =  mysqli_connect('localhost', 'rmWeb', 'rmpass*20200285','rosamexicano');
// if (!$conn) {
//      die('No pudo conectarse: ' . mysqli_error());
// }
?>