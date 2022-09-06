<?php
session_start();
include("../../db/conexiones/conexion.php");
if (!isset($_SESSION["nombre"])) {
  header("Location: index.html");
  exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="gb18030">

  <link rel="apple-touch-icon" sizes="76x76" href="../assets/img/apple-icon.png">
  <link rel="icon" type="image/png" href="../../assets/img/favicon.png">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>
    Rosa Mexicano</title>
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
  <link href="https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.1/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet">
  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css">
  <!--     Fonts and icons     -->

  <style type="text/css">
    .loader {
      border: 16px solid #f3f3f3;
      border-radius: 50%;
      border-top: 16px solid #3498db;
      width: 120px;
      height: 120px;
      -webkit-animation: spin 2s linear infinite;
      /* Safari */
      animation: spin 2s linear infinite;
    }

    .content-desktop {
      display: block;
    }

    .content-mobile {
      display: none;
    }

    .previous {
      border-radius: 8px;
      border: 2px solid #FCE5D4;
      padding: 4px;
      width: 15px;
      height: 25px;
    }

    .next {
      border-radius: 8px;
      border: 2px solid #FCE5D4;
      padding: 5px;
      width: 15px;
      height: 25px
    }

    @media screen and (max-width: 768px) {

      .content-desktop {
        display: none;
      }

      .content-mobile {
        display: block;
      }

    }
  </style>
</head>

<body class="">
  <div class="wrapper ">
    <?php

    date_default_timezone_set('America/Monterrey');
    $query = "SELECT estado FROM estadocaja WHERE fecha = '" . date("Y-m-d") . "'";
    $exec = mysqli_query($conn, $query);
    $row = mysqli_fetch_array($exec);

    if (isset($row['estado'])) {
      if ($row['estado'] == 1) {
        include("../menus/menu2.php");
        echo "<div class='main-panel'>";
        include("../menus/navBar.php");
      }
    } else {

      include("../menus/alerta2.php");
      echo "<div class='main-panel'>";
      include("../menus/navBar.php");
    }
    ?>


    <div class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="card ">
            <div class="content" id="maincontroller">

              <div class="img-container" style="text-align: center;">
                <!-- Block parent element -->
                <img src="mainlogo.png" alt="Logo Rosa Mexicano">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <aside class="control-sidebar control-sidebar-dark" style="display: none">
    <!-- Control sidebar content goes here -->
    <div class="p-3">
      <h5>Configuración actual</h5>
      <label>Usuario actual</label>
      <p><span id="email"><?php echo $_SESSION["email"] ?></span></h5><br>
        <label> Nombre</label>
        <span id="nombre"><?php echo $_SESSION["nombre"] ?></span><br>
        <label> Puesto</label>
        <span id="puesto"><?php echo $_SESSION["puesto"] ?></span><br>
        <label>Privilegio 1</label>
        <span id="priv1"><?php echo $_SESSION["priv1"]; ?></span><br>
        <label>Privilegio 2</label>
        <span id="priv2"><?php echo $_SESSION["priv2"]; ?></span>
        <label>Privilegio 3</label>
        <span id="priv3"><?php echo $_SESSION["priv3"]; ?></span><br>
        <label>Privilegio 4</label>
        <span id="priv4"><?php echo $_SESSION["priv4"]; ?></span>
        <span id="activeDiv" style="display: none;"></span>

    </div>
  </aside>
  <footer class="footer footer-black  footer-white ">
    <div class="container-fluid">
      <div class="row">
        <nav class="footer-nav" style="color: white">
          <ul>
            <li><a href="https://www.creative-tim.com" target="_blank">Creative Tim</a></li>
            <li><a href="https://www.creative-tim.com/license" target="_blank">Licenses</a></li>
          </ul>
        </nav>
        <div class="credits ml-auto" style="color: white">
          <span class="copyright">

            <!--<script>
                  document.write(new Date().getFullYear())
                </script> -->, made with <i class="fa fa-heart heart"></i> by Creative Tim
          </span>
        </div>
      </div>
    </div>
  </footer>
  </div>
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
  <!-- CSS Files -->
  <link href="../../assets/css/bootstrap.min.css" rel="stylesheet" />
  <link href="../../assets/css/paper-dashboard.css?v=2.0.1" rel="stylesheet" />
  <!--   Core JS Files   -->
  <script src="../../assets/js/core/jquery.min.js"></script>
  <script src="../../assets/js/core/popper.min.js"></script>
  <script src="../../assets/js/core/bootstrap.min.js"></script>
  <script src="../../assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>
  <!-- Chart JS -->
  <script src="../../assets/js/plugins/chartjs.min.js"></script>
  <!--  Notifications Plugin    -->
  <script src="../../assets/js/plugins/bootstrap-notify.js"></script>
  <!--<script src="../../assets/js/paper-dashboard.min.js?v=2.0.1" type="text/javascript"></script> Paper Dashboard DEMO methods, don't include it in your project! -->

  <!-- Control Center for Now Ui Dashboard: parallax effects, scripts for the example pages etc -->
  <script src="../../assets/demo/demo.js"></script>
  <!--<script>
    $(document).ready(function() {
      // Javascript method's body can be found in assets/assets-for-demo/js/demo.js
      demo.initChartsPages();
    });
  </script>-->
  <script src="../../js/main.js"></script>
  <script src="../../js/login.js"></script>
  <script src="../../js/controller.js"></script>
  <script src="../../js/onscan.js"></script>
  <script src="../../js/tools.js"></script>
  
  <!-- <script src="../../plugins/jquery-tabledit-master/jquery.tabledit.js"></script> -->
  <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>
  <!--  <script type="text/javascript" charset="utf8" src="https://code.jquery.com/jquery-3.3.1.js"></script> -->
  <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
  <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/1.5.4/js/dataTables.buttons.min.js"></script>
  <script type="text/javascript" charset="utf8" src=" https://cdn.datatables.net/buttons/1.5.4/js/buttons.flash.min.js"></script>
  <script type="text/javascript" charset="utf8" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
  <script type="text/javascript" charset="utf8" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
  <script type="text/javascript" charset="utf8" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
  <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/1.5.4/js/buttons.html5.min.js"></script>
  <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/1.5.4/js/buttons.print.min.js"></script>
  <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/fixedcolumns/3.2.6/js/dataTables.fixedColumns.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jeditable.js/2.0.19/jquery.jeditable.min.js"></script>
  <!-- xEditable 
  <link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>
  <script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/js/bootstrap-editable.min.js"></script>-->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.1/bootstrap3-editable/js/bootstrap-editable.js"></script>
  <!-- barcode library -->
  <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script>
  <!-- jspdf library -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" integrity="sha512-qZvrmS2ekKPF2mSznTQsxqPgnpkI4DNTlrdUmTzrDgektczlKNRRhy5X5AAOnx5S09ydFYWWNSfcEqDTTHgtNA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</body>

</html>