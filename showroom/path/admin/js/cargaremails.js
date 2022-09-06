$(document).on("click", "#buscarCobros", function () {
  var tipo = $("#subject").val();
  $.ajax({
    url: "../../db/consultas/cargarMails.php",
    dataType: "json",
    type: "post",
    data: { tipo: tipo },
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
          var email_to = resp.resp[i]["email_to"];
          var name = resp.resp[i]["name"];
          var subject = resp.resp[i]["subject"];
          var fecha = resp.resp[i]["fecha"];
          var data = resp.resp[i]["data"];
          var file = new Blob([data], { type: 'text/html;charset=utf-8' });
          var fileURL = URL.createObjectURL(file);
          var arch = '<a href="' + fileURL + '" target = "_blank">Ver email</a>';



          arrL.push(id);
          arrL.push(email_to);
          arrL.push(name);
          arrL.push(subject);
          arrL.push(fecha);
          arrL.push(arch);

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
            { title: "email_to" },
            { title: "name" },
            { title: "subject" },
            { title: "fecha" },
            { title: "data" }

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