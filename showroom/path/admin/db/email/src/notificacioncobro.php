<?php
session_start();
include("../../conexiones/conexion.php");
$idmarca = $_POST['idmarca'];
$nombre = $_POST['nombre'];
$mes = $_POST['mes'];
$fecha = $_POST['fecha'];
$importe = $_POST['importe'];
$plantilla = $_POST['plantilla'];


      $query = "SELECT email FROM proveedores WHERE ident = ".$idmarca;
      $exec = mysqli_query($conn,$query);
      $row = mysqli_fetch_array($exec);
      $emailproveedor = $row['email'];

$curl = curl_init();
 curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.sendgrid.com/v3/mail/send",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLINFO_HEADER_OUT=> true,
  CURLOPT_HEADER=> true,
  CURLOPT_POSTFIELDS => "
  { 
    \"from\": 
      {
        \"email\": \"bezavala@seaumn.org\"
      }, 
    \"personalizations\": 
      [
        {
          \"to\": [
            { 
              \"email\" : \"$emailproveedor\"
            }
          ],
          \"dynamic_template_data\": {
            \"nombreProveedor\" : \"$nombre\",
            \"mesCobro\" : \"$mes\",
            \"importe\" : \"$importe\",
            \"diaCobro\" : \"$fecha\",
          }
        }
      ],
      \"template_id\":\"$plantilla\"
  }",
 
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer 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",
    "cache-control: no-cache",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$info = curl_getinfo($curl);


$err = curl_error($curl);

curl_close($curl); 

 if($response){
   echo json_encode(array('message' => 'Email enviado con exito','type' => 'success'));
 }else{
   echo json_encode(array('message' => 'Email enviado con exito','type' => 'warning'));
 }

?>

