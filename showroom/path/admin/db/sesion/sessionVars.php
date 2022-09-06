<?php
session_start();
$fondo = $_POST["fondo"];
$idCiclo = $_POST["idCiclo"];
$periodo = $_POST["periodo"];
$colegio = $_POST["colegio"];

$_SESSION["f"] = $fondo;
$_SESSION["idCiclo"] = $idCiclo;
$_SESSION["periodo"] = $periodo;
$_SESSION["colegio"] = $colegio;

header('Content-Type: application/json');
echo json_encode(array('return' => 1));
exit;


?>