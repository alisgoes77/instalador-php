<?php
//incluir la conexion de base de datos
include 'conexion/conexion.php';
include 'conexion/datos.php';
date_default_timezone_set('America/Monterrey');
//
$fecha = date("Y-m-d");

//recuperar los datos del formulario
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$nomEmpresa = $_POST['nomEmpresa'];
$Usuario = $_POST['Usuario'];
$password = $_POST['pass1'];
$password2 = $_POST['pass2'];
$puesto = "1";
$priv1 = "tienda";
$priv2 = "inventario";
$priv3 = "corte";
$priv4 = "proveedores";
//encriptar contraseña

echo $name;
echo "<br>";
echo $email;
echo "<br>";
echo $phone;
echo "<br>";
echo $nomEmpresa;
echo "<br>";
echo $Usuario;
echo "<br>";
echo $password;
echo "<br>";
echo $password2;
echo "<br>";
echo $puesto;
echo "<br>";
echo $priv1;
echo "<br>";
echo $priv2;
echo "<br>";
echo $priv3;
echo "<br>";
echo $priv4;
echo "<br>";
echo $fecha;
echo "<br>";

$clave=md5($password);
 echo 'Clave encriptada: '.$clave;
echo "<br>";
echo "<hr>";

$miInsert = $miPDO->prepare('INSERT INTO usuarios (email,password,puesto,nombre,nomEmpresa,priv1,priv2,priv3,priv4,fechaCreacion) VALUES (:email, :clave, :puesto, :nombre, :nomEmpresa, :priv1, :priv2, :priv3, :priv4, :fecha)');
    // Ejecuta INSERT con los datos
    $miInsert->execute(
        array(
            'email' => $email,
            'clave' => $clave,
            'puesto' => $puesto,
            'nombre' => $name,
            'nomEmpresa' => $nomEmpresa,
            'priv1'=> $priv1,
            'priv2'=> $priv2,
            'priv3'=> $priv3,
            'priv4'=> $priv4,
            'fecha' =>$fecha
        )
    );
// escribir el log.
    $accion = "Creación de usuario:.$name.";
$miInsert2 = $miPDO->prepare('INSERT INTO registro (accion, user, fecha) VALUES (:accion, :user, :fecha)');
    // Ejecuta INSERT con los datos
    $miInsert2->execute(
        array(
            'accion' => $accion,
            'user' => $email,
            'fecha' => $fecha
        )
    );
    // Redireccionamos a Leer
   // header('Location: ../vistas/dashboard.php');
//Crear carpeta
$path = "../showroom/path/".$nomEmpresa;
if (!file_exists($path)) {
    mkdir($path, 0777, true);
}
//copiar datos
//copiar archivos
copy('/Applications/MAMP/htdocs/Sin título/instalador-php/archivos/full.zip','/Applications/MAMP/htdocs/Sin título/instalador-php/showroom/path/'.$nomEmpresa.'/full.zip');

     $zip = new ZipArchive;
// Declaramos el fichero a descomprimir, puede ser enviada desde un formulario
     $comprimido= $zip->open('/Applications/MAMP/htdocs/Sin título/instalador-php/showroom/path/'.$nomEmpresa.'/full.zip');
     if ($comprimido=== TRUE) {
// Declaramos la carpeta que almacenara ficheros descomprimidos
         $zip->extractTo('/Applications/MAMP/htdocs/Sin título/instalador-php/showroom/path/'.$nomEmpresa);
         $zip->close();
// Imprimimos si todo salio bien
         echo 'El fichero se descomprimio correctamente!';
     } else {
// Si algo salio mal, se imprime esta seccion
         echo 'Error descomprimiendo el archivo zip';
     }
//crear base de datos

// conexion a la base de datos
$dbhost = "127.0.0.1:3306";
$user = "root";
$password = "Lp098xdr";
$conexion = new mysqli($dbhost, $user, $password);

if ($conexion->connect_error){
    die("conexion fallida: " .$conexion->connect_error);
}
//creacion de la base de datos
$sql = "CREATE DATABASE $nomEmpresa" ;
if($conexion->query($sql)===true){
echo "base de datos creada correctamente... ";
}else{
    die("error al crear base de datos");
}
//insertar tablas

// Cerramos la conexión
$miPDO->close();
//crear subdominio
?>
