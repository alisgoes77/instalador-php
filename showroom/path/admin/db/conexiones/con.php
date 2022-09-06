<div class="panel-body">
<?php
  $conn = new mysqli("localhost", "root", "MI_PASSWORD", "MI-DB");
  
  if ($conn->connect_error) {
    die("ERROR: No se puede conectar al servidor: " . $conn->connect_error);
  } 

  echo 'Conectado a la base de datos.<br>';

  $result = $conn->query("SELECT nombres, apellidos FROM alumnos");

  echo "Numero de resultados: $result->num_rows";

  $result->close();

  $conn->close();
?>
</div>