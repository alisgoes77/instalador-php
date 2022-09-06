var counter = 0;
$(document).ready(function () {
  var mailer = (function (provid, email, provname, data, subject, counter) {
    var executed = false;
    return function () {
      if (!executed) {
        executed = true;
        $.ajax({
          type: "POST",
          url: "../../db/email/src/mailer.php",
          data: { provid: provid, email: email, nombre: provname, data: data, subject: subject, counter: counter },
          error: function (resp) {
            console.log(resp);
          },
          success: function (resp) {
             swal("Alerta", resp, "success");
            counter = 1;
          }

        });
      }
    };
  })();
  function cargarTabla() {
    $.ajax({
      url: "../../db/consultas/consultaCobrosMarcas.php",
      dataType: "json",
      type: "post",
      data: {},
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
         //console.log(resp);
        if (resp.resp[0].message == 'nothing found') {
          //swal("Alerta", "No hay cobros registrados", "warning");
        } else {
          var tr = document.getElementById("poliza");
  
  
          for (i = 0; i < resp.resp.length; i++) {
            var arrL = [];
            var pru = resp.resp;
            var id = resp.resp[i]["id"];
            var marca = resp.resp[i]["marca"];
            var nombre_marca = resp.resp[i]["nombre_marca"];
            var mes_cobro = resp.resp[i]["mes_cobro"];
            var fecha = resp.resp[i]["fecha"];
            var importe = resp.resp[i]["importe"];
            var email = resp.resp[i]["email"];
            var button = '<button class="btnico" id = "selectLine"><i class="fa fa-trash"></i></button>';
            
            arrL.push(id);
            arrL.push(marca);
            arrL.push(nombre_marca);
            arrL.push(mes_cobro);
            arrL.push(fecha);
            arrL.push(importe);
            arrL.push(button);
            arrM.push(arrL);
        }
          console.log(arrM);
          if ($.fn.DataTable.isDataTable('#cobrosamarcas')) {
            $('#cobrosamarcas').DataTable().destroy();
          }
  
          $('#cobrosamarcas tbody').empty();
  
          $('#cobrosamarcas tfoot th').each(function () {
            var title = $(this).text();
            $(this).html('<input type="text" placeholder="Buscar ' + title + '" />');
          });
          var table = $('#cobrosamarcas').DataTable({
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
              { title: "id" },
              { title: "marca" },
              { title: "nombre de marca" },
              { title: "mes de cobro" },
              { title: "fecha" },
              { title: "importe" },
              { title: "acción" }
  
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
  $(document).on("click", "#cargarmarcas", function () {
    var cad = "";
    $.ajax({
      url: "../../db/consultas/getProveedores.php",
      dataType: "text",
      type: "post",
      data: {},
      async: false,
      beforeSend: function () {
      },
      complete: function () {

      },
      error: function (resp) {
        console.log(resp);
      },
      success: function (resp) {
        var provs = resp.split("||");
        var cleanArray = provs.filter(function (el) {
          return el != "";
        });

        for (var i = 0; i <= cleanArray.length - 1; i++) {
          var uniq = provs[i].split("|");
          cad = cad + '<option value ="' + uniq[0] + '" attr = "' + uniq[1] + '" mensualidad = "' + uniq[2] + '">' + uniq[1] + '|' + uniq[0] + '</option>';
        }
        $("#marcaselect").html(cad);
      }
    })

  });

  $(document).on("change", "#marcaselect", function () {
    var element = $(this).find('option:selected');
    var myTag = element.attr("mensualidad");
    $("#montocobro").val(myTag);
  });

  $(document).one("click", "#crearcobro", function () {
    var element = $("#marcaselect").find('option:selected');
    var nombre = element.attr("attr");
    var idmarca = $("#marcaselect").val();
    var mes = $("#start").val();
    var fecha = $("#fechaselect").val();
    var importe = $("#montocobro").val();

    var email = "";
    var subject = "Cobro de renta";
    if (mes == "" || fecha == "" || importe == "") {
      swal("Alerta", "Llene el formulario completo", "warning");
    } else {
      $.ajax({
        url: "../../db/consultas/crearCobro.php",
        dataType: "text",
        type: "post",
        data: { nombre: nombre, idmarca: idmarca, mes: mes, fecha: fecha, importe: importe },
        async: false,
        beforeSend: function () {
        },
        complete: function () {

        },
        error: function (resp) {
          console.log(resp);

        },
        success: function (resp) {
          swal("Alerta", resp + " generando email...", "success");
        }
      })
      
      $.ajax({
        type: "POST",
        url: "../../db/email/src/notificacioncobro.php",
        dataType: 'json',
        data: { idmarca: idmarca, nombre: nombre, mes: mes, fecha: fecha, importe: importe,plantilla : "d-56f587c221c3452cad5415802eb26d79" },
        error: function (resp) {
          console.log(resp);
        },
        success: function (data) {
          swal("Alerta", data.message, data.type);
        }


      });//ajax
    }
    cargarTabla();


  });

  $(document).on("click", "#selectLine", function () {
    var $row = $(this).closest("tr"),        // Finds the closest row <tr> 
      $ident = $row.find("td:nth-child(1)").text(); // Finds the 2nd <td> element
    var id = $ident;
    $.ajax({
      url: "../../db/consultas/borrarCobrosMarca.php",
      dataType: "text",
      type: "post",
      data: { id: id },
      async: true,
      beforeSend: function () {
      },
      complete: function () {

      },
      error: function (resp) {
        console.log(resp);

      },
      success: function (resp) {
        swal("Alerta", resp, "success");
        cargarTabla();
      }

    });



  });
  
  $(document).one("click", "#notificacionemail", function () {
    var $row = $(this).closest("tr"),        // Finds the closest row <tr> 
      $ident = $row.find("td:nth-child(1)").text(); // Finds the 2nd <td> element
    var id = $ident;
    var provid = $row.find("td:nth-child(2)").text();
    var provname = $row.find("td:nth-child(3)").text();
    var mescobro = $row.find("td:nth-child(4)").text();
    var fecha = $row.find("td:nth-child(5)").text();
    var importe = $row.find("td:nth-child(6)").text();


    if (parseFloat(counter) == 0) {
      $.ajax({
        type: "POST",
        url: "../../db/email/src/notificacioncobro.php",
        data: { id: id, provid: provid, provname: provname, mescobro: mescobro, fecha: fecha, importe: importe },
        error: function (resp) {
          console.log(resp);
        },
        success: function (data) {
          mailer(provid, email, provname, data, subject, counter);
        }
     });//ajax


    }

  });

  $(document).on("click", "#consultacobros", function () {
    cargarTabla();
  });
});
