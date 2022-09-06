var provflag = 0;

$(document).on("click", "#ident", function () {
  var random = Math.floor(100000 + Math.random() * 900000);
  $("#ident").val(random);
});

$(document).on("focus", "#ident", function () {
  var random = Math.floor(100000 + Math.random() * 900000);
  $("#ident").val(random);
});

$(document).one("click", "#altaProveedor", function () {

  var ident = $("#ident").val();
  var nombre = $("#nomProv").val();
  var fecha = $("#fechaCrear").val();
  var tel = $("#telefono").val();
  var email = $("#email").val();
  var mensualidad = $("#mensualidad").val();
  var bancaria = $("#bancaria").val();
  var ciudad = $("#ciudad").val();
  var sucursal = $("#sucursal").val();
  if (provflag == 0) {
    $.ajax({
      url: "../../db/consultas/altaProv.php",
      dataType: "text",
      type: "post",
      data: { sucursal: sucursal, mensualidad: mensualidad, ident: ident, nombre: nombre, fecha: fecha, tel: tel, email: email, bancaria: bancaria, ciudad: ciudad },
      async: true,
      beforeSend: function () {
      },
      complete: function () {

      },
      error: function (resp) {
        console.log(resp);

      },
      success: function (resp) {
        provflag = 1;
        var random = Math.floor(100000 + Math.random() * 900000);
        $("#ident").val(random);
        swal("Alerta", resp, "success");
        $("#ident").val("");
        $("#nomProv").val("");
        $("#fechaCrear").val("");
        $("#telefono").val("");
        $("#email").val("");
        $("#mensualidad").val("");
        $("#bancaria").val("");
        $("#ciudad").val("");
        document.getElementById("proveedores").click();
      }
    });
  } else {
    provflag = 0;
  }
});

$(document).one("click", "#updtProveedor", function () {

  var ident = $("#ident").val();
  var nombre = $("#nomProv").val();
  var fecha = $("#fechaCrear").val();
  var tel = $("#telefono").val();
  var email = $("#email").val();
  var bancaria = $("#bancaria").val();
  var ciudad = $("#ciudad").val();
  var mensualidad = $("#mensualidad").val();
  var sucursal = $("#sucursal").val();
  if (ident == "" || nombre == "") {
    swal("Alerta", "Campos vacios, llene porfavor", "warning");
  } else {
    $.ajax({
      url: "../../db/consultas/updtProv.php",
      dataType: "text",
      type: "post",
      data: { sucursal: sucursal, mensualidad: mensualidad, ident: ident, nombre: nombre, fecha: fecha, tel: tel, email: email, ciudad: ciudad, bancaria: bancaria },
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

        document.getElementById("proveedores").click();
        document.getElementById("consultaProveedor").click();
      }
    });
  }

});

$(document).one("click", "#delProveedor", function () {

  var ident = $("#ident").val();

  if (ident == "") {
    alert("Seleccione un cliente de la tabla inferior");
  } else {
    if (confirm('Por favor confirme borrado de proveedor ' + ident + ' esto borrara sus productos e inventario del sistema')) {
      $.ajax({
        url: "../../db/consultas/deleteProv.php",
        dataType: "text",
        type: "post",
        data: { ident: ident },
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
          document.getElementById("proveedores").click();
          document.getElementById("consultaProveedor").click();
        }
      });
    } else {
      alert("Operación cancelada");
    }
  }
});

$(document).on("click", "#selectLine", function () {
  var $row = $(this).closest("tr");       // Finds the closest row <tr> 
  
  $("#ident").val($row.find("td:nth-child(1)").text());
  $("#nomProv").val($row.find("td:nth-child(2)").text());
  $("#fechaCrear").val($row.find("td:nth-child(3)").text());
  $("#mensualidad").val($row.find("td:nth-child(4)").text());
  $("#bancaria").val($row.find("td:nth-child(5)").text());
  $("#telefono").val($row.find("td:nth-child(7)").text());
  $("#email").val($row.find("td:nth-child(8)").text());

  $("#ciudad").val($row.find("td:nth-child(9)").text());
  $("#sucursal").val($row.find("td:nth-child(6)").text());


});

$(document).on("click", "#consultaProveedor", function () {
  $.ajax({
    url: "../../db/consultas/consultaProvs.php",
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
      if (resp.resp[0].message == 'nothing found') {
        alert("No hay proveedores dados de alta");
      } else {
        var tr = document.getElementById("poliza");


        for (i = 0; i < resp.resp.length; i++) {
          var arrL = [];
          var pru = resp.resp;

          var ident = resp.resp[i]["ident"];
          var nombre = resp.resp[i]["nombre"];
          var fecha = resp.resp[i]["fecha"];
          var tel = resp.resp[i]["tel"];
          var email = resp.resp[i]["email"];
          var ciudad = resp.resp[i]["ciudad"];
          var importe = resp.resp[i]["importe"];
          var banco = resp.resp[i]["bancaria"];
          var sucursal = resp.resp[i]["sucursal"];
          var button = '<input type = "button" class = "btn btn-danger" id = "selectLine" value = "Seleccionar">';

          arrL.push(ident);
          arrL.push(nombre);
          arrL.push(fecha);
          arrL.push(importe);
          arrL.push(banco);
          arrL.push(sucursal);
          arrL.push(tel);
          arrL.push(email);
          arrL.push(ciudad);

          arrL.push(button);
          arrM.push(arrL);




        }

        if ($.fn.DataTable.isDataTable('#provTable')) {
          $('#provTable').DataTable().destroy();
        }

        $('#provTable tbody').empty();


        $('#provTable').DataTable({
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
            { title: "ident" },
            { title: "nombre" },
            { title: "fecha" },
            { title: "Mensualidad" },
            { title: "# Bancaria" },
            { title: "Banco" },
            { title: "tel" },
            { title: "email" },
            { title: "ciudad" },
            { title: "acción" }

          ]

        });


      }
    }
  });



});


