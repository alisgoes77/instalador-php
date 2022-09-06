var clicks = 0;
var bil = 0;
var totalrec = 0;
var totventa = 0;
var camb = 0;
var count = 0;
var ventaant = 0;
var idventa11 = 0;
var totalVenta = 0.0;
var ventaflag = 0;
var items = 0;
var promotions = "";

$(document).ready(function () {
 
  $("#reciboDinero").on("keyup", function () {
    var apagar = $("#totalPago").html();
    apagar = apagar.replace("$", "");
    apagar = parseFloat(apagar);
    var recibo = $("#reciboDinero").val();
    recibo = parseFloat(recibo);
    apagar = apagar.toFixed(2);
    recibo = recibo.toFixed(2);
    var cambio = recibo - apagar;
    cambio = cambio.toFixed(2);
    $("#recepcion").html(recibo);
    if (cambio < 0) {
      $("#cambio").html("$" + cambio);
      $("#cambio").css("background-color", "red");
    } else {
      $("#cambio").html("$" + cambio);
      $("#cambio").css("background-color", "green");
    }
  });

  $(document).on("click", "#cerrarModal", function () {
    $("#myModal").modal("toggle");
  });

  $(document).on("click", "#cerrarModal2", function () {
    $("#modalimpresiones").modal("toggle");
  });

  $(document).on("click", "#generarVenta", function () {
    totventa = $("#totalVenta").html();
    totventa = totventa.replace("$", "");
    var id = $("#idVenta").html();
    var total = $("#totalVenta").html();
    $("#ventaid").html(id);
    $("#totalPago").html(total);
    $("#vendedor").html("Vendedor: " + $("#nombre").html());
    $("#myModal").modal("toggle");
  });

  $(document).on("click", "#imprecibo", function () {
    $("#numrec").val($("#idVenta").html());
    document.getElementById("guardarcliente").style.display = "block";
    $("#modalimpresiones").modal("toggle");
    $.ajax({
      type: "POST",
      url: "../../db/consultas/clientes.php",
      error: function (resp) {
        console.log(resp);
      },
      success: function (data) {
        $("#clientesName").html(data);
      },
    });
  });

  $(document).on("input", "#nomcliente", function () {
    var val = this.value;
    if (
      $("#clientesName option").filter(function () {
        return this.value.toUpperCase() === val.toUpperCase();
      }).length
    ) {
      var anl1 = $('datalist option[value="' + val + '"]').attr("data");
      $("#emailcliente").val(anl1);
    }
  });

  $(document).on("click", "#guardarcliente", function () {
    var email = $("#emailcliente").val();
    var cliente = $("#nomcliente").val();
    var nombre = $("#nombre").html();
    $.ajax({
      method: "POST",
      type: "text",
      url: "../../db/consultas/guardarcliente.php",
      data: { email: email, cliente: cliente, nombre: nombre },
      success: function (data) {
        console.log(data);
        swal("Alerta", "Exito", "success");
      },
      error: function (resp) {
        swal("Alerta", resp, "warning");
        console.log(resp);
      },
    });
  });

  $(document).on("keyup", "#termTarje", function () {
    var met = $("#formaPago").val();
    if (met == 3) {
      $("#termTarje").hide();
    }
    if (met == 1) {
      met = "1|Tarjeta crédito";
    } else if (met == 2) {
      met = "2|Tarjeta débito";
    } else {
      met = "3|Efectivo";
    }
    $("#metodoPago").html(met + " " + $("#termTarje").val());
  });

  $(document).on("change", "#formaPago", function () {
    var met = $(this).val();
    if (met == 1) {
      met = "1|Tarjeta crédito";
      $("#calculadora").hide();
      $("#recepcion").html(" ");
      $("#cambio").html(" ");
    } else if (met == 2) {
      met = "2|Tarjeta débito";
      $("#calculadora").hide();
      $("#recepcion").html(" ");
      $("#cambio").html(" ");
    } else {
      met = "3|Efectivo";
      $("#calculadora").show();
    }
    $("#metodoPago").html(met);
  });

  $("#pdfrecibo").click(function () {
    var recimp = $("#numrec").val();
    if (recimp == "" || recimp == 0) {
      swal("Alerta", "Numero de recibo incorrecto", "warning");
    } else {
      var totalventa = $("#totalVenta").html();
      var todayDate = new Date().toISOString().slice(0, 10);
      var bigarray = [];
      var i = 0;
      $("#tablaRecibo tbody")
        .find("tr")
        .each(function (i, el) {
          var rowsArray = [];
          var $tds = $(this).find("td"),
            p1 = $tds.eq(1).text(),
            p2 = $tds.eq(2).text(),
            p3 = $tds.eq(3).text(),
            p4 = $tds.eq(4).text();
          p5 = $tds.eq(5).text();
          p6 = $tds.eq(6).text();
          p7 = $tds.eq(7).text();
          rowsArray.push(p1);
          rowsArray.push(p2);
          rowsArray.push(p3);
          rowsArray.push(p4);
          rowsArray.push(p5);
          rowsArray.push(p6);
          rowsArray.push(p7);
          bigarray.push(rowsArray);
        });
      $.ajax({
        method: "POST",
        type: "text",
        url: "../../db/fpdf/pdf.php",
        data: {
          recimp: recimp,
          bigarray: bigarray,
          totalventa: totalventa,
          todayDate: todayDate,
        },
        success: function (data) {
          window.open("../../db/recibos/Recibo" + recimp + ".pdf", "_blank");
        },
        error: function (resp) {
          console.log(resp);
        },
      });
    }
  });

  $("#imprimirRecibo").click(function () {
    printElem("prodCred", "tablaCuentas", "totalVentaRec");
  });

  $("#imprimirNota").click(function () {
    $("#imprimirRecibo").trigger("click");
  });

  $("#productoslist").on("input", function () {
    var val = this.value;
    if (
      $("#browsers option").filter(function () {
        return this.value.toUpperCase() === val.toUpperCase();
      }).length
    ) {
      var id = $('datalist option[value="' + val + '"]').attr("id");
      var data = $('datalist option[value="' + val + '"]').attr("data");
      var prov = $('datalist option[value="' + val + '"]').attr("prov");
      var existencia = $('datalist option[value="' + val + '"]').attr(
        "existencia"
      );
      var precio = $('datalist option[value="' + val + '"]').attr("precio");
      var provnombre = $('datalist option[value="' + val + '"]').attr(
        "provnombre"
      );
      var descripcion = $('datalist option[value="' + val + '"]').attr(
        "descripcion"
      );
      descripcion = descripcion.replace(" ", "");
      if (/\S/.test(descripcion)) {
        descripcion = descripcion;
      } else {
        descripcion = "Sin descripción en sistema";
      }
      $("#idProd").html(id);
      $("#nombreProd").html(val);
      $("#provName").html(prov);
      $("#stocProd").html(existencia);
      $("#precioUni").html(precio);
      $("#provNombre").html(provnombre);
      $("#descProd").html(descripcion);
      promotions = validateIfPromotion(id).then((data) => {
        if (data.status == "success") {
          var expireDate = new Date(data.resp.fechaVencimiento);
          var currentDate = new Date();
          if (currentDate <= expireDate ) { //TODAS LAS PROMOCIONES VENCEN A LAS 7 PM
            if (data.resp.tipoPromocion == "Descuento") {
              alert(
                "Producto cuenta con promoción de descuento del: " +
                  data.resp.descuento +
                  "%"
              );
              $("#porcentajeDesc").val(data.resp.descuento);
              setCookie("promotionType","Descuento", 1);
            }
            if (data.resp.tipoPromocion == "Producto") {
              alert(
                "Producto cuenta con promoción de producto\nCompra minima: " +
                  data.resp.minimoCompra +
                  "\nLleva gratis:" +
                  data.resp.cantidadGratis
              );
              $("#canti").val(data.resp.minimoCompra);
              setCookie("promotionProducts", data.resp.cantidadGratis, 1);
              setCookie("minimalBuy", data.resp.minimoCompra, 1);
              setCookie("promotionType","Producto", 1);
            }
          } else {
            alert("Promoción expirada");
          }
        }
      });

      var random = Math.floor(100000 + Math.random() * 900000);
      var ventaid = $("#idVenta").html();
      var maximoventa = existencia;
      if (maximoventa == " ") {
        alert("Falla en consulta, intente de nuevo");
      }
      if (ventaflag == 0) {
        $("#idVenta").html(random);
      } else {
        $("#idVenta").html(ventaid);
      }
      idventa11 = $("#idventa").html();
      $("input").attr({ max: existencia });
    }
  });

  $(".add-row").click(function () {
    var idProd = $("#idProd").html();
    var nombreProd = $("#nombreProd").html();
    var provName = $("#provNombre").html();
    var precioUni = $("#precioUni").html();
    var canti = $("#canti").val();
    var descripcion = $("#descProd").html();

    var stocProd = $("#stocProd").html();
    var descuento = $("#porcentajeDesc").val();
    descuento == "" ? (descuento = 0) : descuento;
    //calcular promocion
    var minimalBuy = getCookie("minimalBuy");
    var promotionProducts = getCookie("promotionProducts");
    var promotionType = getCookie("promotionType");
    if (minimalBuy != null && promotionProducts != null && promotionType == "Producto") {
      if (minimalBuy == canti) {
        canti = +canti + +promotionProducts;
      } else {
        var diffBuy = -canti - -minimalBuy;
        alert(
          "Comprando " +
            diffBuy +
            "mas obtienes :" +
            promotionProducts +
            " gratis"
        );
      }
    }

    canti = parseFloat(canti);
    canti = canti.toFixed(2);

    //calcular stock
    stocProd = parseFloat(stocProd);
    if (stocProd == 0) {
      alert("Sin stock");
    } else if (canti > stocProd) {
      alert("Sin stock suficiente ");
    } else {
      var newstock = stocProd - canti;
      $("#stocProd").html(newstock);

      var tot = canti * precioUni;
      var desc = (tot * descuento) / 100;
      var totreal = tot - desc;
      tot = parseFloat(tot);
      tot = tot.toFixed(2);
      var markup =
        "<tr>" +
        "<td style = ' text-align:center'>" +
        "<input type='checkbox' name='record'>" +
        "</td>" +
        "<td style = ' text-align:center'>" +
        idProd +
        "</td>" +
        "<td style = ' text-align:center'>" +
        nombreProd +
        "</td>" +
        "<td style = ' text-align:center'>" +
        descripcion +
        "</td>" +
        "<td style = ' text-align:center'>" +
        provName +
        "</td>" +
        "<td style = ' text-align:center'>" +
        precioUni +
        "</td>" +
        "<td style = ' text-align:center'>" +
        canti +
        "</td>" +
        "<td style = ' text-align:center'>" +
        descuento +
        "%</td>" +
        "<td style = ' text-align:center'>$" +
        totreal +
        "</td>" +
        "</tr>";
      $("table tbody").append(markup);
      tot = parseFloat(tot);
      tot = tot.toFixed(2);

      ventaflag = 1;
      totalVenta = +totalVenta + +totreal;
      var tt = totalVenta.toFixed(2);
      items++;
      $("#totalVenta").html("$" + tt);
    }
    deleteCookie("minimalBuy");
    deleteCookie("promotionProducts");
  });

  $(".delete-row").click(function () {
    $("table tbody")
      .find('input[name="record"]')
      .each(function () {
        if ($(this).is(":checked")) {
          var costo = $(this).parent().parent().find("td:eq(8)").text();
          costo = costo.replace("$", "");
          var tot = $("#totalVenta").html();
          tot = tot.replace("$", "");
          var ntotal = tot - costo;
          ntotal = parseFloat(ntotal);
          ntotal = ntotal.toFixed(2);
          totalVenta = totalVenta - costo;
          $("#totalVenta").html("$" + ntotal);
          $(this).parents("tr").remove();
          ventaflag = 1;
        }
      });
  });

  $("#limp").click(function () {
    $("#buscarcaja").val(" ");
    $("#idVenta").html(" ");
    $("#idProd").html(" ");
    $("#nombreProd").html(" ");
    $("#provName").html(" ");
    $("#stocProd").html(" ");
    $("#precioUni").html(" ");
    $("#canti").val(" ");
  });

  $("#enviaremail").on("click", function () {
    var email = $("#emailcliente").val();
    var nombre = $("#nomcliente").val();
    var totalventa = $("#totalVenta").html();
    var todayDate = new Date().toISOString().slice(0, 10);
    var bigarray = [];
    var totalVenta = $("#totalVenta").html();
    var i = 0;
    var plantilla = "d-d83636bd9728405eb54f3611f63bd9af";
    $("#tablaRecibo tbody")
      .find("tr")
      .each(function (i, el) {
        var rowsArray = [];
        var $tds = $(this).find("td"),
          p1 = $tds.eq(1).text(),
          p2 = $tds.eq(2).text(),
          p3 = $tds.eq(3).text(),
          p4 = $tds.eq(4).text();
        p5 = $tds.eq(5).text();
        p6 = $tds.eq(6).text();
        p7 = $tds.eq(7).text();
        p8 = $tds.eq(8).text();
        rowsArray.push(p1);
        rowsArray.push(p2);
        rowsArray.push(p3);
        rowsArray.push(p4);
        rowsArray.push(p5);
        rowsArray.push(p6);
        rowsArray.push(p7);
        rowsArray.push(p8);

        bigarray.push(rowsArray);
      });
    $.ajax({
      type: "POST",
      url: "../../db/email/src/email.php",
      dataType: "json",
      data: {
        nombre: nombre,
        totalventa: totalventa,
        todayDate: todayDate,
        bigarray: bigarray,
        email: email,
        totalVenta: totalVenta,
        plantilla: plantilla,
      },
      error: function (resp) {
        console.log(resp);
        //swal("Alerta", resp.message, resp.type);
      },
      success: function (data) {
        //console.log(data);
        swal("Alerta", data.message, data.type);
      },
    });
  });

  $("#nomcliente").on("keyup", function () {
    document.getElementById("guardarcliente").style.display = "block";
  });

  $("#key1").on("keyup", function () {
    var key = $(this).val();
    var validator = "caja";
    $.ajax({
      type: "POST",
      url: "../../db/consultas/getProductos.php",
      data: { key: key, validator: validator },
      error: function (resp) {
        console.log(resp);
      },
      success: function (data) {
        $("#browsers").html(data);
        //Escribimos las sugerencias que nos manda la consulta
        $("#sugerencias").fadeIn(1000).html(data);
        //Al hacer click en alguna de las sugerencias
        $(".suggest-element").on("click", function () {
          //Obtenemos la id unica de la sugerencia pulsada
          var id = $(this).attr("id");
          //Editamos el valor del input con data de la sugerencia pulsada
          $("#key1").val($("#" + id).attr("data") + "|" + id);
          //Hacemos desaparecer el resto de sugerencias
          $("#sugerencias").fadeOut(1000);
          var descripcion = $("#" + id).attr("descripcion");
          descripcion = descripcion.replace(" ", "");
          if (/\S/.test(descripcion)) {
            descripcion = $("#" + id).attr("descripcion");
          } else {
            descripcion = "Sin descripción en sistema";
          }
          $("#idProd").html($("#" + id).attr("id"));
          $("#nombreProd").html($("#" + id).attr("data"));
          $("#provName").html($("#" + id).attr("prov"));
          $("#stocProd").html($("#" + id).attr("existencia"));
          $("#precioUni").html($("#" + id).attr("precio"));
          $("#provNombre").html($("#" + id).attr("provnombre"));
          $("#descProd").html(descripcion);

          var random = Math.floor(100000 + Math.random() * 900000);
          var ventaid = $("#idVenta").html();
          var maximoventa = $("#" + id).attr("existencia");
          if (maximoventa == " ") {
            alert("Falla en consulta, intente de nuevo");
          }
          if (ventaflag == 0) {
            $("#idVenta").html(random);
          } else {
            $("#idVenta").html(ventaid);
          }
          idventa11 = $("#idventa").html();
          $("input").attr({ max: $("#" + id).attr("existencia") });
          return false;
        });
      },
    });
  });

  $("#cerrarVenta").on("click", function () {
    var ventaid = $("#idVenta").html();
    var totalPago = $("#totalVenta").html();
    var metodoPago = $("#metodoPago").html();
    var recepcion = $("#recepcion").html();
    var cambio = $("#cambio").html();
    var vendedor = $("#nombre").html();
    var formaPago = $("#formaPago").val();
    var tipoing = 1;
    var concepto = "Venta";
    idventa11 = ventaid;
    count = 1;
    if (count == 1 && ventaid != ventaant) {
      ventaant = ventaid;
      if (
        ventaid == "" ||
        totalPago == "" ||
        (metodoPago == "" && formaPago == 0)
      ) {
        swal("Alerta", "Ingrese un pago antes de continuar", "warning");
      } else {
        totalPago = totalPago.replace("$", "");
        recepcion = recepcion.replace("$", "");
        cambio = cambio.replace("$", "");
        vendedor = vendedor.replace("<br>", "");
        recepcion = parseInt(recepcion);
        cambio = parseInt(cambio);

        if (formaPago == 3) {
          if (cambio < 0) {
            swal("Alerta", "Pago incompleto", "warning");
          } else {
            $.ajax({
              type: "POST",
              url: "../../db/consultas/crearVenta.php",
              data: {
                ventaid: ventaid,
                totalPago: totalPago,
                metodoPago: metodoPago,
                recepcion: recepcion,
                cambio: cambio,
                vendedor: vendedor,
                tipoing: tipoing,
                concepto: concepto,
              },
              error: function (resp) {
                console.log(resp);
              },
              success: function (data) {
                var resp = data;
                if (resp != 2 || resp == "Venta registrada") {
                  var table = $("#tablaRecibo tbody");

                  table.find("tr").each(function (i) {
                    var $tds = $(this).find("td"),
                      idProd = $tds.eq(1).text(),
                      nombre = $tds.eq(2).text(),
                      prov = $tds.eq(3).text(),
                      pUni = $tds.eq(4).text(),
                      cant = $tds.eq(5).text(),
                      porcen = $tds.eq(6).text(),
                      total = $tds.eq(7).text();
                    porcen = porcen.replace("%", "");
                    total = total.replace("$", "");
                    if (porcen == "") {
                      porcen = 0.0;
                    }
                    $.ajax({
                      type: "POST",
                      url: "../../db/consultas/ventaDesglose.php",
                      data: {
                        ventaid: ventaid,
                        idProd: idProd,
                        nombre: nombre,
                        prov: prov,
                        pUni: pUni,
                        cant: cant,
                        porcen: porcen,
                        total: total,
                        vendedor: vendedor,
                      },
                      error: function (resp) {
                        console.log(resp);
                      },
                      success: function (data) {
                        swal("Alerta", data, "success");

                        ventaflag = 0;
                        totalVenta = 0.0;
                        totalrec = 0.0;
                        camb = 0.0;

                        $("#key1").html(" ");
                        $("#recibobody").empty();
                        $("#idVenta").html(" ");
                        $("#porcentajeDesc").val(" ");
                        $("#idProd").html(" ");
                        $("#nombreProd").html(" ");
                        $("#provName").html(" ");
                        $("#stocProd").html(" ");
                        $("#precioUni").html(" ");
                        $("#metodoPago").html(" ");
                        $("#recepcion").html(" ");
                        $("#cambio").html(" ");
                        $("#canti").val(" ");
                        $("#vendedor").html(" ");
                        $("#totalVenta").html(" ");
                        $("#formaPago").val("0").change();
                        $(".quin").html(" ");
                        $(".quinbill").html(" ");
                        $(".dosc").html(" ");
                        $(".dosbill").html(" ");
                        $(".cienc").html(" ");
                        $(".cienbill").html(" ");
                        $(".cincc").html(" ");
                        $(".cincbill").html(" ");
                        $(".veintc").html(" ");
                        $(".veintbill").html(" ");
                        $(".quinm").html(" ");
                        $(".quinbillm").html(" ");
                        $(".doscm").html(" ");
                        $(".dosbillm").html(" ");
                        $(".ciencm").html(" ");
                        $(".cienbillm").html(" ");
                        $(".cinccm").html(" ");
                        $(".cincbillm").html(" ");
                        $(".veintcm").html(" ");
                        $(".veintbillm").html(" ");
                        $("#ventaid").html(" ");
                        $("#totalPago").html(" ");
                        $("#vendedor").html(" ");
                        document.getElementById("cajarosa").click();
                      }, //success seg ajax
                    }); //ajax interno
                  }); //table each
                } else {
                  if (resp == 2) {
                    swal(
                      "Alerta",
                      "CAJA CERRADA, venta no realizada",
                      "warning"
                    );
                  } else if (resp != "Venta registrada") {
                    swal("Alerta", resp, "warning");
                  }
                }
              }, //success first ajax
            }); //ajax externo
          }
        } else {
          $.ajax({
            type: "POST",
            url: "../../db/consultas/crearVenta.php",
            data: {
              ventaid: ventaid,
              totalPago: totalPago,
              metodoPago: metodoPago,
              recepcion: recepcion,
              cambio: cambio,
              vendedor: vendedor,
              tipoing: tipoing,
              concepto: concepto,
            },
            error: function (resp) {
              console.log(resp);
            },
            success: function (data) {
              var resp = data;
              if (resp != 2 || resp == "Venta registrada") {
                var table = $("#tablaRecibo tbody");

                table.find("tr").each(function (i) {
                  var $tds = $(this).find("td"),
                    idProd = $tds.eq(1).text(),
                    nombre = $tds.eq(2).text(),
                    prov = $tds.eq(3).text(),
                    pUni = $tds.eq(4).text(),
                    cant = $tds.eq(5).text(),
                    porcen = $tds.eq(6).text(),
                    total = $tds.eq(7).text();
                  total = total.replace("$", "");
                  porcen = porcen.replace("%", "");
                  if (porcen == "") {
                    porcen = 0.0;
                  }
                  $.ajax({
                    type: "POST",
                    url: "../../db/consultas/ventaDesglose.php",
                    data: {
                      ventaid: ventaid,
                      idProd: idProd,
                      nombre: nombre,
                      prov: prov,
                      pUni: pUni,
                      cant: cant,
                      total: total,
                      vendedor: vendedor,
                      porcen: porcen,
                    },
                    error: function (resp) {
                      console.log(resp);
                    },
                    success: function (data) {
                      swal("Alerta", data, "success");

                      ventaflag = 0;
                      totalVenta = 0.0;
                      totalrec = 0.0;
                      camb = 0.0;
                      $("#porcentajeDesc").val(" ");
                      $("#key1").html(" ");
                      $("#recibobody").empty();
                      $("#idVenta").html(" ");
                      $("#idProd").html(" ");
                      $("#nombreProd").html(" ");
                      $("#provName").html(" ");
                      $("#stocProd").html(" ");
                      $("#precioUni").html(" ");
                      $("#metodoPago").html(" ");
                      $("#recepcion").html(" ");
                      $("#cambio").html(" ");
                      $("#canti").val(" ");
                      $("#vendedor").html(" ");
                      $("#totalVenta").html(" ");
                      $("#formaPago").val("0").change();
                      $(".quin").html(" ");
                      $(".quinbill").html(" ");
                      $(".dosc").html(" ");
                      $(".dosbill").html(" ");
                      $(".cienc").html(" ");
                      $(".cienbill").html(" ");
                      $(".cincc").html(" ");
                      $(".cincbill").html(" ");
                      $(".veintc").html(" ");
                      $(".veintbill").html(" ");
                      $(".quinm").html(" ");
                      $(".quinbillm").html(" ");
                      $(".doscm").html(" ");
                      $(".dosbillm").html(" ");
                      $(".ciencm").html(" ");
                      $(".cienbillm").html(" ");
                      $(".cinccm").html(" ");
                      $(".cincbillm").html(" ");
                      $(".veintcm").html(" ");
                      $(".veintbillm").html(" ");
                      $("#ventaid").html(" ");
                      $("#totalPago").html(" ");
                      $("#vendedor").html(" ");
                      document.getElementById("cajarosa").click();
                    }, //success seg ajax
                  }); //ajax interno
                }); //table each
              } else {
                if (resp == 2) {
                  swal("Alerta", "CAJA CERRADA, venta no realizada", "warning");
                } else if (resp != "Venta registrada") {
                  swal("Alerta", resp, "warning");
                }
              }
            }, //success first ajax
          }); //ajax externo
        } //else forma pago
      } //primer if
      count = 0;
    } else {
      // counter
      swal("Alerta", "Movimiento repetido con ID: " + ventaant, "warning");
    }
  });

  $("#close_account").on("click", function (e) {
    var buttons = $("<div>")
      .append(
        createButton("Ok", function () {
          swal.close();
        })
      )
      .append(
        createButton("Later", function () {
          swal.close();
        })
      )
      .append(
        createButton("Cancel", function () {
          swal.close();
        })
      );

    e.preventDefault();
    swal({
      title: "Are you sure?",
      content: buttons,
      icon: "warning",
      buttons: false,
      buttons: false,
    });
  });

  $("#loading").addClass("loader");
  $.ajax({
    type: "POST",
    url: "../../db/consultas/getProductos.php",
    data: { key: "-", validator: "caja" },
    error: function (resp) {
      console.log(resp);
    },
    success: function (data) {
      $("#loading").removeClass("loader");
      $("#browsers").html(data);
    },
  });
});

function createButton(text, cb) {
  return $("<button>" + text + "</button>").on("click", cb);
}
function printElem(divId, divId2, divId3) {
  $("#tablaRecibo tbody tr td").eq(0).hide();
  $("#tablaRecibo thead tr th").eq(0).hide();
  $("#tablaRecibo tbody tr td").eq(1).hide();
  $("#tablaRecibo thead tr th").eq(1).hide();
  $("#tablaRecibo tbody tr td").eq(3).hide();
  $("#tablaRecibo thead tr th").eq(3).hide();
  $("#tablaRecibo tbody tr td").eq(4).hide();
  $("#tablaRecibo thead tr th").eq(4).hide();
  var content = document.getElementById(divId).innerHTML;
  var content2 = document.getElementById(divId2).innerHTML;
  var content3 = document.getElementById(divId3).innerHTML;
  var mywindow = window.open("", "Print", "height=600,width=800");

  mywindow.document.write("<html><head><title>Print</title>");
  mywindow.document.write("</head><body >");
  mywindow.document.write(content + "<br>" + content2 + "<br>" + content3);
  mywindow.document.write("</body></html>");

  mywindow.document.close();
  mywindow.focus();
  mywindow.print();
  mywindow.close();
  $("#tablaRecibo tbody tr td").eq(0).show();
  $("#tablaRecibo thead tr th").eq(0).show();
  $("#tablaRecibo tbody tr td").eq(1).show();
  $("#tablaRecibo thead tr th").eq(1).show();
  $("#tablaRecibo tbody tr td").eq(3).show();
  $("#tablaRecibo thead tr th").eq(3).show();
  $("#tablaRecibo tbody tr td").eq(4).show();
  $("#tablaRecibo thead tr th").eq(4).show();
  return true;
}
async function validateIfPromotion(productId) {
  let result;
  try {
    result = await $.ajax({
      dataType: "json",
      type: "POST",
      url: "../../db/consultas/validateIfPromotion.php",
      data: { productId: productId },
      error: function (resp) {
        console.log(resp);
      },
      success: function (data) {
        promotions = data;
      },
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}
