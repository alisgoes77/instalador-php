$(document).on("click", "#buscarCobros", function () {
  var marca = $("#nombre").html();
  marca = marca.trim();
  $.ajax({
    url: "../../db/consultas/cobrosPorMarca.php",
    dataType: "json",
    type: "post",
    data: { marca: marca },
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
        swal("Alerta", "No hay cobros registrados", "warning");
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




          arrL.push(id);
          arrL.push(marca);
          arrL.push(nombre_marca);
          arrL.push(mes_cobro);
          arrL.push(fecha);
          arrL.push(importe);

          arrM.push(arrL);




        }

        if ($.fn.DataTable.isDataTable('#cobrosmimarcatable')) {
          $('#cobrosmimarcatable').DataTable().destroy();
        }

        $('#cobrosmimarcatable tbody').empty();

        $('#cobrosmimarcatable tfoot th').each(function () {
          var title = $(this).text();
          $(this).html('<input type="text" placeholder="Buscar ' + title + '" />');
        });
        var table = $('#cobrosmimarcatable').DataTable({
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
            { title: "importe" }

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

});