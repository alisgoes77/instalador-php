<?php

session_start();
include("../conexiones/conexion.php");
$key = $_POST['key'];
$validator = $_POST['validator'];
$html = '';


$query = 'SELECT e.ident,e.nombre,e.proveedorid,e.precio,trim(e.descripcion) as descripcion,f.nombre as nombreprov FROM producto e INNER JOIN proveedores f ON e.proveedorid = f.ident WHERE CONCAT(e.ident,e.nombre, e.proveedorid)
	    ORDER BY ident DESC';

if ($validator != "caja" && $validator != "distinct") {
	$query1 = 'SELECT ident,nombre,proveedorid FROM producto 
     WHERE CONCAT(ident,nombre, proveedorid) LIKE "%' . strip_tags($key) . '%"
    ORDER BY ident DESC';
	$result = $conn->query($query1);
	if ($result->num_rows > 0) {
		while ($row = $result->fetch_assoc()) {
			$html .= '<div><a class="suggest-element" data="' . $row['nombre'] . '" id="' . $row['ident'] . '" prov="' . $row['proveedorid'] . '">' . $row['nombre'] . '|' . $row['ident'] . '|' . $row['proveedorid'] . '</a></div>';
		}
	}
} else if ($validator == "distinct") {
	$result = $conn->query($query);
	if ($result->num_rows > 0) {
		while ($row = $result->fetch_array()) {
			$identificador = $row['ident'];
			$exist = 0;
			if (strlen($identificador) == 6) {
				$query2 = "SELECT existencia AS existencia1 FROM inventario WHERE ident = '" . $identificador . "'";
				$result2 = $conn->query($query2);
				$row2 = $result2->fetch_array();
				if (!isset($row2['existencia1'])) {
					$exist = 0;
				} else {
					$exist = $row2['existencia1'];
				}
			} else {
				$exist = 0;
			}

			$html .= '<option value ="' . $row['ident'] . '" provnombre = "' . $row['nombreprov'] . '" descripcion = "' . utf8_encode($row['descripcion']) . ' "id="' . $row['nombre'] . '" prov="' . $row['proveedorid'] . '" precio="' . $row['precio'] . '" existencia="' . $exist . '">' . $row['nombre'] . '|' . $row['ident'] . '|' . $row['proveedorid'] . '</option>';
		}
	}
} else {


	$result = $conn->query($query);
	if ($result->num_rows > 0) {
		while ($row = $result->fetch_array()) {
			$identificador = $row['ident'];
			$exist = 0;
			if (strlen($identificador) == 6) {
				$query2 = "SELECT existencia AS existencia1 FROM inventario WHERE ident = '" . $identificador . "'";
				$result2 = $conn->query($query2);
				$row2 = $result2->fetch_array();
				if (!isset($row2['existencia1'])) {
					$exist = 0;
				} else {
					$exist = $row2['existencia1'];
				}
			} else {
				$exist = 0;
			}

			$html .= '<option value ="' . $row['nombre'] . '" provnombre = "' . $row['nombreprov'] . '" descripcion = "' . utf8_encode($row['descripcion']) . ' "id="' . $row['ident'] . '" prov="' . $row['proveedorid'] . '" precio="' . $row['precio'] . '" existencia="' . $exist . '">' . $row['nombre'] . '|' . $row['ident'] . '|' . $row['proveedorid'] . '</option>';
		}
	}
}
echo $html;
