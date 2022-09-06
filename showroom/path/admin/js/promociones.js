(function () {
  $.ajax({
    type: "POST",
    url: "../../db/consultas/getProductos.php",
    data: { key: "-", validator: "distinct" },
    error: function (resp) {
      console.log(resp);
    },
    success: function (data) {
      $("#loading").removeClass("loader");
      $("#browsers").html(data);
    },
  });

  load("../../db/consultas/crearPromocion.php", "", "POST", "get");

  document
    .getElementById("tipoPromocion")
    .addEventListener("change", function () {
      const x = document.getElementById("tipoPromocion").value;
      if (x == "Descuento") {
        //descuento
        document.getElementById("descuento").style.display = "block";
        document.getElementById("pGratis").style.display = "none";
        document.getElementById("porcentajeDescuento").value = 0;
      } else if (x == "Producto") {
        //producto gratis
        document.getElementById("descuento").style.display = "none";
        document.getElementById("pGratis").style.display = "block";
        document.getElementById("minimoCompra").value = 0;
        document.getElementById("cantidadGratis").value = 0;
      } else {
        document.getElementById("descuento").style.display = "none";
        document.getElementById("pGratis").style.display = "none";
      }
    });

  document
    .getElementById("guardarPromocionGratis")
    .addEventListener("click", function () {
      const formulario = document.getElementById("addNewPromotion");
      var data = new FormData(formulario);
      const formDataObj = {};
      data.forEach((value, key) => (formDataObj[key] = value));
      if (
        $("#browsers option").filter(function () {
          return this.value.toUpperCase() === formDataObj["producto"].toUpperCase();
        }).length
      ) {
        var nombreProducto = $('datalist option[value="' + formDataObj["producto"] + '"]').attr("id");
      }  
      formDataObj["productoNombre"] = nombreProducto;
      load(
        "../../db/consultas/crearPromocion.php",
        formDataObj,
        "POST",
        "insert"
      );
    });

  document
    .getElementById("guardarPromocionDescuento")
    .addEventListener("click", function () {
      const formulario = document.getElementById("addNewPromotion");
      var data = new FormData(formulario);
      const formDataObj = {};
      data.forEach((value, key) => (formDataObj[key] = value));
      if (
        $("#browsers option").filter(function () {
          return this.value.toUpperCase() === formDataObj["producto"].toUpperCase();
        }).length
      ) {
        var nombreProducto = $('datalist option[value="' + formDataObj["producto"] + '"]').attr("id");
      }  
      formDataObj["productoNombre"] = nombreProducto;
      load(
        "../../db/consultas/crearPromocion.php",
        formDataObj,
        "POST",
        "insert"
      );
      document.getElementById("descuento").style.display = "none";
      document.getElementById("pGratis").style.display = "none"; 
    });

    $('#promocionesTable').editable({
      mode: 'inline',
      container: 'body',
      selector: 'td.fechaVencimiento',
      url: '../../db/consultas/updatePromocion.php',
      title: 'fechaVencimiento',
      value: {
          action: 'update'
      },
      ajaxOptions: {
          type: 'post'
      },
      
      success: function (data) {
          console.log(data);
  
      },
      validate: function (value) {
        console.log(value);
          if ($.trim(value) == '') {
              return 'This field is required';
          }else{
           
          }
      }
  });

  function load(url, data, type, action) {
    $.ajax({
      type: type,
      url: url,
      dataType: "json",
      data: { data: data, action: action },
      success: function (res) {
        crearTabla(res.data);
        if (action == "insert") {
          swal("Alerta", "Success", "success");
        }
      },
      error: function (error) {
        swal("Alerta", "Error", "warning");
        console.log(error);
      },
    });
  }
  function crearTabla(dataTable) {
    if ($.fn.DataTable.isDataTable("#promocionesTable")) {
      $("#promocionesTable").DataTable().destroy();
    }

    $("#promocionesTable tbody").empty();

    $("#promocionesTable tfoot th").each(function () {
      var title = $(this).text();
      $(this).html('<input type="text" placeholder="Buscar ' + title + '" />');
    });

    var table = $("#promocionesTable").DataTable({
      dom: "Bfrtip",
      paging: true,
      scrollX: true,
      buttons: [
        { extend: "copyHtml5", footer: true },
        { extend: "excelHtml5", footer: true },
        { extend: "csvHtml5", footer: true },
        { extend: "pdfHtml5", footer: true },
        { extend: "print" },
      ],
      data: dataTable,
      order: [[0, "desc"]],
      autoWidth: false, 
      columns: [
        { title: "id",width: "15%" },
        { title: "producto",width: "20%" },
        { title: "productoNombre",width: "20%" },
        { title: "proveedorid",width: "20%" },
        { title: "proveedorNombre",width: "20%" },
        { title: "tipoPromocion",width: "20%" },
        { title: "descuento",width: "20%" },
        { title: "minimoCompra",width: "20%" },
        { title: "productoGratis",width: "20%" },
        { title: "vencimiento(Y-M-D)",width: "20%" },
      ],
      createdRow: function (row, data, rowIndex) {
        $.each($('td', row), function (colIndex) {
            if (colIndex == 9) {
                $(this).attr('data-name', 'fechaVencimiento');
                $(this).attr('class', 'fechaVencimiento');
                $(this).attr('data-type', 'text');
                $(this).attr('data-pk', data[0]);
                $(this).attr('data-action', 'update');
                $(this).attr('data-value', data[9]);
            };
        });
    }
    
    });
    table.columns().every(function () {
      var that = this;

      $("input", this.footer()).on("keyup change clear", function () {
        if (that.search() !== this.value) {
          that.search(this.value).draw();
        }
      });
    });
  } 
})();
