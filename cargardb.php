<?php
$pasos=1;
if(isset($_GET['step'])){
    if($_GET['step']==1){
    $pasos=2;
        if($_POST['password']==""){
        $pass="vacio";
        }else{ $pass=$_POST['password']; }

            if (@file_get_contents("../connect.txt")) {
                if(unlink("../connect.txt"));
            }
            $file = fopen("../connect.txt", "a");
            fwrite($file, $_POST['hostname']. PHP_EOL);
            fwrite($file, $_POST['database']. PHP_EOL);
            fwrite($file, $_POST['username']. PHP_EOL);
            fwrite($file, $pass. PHP_EOL);
            fclose($file);

    }
    if($_GET['step']==2){
        $pasos=3;
    }
    if($_GET['step']==3){
        $pasos=4;
        $datos =array();
        $archivo = fopen("../connect.txt", "r");
        while(!feof($archivo)){
            $traer = fgets($archivo);
            $datos[] = $traer;
        }
        fclose($archivo);
        //--------------------------------------
        if(trim($datos[3])=="vacio"){
        $password="";
        }else{
            $password= trim($datos[3]);
        }

            $filename = 'elanime.sql';
            mysql_connect(trim($datos[0]), trim($datos[2]), $password);
            mysql_select_db(trim($datos[1]));

            $templine = '';

            $lines = file($filename);
            foreach ($lines as $line)
            {

                if (substr($line, 0, 2) == '--' || $line == '')
                    continue;

                $templine .= $line;

                if (substr(trim($line), -1, 1) == ';')
                {
                    mysql_query($templine);

                    $templine = '';
                }
            }
            //--------------------------
            //-----INSERTAR DATOS----------------
            $conexion=mysql_connect(trim($datos[0]), trim($datos[2]), $password);
            mysql_select_db(trim($datos[1]),$conexion);
            $sql = "INSERT INTO dn_datos (nombre, url) VALUES ('".$_POST['nombreweb']."', '".$_POST['url']."')";
            $result = mysql_query($sql);
            $sql_2 = "INSERT INTO dn_users (usuario, nombre, email, password, confirmpassword, estado, avatar) VALUES ('".$_POST['usuario']."', '".$_POST['nombreusuario']."', '".$_POST['email']."', '".md5($_POST['password'])."', '".md5($_POST['password'])."', 4, 'no_avatar.png')";
            $result_2 = mysql_query($sql_2);
            //-----------------------------------

    }


}
?>
<!DOCTYPE HTML>
<html>
<head>
<title>Instalador</title>
<meta charset="UTF-8" />
<meta name="Designer" content="PremiumPixels.com">
<meta name="Author" content="$hekh@r d-Ziner, CSSJUNTION.com">
<link rel="stylesheet" type="text/css" href="css/reset.css">
<link rel="stylesheet" type="text/css" href="css/structure.css">
</head>

<body>
<?php if($pasos==1){  ?>
<form class="box login" method="post" action="cargardb.php?step=<?php echo $pasos; ?>">
    <fieldset class="boxBody">
      <label>Hostname</label>
      <input type="text" required name="hostname">
      <label>Database</label>
      <input type="text" required name="database">
      <label>Username</label>
      <input type="text" required name="username">
      <label>Password</label>
      <input type="text" name="password">
    </fieldset>
    <footer>
      <input type="submit" class="btnLogin" value="Step <?php echo $pasos; ?>" tabindex="4">
    </footer>
</form>
<?php }?>
<?php if($pasos==2){  ?>
<form class="box login" method="post" action="cargardb.php?step=<?php echo $pasos; ?>">
    <fieldset class="boxBody">
      <?php
        $datos =array();
        $archivo = fopen("connect.txt", "r");
        while(!feof($archivo)){
            $traer = fgets($archivo);
            $datos[] = $traer;
        }
        fclose($archivo);
        //--------------------------------------
        if(trim($datos[3])=="vacio"){
        $password="";
        }else{
            $password= trim($datos[3]);
        }
        $link = mysql_connect(trim($datos[0]), trim($datos[2]), $password);
        if (!$link) {
                echo 'No se pudo conectar';
        }else{
                echo 'Connectado al servidor';
                echo '<br>';
        }


        $bd_seleccionada = mysql_select_db(trim($datos[1]));
        if (!$bd_seleccionada) {
        echo 'No se pudo seleccionar la base de datos';
        echo '<a class="btnLogin" href="cargardb.php">Regresar</a>';
        }else{
        echo 'Se a seleccionado la base de datos';
        }
        mysql_close($link);

      ?>
    </fieldset>
    <?php if (!$bd_seleccionada) {}else{?>
    <footer>
      <input type="submit" class="btnLogin" value="Step <?php echo $pasos; ?>" tabindex="4">
    </footer>
    <?php }?>
</form>
<?php }?>
<!--Step 2-->
<?php if($pasos==3){  ?>
<form class="box login" method="post" action="cargardb.php?step=<?php echo $pasos; ?>">
    <fieldset class="boxBody">
      <label>Nombre de tu Web</label>
      <input type="text" required name="nombreweb">
      <label>Url -- Nota: debe terminar con /</label>
      <input type="text" required name="url" placeholder="http:/der-nick.com/">
      <label>Usuario Administrador</label>
      <input type="text" required name="usuario">
      <label>Nombre del usuario</label>
      <input type="text" name="nombreusuario">
      <label>Email</label>
      <input type="text" name="email">
      <label>Contraseña</label>
      <input type="text" name="password">
    </fieldset>
    <footer>
      <input type="submit" class="btnLogin" value="Step <?php echo $pasos; ?>" tabindex="4">
    </footer>
</form>
<?php }?>
<?php if($pasos==4){  ?>
<form class="box login">
<fieldset class="boxBody">
      <label>Se instalo correctamente</label>
    </fieldset>
</form>
<?php }?>

</body>
</html>