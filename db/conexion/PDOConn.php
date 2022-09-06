<?php

try {
        $conn = new PDO("mysql:host=127.0.0.1:3306;dbname=dashboard", 'root', 'Lp098xdr', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8") );

} catch (PDOException $pe) {
   echo die("Could not connect to the database:" . $pe->getMessage());
}

?>