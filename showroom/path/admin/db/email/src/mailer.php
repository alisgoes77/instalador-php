<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
include("../../conexiones/conexion.php");
/* Exception class. */
require('Exception.php');

/* The main PHPMailer class. */
require('PHPMailer.php');

/* SMTP class, needed if you want to use SMTP. */
require('SMTP.php');
//ob_start();
//include('email.php');


$nombre = $_POST['nombre'];
$data = $_POST['data']; 



$provid = "";
$sb = "";
$email = "";

if(isset($_POST['email']) && $_POST['email'] != ""){
      $email = $_POST['email'];
   }else{
      $provid = $_POST['idmarca'];
      $query = "SELECT email FROM proveedores WHERE ident = ".$provid;
      $exec = mysqli_query($conn,$query);
      $row = mysqli_fetch_array($exec);
      $email = $row['email'];
   }
if($email == "" || !isset($email)){
   echo "Email no encontrado ".$email;
   }else{
      if(isset($_POST['subject'])){
         $sb = $_POST['subject'];
      }else{
          $sb = "Notificación";
      }
$mail = new PHPMailer(TRUE);
$mail->SMTPDebug = 0; 
$mail->SMTPAuth = false;//SMTP authentication should be false
$mail->SMTPSecure = 'none';// Security type should be none 

try {
   
   $mail->setFrom('recibos@rmshowroom.com', 'Rosa Mexicano Showroom');
   $mail->addAddress($email, $nombre);
   $mail->Subject = $sb;
   $mail->isHTML(TRUE);
   $body = ob_get_clean();
   $mail->AddEmbeddedImage('mainlogo.png', 'logo_2u','mainlogo.png');
   $mail->Body = $data.'<img alt="PHPMailer" src="cid:logo_2u" width="140" height="100"></td>
          </tr>
        </table>
      </center>
    </td>
  </tr>
</table>
</div>
</body>
</html>';
   
   $mail->AltBody = 'Email de Rosa Mexicano';

    $mail->Host = 'localhost';
    $mail->Port = 25;
   /* Finally send the mail. */
   $mail->send();
   $resp = "Email enviado a ".$email;
   $data1 = base64_encode($data);
      $mailsave = "INSERT INTO mailer (email_to,name,subject,fecha,data) VALUES('".$email."','".$nombre."','".$sb."','".date("Y-m-d")."','".$data1."')";
      $ex1 = mysqli_query($conn,$mailsave);
    if($ex1){
        $resp = $resp." |email guardado";
    }else{
        echo "Error description: " . mysqli_error($conn);
    }
   if($sb == "Cobro de renta"){
      $updt = "UPDATE mensualidad SET email = 1 WHERE marca = '".$provid."'";
      $ex = mysqli_query($conn,$updt);
   }
    echo $resp;
}
catch (Exception $e)
{
   echo $e->errorMessage();
}
catch (\Exception $e)
{
   echo $e->getMessage();
}
}
?>