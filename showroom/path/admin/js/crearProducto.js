var xcount = 0;
$(document).ready(function () {
  document.getElementById("cons").click();

  $(document).on("click", "#revisar", function () {
    document.getElementById("ingresar").style.display = "block";
    var nombre = $("#pName").val();
    var desc = $("#pDesc").val();
    var fecha = $("#pfex").val();
    var prove = $("#pProv").val();
    var cantpresvent = $("#cantPres").val();
    var cantpresing = $("#totalIng").val();
    var ident = $("#iident").val();
    var precio = $("#precioUni").val();
    var provetext = $("#pProv option:selected").text();
    var presventte = $("#pPvent option:selected").text();
    var presventin = $("#pPing option:selected").text();

    $("#ida").html(ident);
    $("#nom").html(nombre);
    $("#desc").html(desc);
    $("#fec").html(fecha);
    $("#pro").html(provetext + "|" + prove);
    $("#presv").html(presventte);
    $("#presi").html(presventin);
    $("#cpresv").html(cantpresvent);
    $("#cpresi").html(cantpresing);
    $("#preciov").html(precio);
    $("#myModal").modal("toggle");
  });

  $(document).one("click", "#closeMododal", function () {
    $("#myModal").modal("toggle");
  });

  $(document).one("click", "#btnPrint", function () {
    printElem("prodCred");
  });

  $(document).one("click", "#ingresar", function () {
    var nombre = $("#pName").val();
    var descri = $("#pDesc").val();
    var fecha = $("#pfex").val();
    var provee = $("#pProv").val();
    var ident = $("#iident").val();
    var usuario = $("#nombre").html();
    var precio = $("#precioUni").val();
    var cantini = $("#cantInicial").val();
    if (cantini == "") {
      cantini = 0;
    }
    $.ajax({
      url: "../../db/consultas/crearProducto.php",
      dataType: "text",
      type: "post",
      data: {
        cantini: cantini,
        nombre: nombre,
        descri: descri,
        fecha: fecha,
        provee: provee,
        ident: ident,
        usuario: usuario,
        precio: precio,
      },
      async: true,
      beforeSend: function () {},
      complete: function () {},
      error: function (resp) {
        console.log(resp);
      },
      success: function (resp) {
        swal("Alerta", resp, "success");
        document.getElementById("producto").click();
      },
    });
  });

  $(document).one("click", "#updtProd", function () {
    var nombre = $("#pName").val();
    var descri = $("#pDesc").val();
    var fecha = $("#pfex").val();
    var provee = $("#pProv").val();

    var ident = $("#iident").val();
    var usuario = $("#nombre").html();
    var precio = $("#precioUni").val();
    var cantIni = $("#cantInicial").val();
    if (ident == "") {
      swal(
        "Alerta",
        "Click en CONSULTA y seleccione un producto para actualizar",
        "warning"
      );
    } else {
      $.ajax({
        url: "../../db/consultas/updtProd.php",
        dataType: "text",
        type: "post",
        data: {
          nombre: nombre,
          descri: descri,
          fecha: fecha,
          provee: provee,
          ident: ident,
          usuario: usuario,
          precio: precio,
          cantIni: cantIni,
        },
        async: true,
        beforeSend: function () {},
        complete: function () {},
        error: function (resp) {
          console.log(resp);
        },
        success: function (resp) {
          document.getElementById("producto").click();
          document.getElementById("cons").click();
          swal("Alerta", resp, "success");
        },
      });
    }
  });

  $(document).on("click", "#generatePdf", function () {
    var size = $("#sizeCode").val();
    size = parseInt(size);
    SVGToImage({
      svg: $("#codebarproduct").get(0),
      mimetype: "image/png",
      width: 500,
      quality: 1,
    })
      .then(function (base64image) {
        var doc = new jsPDF();
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        var countWidth = width / size;
        var countHeight = height / size;
        for (var i = 0; i < size; i++) {
          for (var j = 0; j < size; j++) {
            doc.addImage(
              base64image,
              "PNG",
              j * countWidth,
              i * countHeight,
              countWidth,
              countHeight
            );
          }
        }
        doc.save("codigoProducto" + $("#pName").val() + ".pdf");
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  $(document).on("click", "#obtainCode", function () {
    var $row = $(this).closest("tr"); // Finds the closest row <tr>
    var prodCode = $row.find("td:nth-child(1)").text()
    JsBarcode("#codebarproduct", prodCode);
  });

  $(document).on("click", "#iident", function () {
    var random = Math.floor(100000 + Math.random() * 900000);
    var stringcode = random.toString();
    $("#iident").val(random);
    JsBarcode("#codebarproduct", stringcode);
  });

  $(document).on("click", "#cons", function () {
    $("#updtProd").css("display", "block");
    $.ajax({
      url: "../../db/consultas/consultaProds.php",
      dataType: "json",
      type: "post",
      data: {},
      async: false,
      beforeSend: function () {},
      complete: function () {},
      error: function (resp) {
        console.log(resp);
      },
      success: function (resp) {
        console.log(resp);
        var arrM = [];
        if (resp.resp[0].message == "nothing found") {
          console.log(resp.resp[0].consulta);
          swal("Alerta", "No hay productos dados de alta", "warning");
        } else {
          var tr = document.getElementById("poliza");
          for (i = 0; i < resp.resp.length; i++) {
            var arrL = [];
            var ident = resp.resp[i]["ident"];
            var nombre = resp.resp[i]["nombre"];
            var descripcion = resp.resp[i]["descripcion"];
            var fecha = resp.resp[i]["fecha"];
            var usuario = resp.resp[i]["usuario"];
            var precio = resp.resp[i]["precio"];
            var provee = resp.resp[i]["provee"];
            var button =
              '<input type = "button" class = "btn btn-danger" id = "selectLine" value = "Seleccionar">';
            var qr =
              '<input type = "button" class = "btn btn-default" id = "obtainCode" value = "Generar QR">';

            arrL.push(ident);
            arrL.push(nombre);
            arrL.push(descripcion);
            arrL.push(fecha);
            arrL.push(provee);

            arrL.push(precio);
            arrL.push(usuario);
            arrL.push(button);
            arrL.push(qr);
            arrM.push(arrL);
          }

          if ($.fn.DataTable.isDataTable("#prodsTable")) {
            $("#prodsTable").DataTable().destroy();
          }

          $("#prodsTable tbody").empty();
          // Setup - add a text input to each footer cell
          $("#prodsTable tfoot th").each(function () {
            var title = $(this).text();
            $(this).html(
              '<input type="text" placeholder="Buscar ' + title + '" />'
            );
          });

          var table = $("#prodsTable").DataTable({
            dom: "Bfrtip",
            paging: true,
            buttons: [
              { extend: "copyHtml5", footer: true },
              { extend: "excelHtml5", footer: true },
              { extend: "csvHtml5", footer: true },
              { extend: "pdfHtml5", footer: true },
              { extend: "print" },
            ],
            data: arrM,
            columns: [
              { title: "ident" },
              { title: "nombre" },
              { title: "descripcion" },
              { title: "fecha" },
              { title: "ID proveedor" },

              { title: "Precio" },
              { title: "Creado por" },
              { title: "Acción" },
              { title: "QR" },
            ],
          });
          table.columns().every(function () {
            var that = this;

            $("input", this.footer()).on("keyup change", function () {
              console.log(this.value);
              if (that.search() !== this.value) {
                //alert("busqueda");
                that.search(this.value).draw();
              }
            });
          });
        }
      },
    });
  });

  $(document).on("click", "#selectLine", function () {
    var $row = $(this).closest("tr"), // Finds the closest row <tr>
      $ident = $row.find("td:nth-child(1)"); // Finds the 2nd <td> element

    var prove = $row.find("td:nth-child(5)").text();
    prove = prove.trim();

    $("#iident").val($row.find("td:nth-child(1)").text());
    $("#pName").val($row.find("td:nth-child(2)").text());
    $("#pDesc").val($row.find("td:nth-child(3)").text());
    $("#pfex").val($row.find("td:nth-child(4)").text());
    $('#pProv option[attr="' + prove + '"]').prop("selected", true);
    $("#precioUni").val($row.find("td:nth-child(6)").text());
    $("#precioUni").prop("readonly", false);
    $("#cantInicial").prop("readonly", true);
    $("#ingresar").css("display", "none");
  });

  $(document).one("click", "#delProd", function () {
    var ident = $("#iident").val();

    if (ident == "") {
      swal(
        "Alerta",
        "Click en CONSULTA y seleccione un producto para BORRAR",
        "warning"
      );
    } else {
      if (confirm("Por favor confirme borrado de producto " + ident)) {
        $.ajax({
          url: "../../db/consultas/borrarProd.php",
          dataType: "text",
          type: "post",
          data: { ident: ident },
          async: false,
          beforeSend: function () {},
          complete: function () {},
          error: function (resp) {
            console.log(resp);
          },
          success: function (resp) {
            swal("Alerta", resp, "warning");
            document.getElementById("cons").click();
            document.getElementById("producto").click();
          },
        });
      }
    }
  });

  $(document).one("click", "#loadProvs", function () {
    var cad = "";
    $.ajax({
      url: "../../db/consultas/getProveedores.php",
      dataType: "text",
      type: "post",
      data: {},
      async: false,
      beforeSend: function () {},
      complete: function () {},
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

          cad =
            cad +
            '<option value ="' +
            uniq[0] +
            '" attr = "' +
            uniq[1] +
            '">' +
            uniq[1] +
            "|" +
            uniq[0] +
            "</option>";
        }
        $("#pProv").html(cad);
      },
    });
  });

  $(document).on("click", "#upload", function () {
    var employee_file = $("#employee_file").prop("files")[0];
    var form_data = new FormData();
    form_data.append("file", employee_file);
    if (xcount == 0) {
      $.ajax({
        url: "../../db/consultas/subirproductoscsv.php",
        method: "POST",
        data: form_data,
        contentType: false, // The content type used when sending data to the server.
        cache: false, // To unable request pages to be cached
        processData: false, // To send DOMDocument or non processed data file it is set to false
        async: false,
        success: function (data) {
          swal("Alerta", data, "success");
          xcount = 1;
        },
      });
    } else {
      console.log("REP");
    }
  });

  $(document).one("change", "#employee_file", function () {
    var fileExtension = ["csv"];
    if (
      $.inArray($(this).val().split(".").pop().toLowerCase(), fileExtension) ==
      -1
    ) {
      swal(
        "Alerta",
        "Formatos aceptados : " + fileExtension.join(", "),
        "warning"
      );
    }
  });
});
