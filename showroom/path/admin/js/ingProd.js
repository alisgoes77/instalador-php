var tipo = "";
function printDiv(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}

$(document).on("click", "#consultaIngresos", function () {

  var fecha1 = $("#fechainicial").val();
  var fecha2 = $("#fecha2").val();
  console.log(fecha1 + "|" + fecha2);
  if (fecha1 == "" || fecha2 == "") {
    alert("Selecciona un rango de fechas primero")
  } else {
    $.ajax({
      url: "../../db/consultas/consultaIngre.php",
      dataType: "json",
      type: "post",
      data: { fecha1: fecha1, fecha2: fecha2 },
      async: true,
      beforeSend: function () {
      },
      complete: function () {

      },
      error: function (resp) {
        console.log(resp);

      },
      success: function (resp) {
        var arrM = [];
        if (resp.resp[0].message == 'nothing found') {
          alert("No hay entradas registradas en el periodo seleccionado");
        } else {
          var tr = document.getElementById("poliza");


          for (i = 0; i < resp.resp.length; i++) {
            var arrL = [];
            var pru = resp.resp;
            var id = resp.resp[i]["id"];
            var prodnombre = resp.resp[i]["prodnombre"];
            var prodid = resp.resp[i]["prodid"];
            var provid = resp.resp[i]["provid"];

            var ingreal = resp.resp[i]["ingreal"];
            var fecha = resp.resp[i]["fecha"];
            var accion = resp.resp[i]["accion"];
            var usuario = resp.resp[i]["usuario"];
            var nombre = resp.resp[i]["nombre"];


            var button = '<input type = "button" class = "btn btn-danger" id = "selectLine" value = "Seleccionar">';
            arrL.push(id);
            arrL.push(prodid);
            arrL.push(prodnombre);
            arrL.push(provid);

            arrL.push(ingreal);
            arrL.push(fecha);
            arrL.push(usuario);
            arrL.push(nombre);


            arrL.push(button);
            arrM.push(arrL);




          }

          if ($.fn.DataTable.isDataTable('#ingresostable')) {
            $('#ingresostable').DataTable().destroy();
          }

          $('#ingresostable tbody').empty();

          $('#ingresostable tfoot th').each(function () {
            var title = $(this).text();
            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
          });
          var table = $('#ingresostable').DataTable({
            dom: 'Bfrtip',
            "paging": true,
            buttons: [
              { extend: 'copyHtml5', footer: true },
              { extend: 'excelHtml5', footer: true },
              { extend: 'csvHtml5', footer: true },
              { extend: 'pdfHtml5', footer: true },
              { extend: 'print' }
            ],
            data: arrM,
            columns: [
              { title: "ID" },
              { title: "Producto ID" },
              { title: "Nombre producto" },
              { title: "Proveedor ID" },

              { title: "Ingreso real" },
              { title: "Fecha ingreso" },
              { title: "Ing por" },
              { title: "Nombre" },
              { title: "Acción" }

            ]

          });
          table.columns().every(function () {
            var that = this;

            $('input', this.footer()).on('keyup change clear', function () {
              if (that.search() !== this.value) {
                that
                  .search(this.value)
                  .draw();
              }
            });
          });

        }
      }
    });

  }

});

$(document).one("click", "#selectLine", function () {
  var $row = $(this).closest("tr"),        // Finds the closest row <tr> 
    $ident = $row.find("td:nth-child(1)"); // Finds the 2nd <td> element
  $("#idmovi").html($row.find("td:nth-child(1)").text());
  $("#provee").html($row.find("td:nth-child(4)").text());
  $("#prodID").html($row.find("td:nth-child(2)").text());
  $("#key").val($row.find("td:nth-child(2)").text())
  $("#prod").html($row.find("td:nth-child(3)").text());

  $("#cant").html($row.find("td:nth-child(5)").text());
  $("#cantPres").val($row.find("td:nth-child(5)").text());
  $("#fecha").html($row.find("td:nth-child(6)").text());
  $("#dateIng").val($row.find("td:nth-child(6)").text());



});

$('#key2').on('keyup', function () {
  var key = $(this).val();
  var validator = "ingreso";
  if (key == "") {
    $('#suggestions').fadeOut(1000);
  } else {
    var dataString = 'key=' + key;
    $.ajax({
      type: "POST",
      url: "../../db/consultas/getProductos.php",
      data: { key: key, validator: validator },
      error: function (data) {
        console.log(data);
      },
      success: function (data) {
        //Escribimos las sugerencias que nos manda la consulta
        $('#suggestions2').fadeIn(1000).html(data);
        //Al hacer click en alguna de las sugerencias
        $('.suggest-element').on('click', function () {
          //Obtenemos la id unica de la sugerencia pulsada
          var id = $(this).attr('id');
          //Editamos el valor del input con data de la sugerencia pulsada
          $('#key2').val($('#' + id).attr('data') + "|" + id);
          //Hacemos desaparecer el resto de sugerencias
          $('#suggestions2').fadeOut(1000);
          // alert('Has seleccionado el '+id+' '+$('#'+id).attr('data'));
          $("#provee").html($('#' + id).attr('prov'));
          $("#prod").html($('#' + id).attr('data'));
          tipo = $('#' + id).attr('presen');
          $("#prodID").html(id);
          var random = Math.floor(100000 + Math.random() * 900000);
          $("#idmovi").html(random);
          return false;
        });
      }
    });
  }
});

$('#cantIng').on('keyup', function () {

  var key = $(this).val();
  var idprod = $("#prodID").html();
  var dataString = 'key=' + key;
  if (key != "") {
    $.ajax({
      type: "POST",
      url: "../../db/consultas/canting.php",
      data: { key: key, idprod: idprod },
      success: function (data) {
        if (tipo == 1) {
          tipo = "Unidad";
        } else if (tipo == 2) {
          tipo = "Paquete";
        } else {
          tipo = "Cajas";
        }
        $("#cantPresing").html(key + " " + tipo);
        $("#cantSising").html(data + " unidades");
      }
    });
  }
});

$('#cantPres').on('keyup', function () {
  var key = $(this).val();
  $("#cant").html(key + " unidades");

});
$('#dateIng').change(function () {

  var inputDate = new Date(this.value);
  $("#fecha").html(this.value);
});

$('#ingresarProducto').one('click', function () {

  var provee = $("#provee").html();
  var prodID = $("#prodID").html();
  var prod = $("#prod").html();

  var cant = $("#cant").html();

  cant = cant.split(" ");
  var fecha = $("#fecha").html();
  if (provee == "" || prodID == "" || fecha == "") {
    alert("Llena el formulario por favor");
  } else {
    $("#act").html("Ingreso de producto");
    var act = 1
    $.ajax({
      type: "POST",
      url: "../../db/consultas/ingprod.php",
      data: { provee: provee, prodID: prodID, prod: prod, cant: cant[0], fecha: fecha, act: act },
      success: function (data) {
        swal("Alerta", data, "success");
        document.getElementById("ingproducto").click();
      }
    });
  }
});

$('#eliminaringreso').one('click', function () {

  var ident = $("#idmovi").html();

  $("#act").html("Eliminar ingreso");
  var act = 1
  $.ajax({
    type: "POST",
    url: "../../db/consultas/delproding.php",
    data: { ident: ident },
    success: function (data) {
      swal("Alerta", data, "success");
      document.getElementById("ingproducto").click();
    }
  });
});

