var precio = 0;
$(document).one("click", "#cargarProveedores", function () {
    var cad = "";
    $("#cargarProveedores").hide();
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

                cad = cad + '<option value ="' + uniq[0] + '" attr = "' + uniq[1] + '">' + uniq[1] + '|' + uniq[0] + '</option>';


            }
            $("#proveedoresProductos").html(cad);
        }
    })

});

$(document).on("change", "#reporteTipo", function () {

    var ident = $(this).val();

    if (ident == 1) {
        $("#tablaReportes1").show();
        $("#tablaReportes2").hide();
        $("#tablaReportes3").hide();
        $("#tablaReportes4").hide();
        $("#tablaReportes5").hide();
        $("#tablaReportes6").hide();
        $("#tablaReportes7").hide();
        $("#fecUni").show();
        $("#fecdos").show();
    } else if (ident == 2) {
        $("#tablaReportes1").hide();
        $("#tablaReportes2").show();
        $("#tablaReportes3").hide();
        $("#tablaReportes4").hide();
        $("#tablaReportes5").hide();
        $("#tablaReportes6").hide();
        $("#tablaReportes7").hide();
        $("#fecUni").hide();
        $("#fecdos").hide();

    } else if (ident == 3) {
        $("#tablaReportes1").hide();
        $("#tablaReportes2").hide();
        $("#tablaReportes3").show();
        $("#tablaReportes4").hide();
        $("#tablaReportes5").hide();
        $("#tablaReportes6").hide();
        $("#tablaReportes7").hide();
        $("#fecUni").hide();
        $("#fecdos").hide();

    } else if (ident == 4) {
        $("#tablaReportes1").hide();
        $("#tablaReportes2").hide();
        $("#tablaReportes3").hide();
        $("#tablaReportes4").hide();
        $("#tablaReportes5").show();
        $("#tablaReportes6").hide();
        $("#tablaReportes7").hide();
        $("#fecUni").hide();
        $("#fecdos").show();

    } else if (ident == 5) {
        $("#tablaReportes1").hide();
        $("#tablaReportes2").hide();
        $("#tablaReportes3").hide();
        $("#tablaReportes4").hide();
        $("#tablaReportes5").show();
        $("#tablaReportes6").hide();
        $("#tablaReportes7").hide();
        $("#fecUni").hide();
        $("#fecdos").show();

    } else if (ident == 6) {
        $("#tablaReportes1").hide();
        $("#tablaReportes2").hide();
        $("#tablaReportes3").hide();
        $("#tablaReportes4").hide();
        $("#tablaReportes5").hide();
        $("#tablaReportes6").show();
        $("#tablaReportes7").hide();
        $("#fecUni").hide();
        $("#fecdos").show();

    } else {
        $("#tablaReportes1").hide();
        $("#tablaReportes2").hide();
        $("#tablaReportes3").hide();
        $("#tablaReportes4").hide();
        $("#tablaReportes5").hide();
        $("#tablaReportes6").hide();
        $("#tablaReportes7").show();
        $("#fecUni").hide();
        $("#fecdos").show();
        $("#fechaini").hide();
        $("#fechafin").hide();
        $("#fechaLabel1").hide();
        $("#fechaLabel2").hide();


    }



});

$(document).on("click", "#generarRep1", function () {

    var reptip = $("#reporteTipo").val();
    var user = $("#puesto").html();
    var provid = $("#nombre").html();
    var fecha = $("#fechaEsp").val();
    var fecha1 = $("#fechaini").val();
    var fecha2 = $("#fechafin").val();
    var fechagen = "";
    if (fecha1 == "" || fecha2 == "") {
        fecha1 = "-";
        fecha2 = "-";
        fechagen = fecha;
    }
    if (fecha == "") {
        fecha = "-";
        fechagen = fecha1 + " al " + fecha2;
    }
    if (reptip == 1) {


        $.ajax({
            url: "../../db/consultas/reporteCaja.php",
            dataType: "json",
            type: "post",
            data: { user: user, provid: provid, fecha: fecha, fecha1: fecha1, fecha2: fecha2 },
            async: true,
            beforeSend: function () {
            },
            complete: function (resp) {
                console.log(resp);
            },
            error: function (resp) {
                console.log(resp);

            },
            success: function (resp) {
                var descs = 0;
                var arrM = [];
                if (resp.resp[0].message == 'nothing found') {
                    console.log(resp.resp[0].consulta);
                    swal("Alerta", "No hay movimientos", "warning");
                    if ($.fn.DataTable.isDataTable('#reportesTable1')) {
                        $('#reportesTable1').DataTable().destroy();
                    }

                    $('#reportesTable1 tbody').empty();
                } else {

                    for (i = 0; i < resp.resp.length; i++) {
                        var arrL = [];
                        var pru = resp.resp;
                        var id = resp.resp[i]["id"];
                        var idventa = resp.resp[i]["idventa"];
                        var fecha = resp.resp[i]["fecha"];
                        var idProd = resp.resp[i]["idProd"];
                        var fecha = resp.resp[i]["fecha"];
                        var nombre = resp.resp[i]["nombre"];
                        var proveedor = resp.resp[i]["provname"];
                        var pUni = resp.resp[i]["pUni"];
                        var cant = resp.resp[i]["cant"];
                        var total = resp.resp[i]["total"];
                        var vendedor = resp.resp[i]["vendedor"];
                        var ie = resp.resp[i]["ie"];
                        var descuento = resp.resp[i]["descuento"];
                        var concepto = resp.resp[i]["concepto"];
                        var metodo = resp.resp[i]["metodo"];
                        var hora = resp.resp[i]["hora"];
                        var elim = "<button class = 'btn btn-danger' id = 'eliminarVenta'>Eliminar</button>"
                        var desco = 0;

                        if (descuento > 0) {
                            descs = +descs + +descuento;
                            desco = descuento;
                        } else {
                            desco = 0;
                        }

                        if (ie == 1) {
                            ie = "Ingreso";
                        } else {
                            ie = "Egreso";
                        }
                        arrL.push(id);
                        arrL.push(idventa);
                        arrL.push(fecha);
                        arrL.push(idProd);
                        arrL.push(nombre);
                        arrL.push(proveedor);
                        arrL.push(pUni);
                        arrL.push(cant);
                        arrL.push(total);
                        arrL.push(vendedor);
                        arrL.push(ie);
                        arrL.push(concepto);
                        arrL.push(metodo);
                        arrL.push(desco);
                        arrL.push(hora);
                        arrL.push(elim);
                        arrM.push(arrL);




                    }
                    if (descs > 0) {
                        $("#descuentos").html("$" + descs);
                    }


                    if ($.fn.DataTable.isDataTable('#reportesTable1')) {
                        $('#reportesTable1').DataTable().destroy();
                    }

                    $('#reportesTable1 tbody').empty();
                    $('#reportesTable1 tfoot th').each(function () {
                        var title = $(this).text();
                        $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                    });
                    var head = $("#resCaja").html();
                    var table = $('#reportesTable1').DataTable({
                        "autoWidth": false,
                        dom: 'Bfrtip',
                        "paging": false,
                        buttons: [
                            { extend: 'copyHtml5', footer: true },
                            { extend: 'excelHtml5', footer: true },
                            { extend: 'csvHtml5', footer: true },
                            { extend: 'pdfHtml5', footer: true },
                            {
                                extend: 'print',
                                customize: function (win) {
                                    $(win.document.body)
                                        .css('font-size', '10pt')
                                        .append(
                                            head
                                        );

                                    $(win.document.body).find('table')
                                        .addClass('compact')
                                        .css('font-size', 'inherit');
                                }
                            }
                        ],
                        data: arrM,
                        columns: [
                            { title: "Id" },
                            { title: "Venta ID" },
                            { title: "Fecha" },
                            { title: "Prod id" },
                            { title: "Nombre" },
                            { title: "Prov ID" },
                            { title: "P uni" },
                            { title: "Cant" },
                            { title: "Total" },
                            { title: "Vendedor" },
                            { title: "Ing|Egre" },
                            { title: "Concepto" },
                            { title: "Metodo" },
                            { title: "Descuento" },
                            { title: "Hora" },
                            { title: "Acción" }

                        ],

                        "footerCallback": function (row, data, start, end, display) {
                            var api = this.api(), data;

                            // Remove the formatting to get integer data for summation
                            var intVal = function (i) {
                                return typeof i === 'string' ?
                                    i.replace(/[\$,]/g, '') * 1 :
                                    typeof i === 'number' ?
                                        i : 0;
                            };

                            // Total over all pages
                            total = api
                                .column(8, { "filter": "applied" })
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);

                            // Total over this page
                            pageTotal = api
                                .column(8, { page: 'current' })
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);

                            var formatted = $.fn.dataTable.render.number(",", ".", 0, "$").display(total);
                            $(api.column(8).footer()).html(
                                formatted
                            );
                            // Total over all pages
                            total = api
                                .column(13, { "filter": "applied" })
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);

                            // Total over this page
                            pageTotal = api
                                .column(13, { page: 'current' })
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);

                            var formatted = $.fn.dataTable.render.number(",", ".", 0, "$").display(total);
                            $(api.column(13).footer()).html(
                                formatted
                            );
                        }

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
        });//first ajax


    } else if (reptip == 2) {//first if

        $.ajax({
            url: "../../db/consultas/consultaProds.php",
            dataType: "json",
            type: "post",
            data: { user: user, provid: provid },
            async: true,
            beforeSend: function () {
            },
            complete: function (resp) {
                //console.log(resp); 
            },
            error: function (resp) {
                console.log(resp);

            },
            success: function (resp) {
                var arrM = [];
                if (resp.resp[0].message == 'nothing found') {
                    console.log(resp.resp[0].consulta);
                    swal("Alerta", "No hay productos dados de alta", "warning");
                } else {
                    var tr = document.getElementById("poliza");


                    for (i = 0; i < resp.resp.length; i++) {
                        var arrL = [];
                        var pru = resp.resp;

                        var ident = resp.resp[i]["ident"];
                        var nombre = resp.resp[i]["nombre"];
                        var descripcion = resp.resp[i]["descripcion"];
                        var fecha = resp.resp[i]["fecha"];
                        var proveedorid = resp.resp[i]["proveedorid"];

                        var usuario = resp.resp[i]["usuario"];
                        var provee = resp.resp[i]["provee"];
                        var precio = resp.resp[i]["precio"];

                        arrL.push(ident);
                        arrL.push(nombre);
                        arrL.push(descripcion);
                        arrL.push(fecha);
                        arrL.push(provee);

                        arrL.push(precio);
                        arrL.push(usuario);

                        arrM.push(arrL);




                    }

                    if ($.fn.DataTable.isDataTable('#prodsTable')) {
                        $('#prodsTable').DataTable().destroy();
                    }

                    $('#prodsTable tbody').empty();
                    $('#prodsTable tfoot th').each(function () {
                        var title = $(this).text();
                        $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                    });

                    var table = $('#prodsTable').DataTable({
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
                            { title: "ID Prod" },
                            { title: "Nombre" },
                            { title: "Desc" },
                            { title: "Fecha creado" },
                            { title: "ID Prov" },

                            { title: "Precio" },
                            { title: "Creado por" }

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
        });//segundo ajax

    } else if (reptip == 3) {
        $.ajax({
            url: "../../db/consultas/getInventario.php",
            dataType: "json",
            type: "post",
            data: { user: user, provid: provid },
            async: true,
            beforeSend: function () {
            },
            complete: function () {

            },
            error: function (resp) {
                console.log(resp);

            },
            success: function (resp) {
                document.getElementById("updtProds").style.display = "block";

                var arrM = [];
                if (resp.resp[0].message == 'nothing found') {
                    swal("Alerta", "No hay movimientos", "warning");
                } else {

                    for (i = 0; i < resp.resp.length; i++) {
                        var arrL = [];
                        var pru = resp.resp;

                        var ident = resp.resp[i]["ident"];
                        var existencia = resp.resp[i]["existencia"];
                        var importe = resp.resp[i]["importe"];
                        var provee = resp.resp[i]["provee"];
                        var producto = resp.resp[i]["producto"];
                        var proveedor = resp.resp[i]["proveedor"];
                        var precio = resp.resp[i]["precio"];
                        var button = '<input type = "button" class = "btn btn-danger" id = "selectLine" value = "Seleccionar">';

                        arrL.push(ident);
                        arrL.push(existencia);
                        arrL.push(importe);
                        arrL.push(provee);
                        arrL.push(producto);
                        arrL.push(proveedor);
                        arrL.push(precio);
                        arrL.push(button);

                        arrM.push(arrL);




                    }

                    if ($.fn.DataTable.isDataTable('#inventario')) {
                        $('#inventario').DataTable().destroy();
                    }

                    $('#inventario tbody').empty();
                    $('#inventario tfoot th').each(function () {
                        var title = $(this).text();
                        $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                    });

                    var table = $('#inventario').DataTable({
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
                            { title: "Producto ID" },
                            { title: "Existencia" },
                            { title: "Total" },
                            { title: "Proveedor ID" },
                            { title: "Producto" },
                            { title: "Proveedor" },
                            { title: "Precio" },
                            { title: "Acción" }

                        ],
                        "footerCallback": function (row, data, start, end, display) {
                            var api = this.api(), data;

                            // Remove the formatting to get integer data for summation
                            var intVal = function (i) {
                                return typeof i === 'string' ?
                                    i.replace(/[\$,]/g, '') * 1 :
                                    typeof i === 'number' ?
                                        i : 0;
                            };

                            // Total over all pages
                            total = api
                                .column(2, { "filter": "applied" })
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);

                            // Total over this page
                            pageTotal = api
                                .column(2, { page: 'current' })
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);

                            var formatted = $.fn.dataTable.render.number(",", ".", 0, "$").display(total);


                            $(api.column(2).footer()).html(
                                // '$'+ total +' total'
                                formatted
                            );

                        }

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
        });//first ajax


    } else if (reptip == 4) {
        $.ajax({
            url: "../../db/consultas/consultaIngre.php",
            dataType: "json",
            type: "post",
            data: { user: user, provid: provid, fecha: fecha, fecha1: fecha1, fecha2: fecha2 },
            async: true,
            beforeSend: function () {
            },
            error: function (resp) {
                console.log(resp);

            },
            success: function (resp) {


                var arrM = [];
                if (resp.resp[0].message == 'nothing found') {
                    swal("Alerta", "No hay entradas registradas en el periodo seleccionado", "warning");
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

                        arrL.push(id);
                        arrL.push(prodid);
                        arrL.push(prodnombre);
                        arrL.push(provid);
                        arrL.push(ingreal);
                        arrL.push(fecha);
                        arrL.push(usuario);
                        arrL.push(nombre);


                        arrM.push(arrL);

                    }

                    if ($.fn.DataTable.isDataTable('#entradasInv')) {
                        $('#entradasInv').DataTable().destroy();
                    }

                    $('#entradasInv tbody').empty();
                    $('#entradasInv tfoot th').each(function () {
                        var title = $(this).text();
                        $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                    });


                    var table = $('#entradasInv').DataTable({
                        dom: 'Bfrtip',
                        "paging": false,
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
                            { title: "Ingreso" },
                            { title: "Fecha ingreso" },
                            { title: "Ing por" },
                            { title: "Nombre prov" }

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
        });//first ajax


    } else if (reptip == 5) {
        if (fecha1 == "-" || fecha2 == "-") {
            swal("Alerta", "Selecciona una fecha primero", "warning");
        }
        $.ajax({
            url: "../../db/consultas/cajacondensado.php",
            dataType: "json",
            type: "post",
            data: { user: user, fecha: fecha, fecha1: fecha1, fecha2: fecha2 },
            async: true,
            beforeSend: function () {
            },
            error: function (resp) {
                console.log(resp);

            },
            success: function (resp) {
                var descs = 0;
                var arrM = [];
                if (resp.resp[0].message == 'nothing found') {
                    swal("Alerta", "No hay movimientos", "warning");
                } else {
                    var lt1 = resp.resp.length;


                    for (i = 0; i < lt1; i++) {
                        var arrL = [];
                        var pru = resp.resp;


                        var ident = (resp.resp[i]["ident"] != undefined) ? resp.resp[i]["ident"] : ".";
                        var nombre = (resp.resp[i]["nombre"] != undefined) ? resp.resp[i]["nombre"] : ".";
                        var ventas = (resp.resp[i]["ventas"] != undefined) ? resp.resp[i]["ventas"] : ".";
                        var pagos = (resp.resp[i]["pagos"] != undefined) ? resp.resp[i]["pagos"] : ".";
                        var descuentos = (resp.resp[i]["descuentos"] != undefined) ? resp.resp[i]["descuentos"] : ".";
                        descuentos = parseFloat(descuentos);
                        descuentos = descuentos.toFixed(2);
                        var button = '<button type="button" class="btn btn-primary" id="myBtn">Ventas</button><button type="button" class="btn btn-success" id="myBtnVentas">Pagos</button>';

                        if (ventas == 0 && pagos == 0) {
                            continue;
                        } else {
                            arrL.push(ident);
                            arrL.push(nombre);
                            arrL.push(fecha1 + " al " + fecha2);
                            arrL.push(ventas);
                            arrL.push(pagos);
                            arrL.push(descuentos);
                            arrL.push(button);
                            arrM.push(arrL);
                        }
                    }

                    if ($.fn.DataTable.isDataTable('#reportecajanodesglose')) {
                        $('#reportecajanodesglose').DataTable().destroy();
                    }

                    $('#reportecajanodesglose tbody').empty();
                    $('#reportecajanodesglose tfoot th').each(function () {
                        var title = $(this).text();
                        $(this).html('<input type="text" placeholder="Buscar ' + title + '" />');
                    });
                    var head = $("#resCaja").html();
                    var table = $('#reportecajanodesglose').DataTable({
                        "autoWidth": false,
                        dom: 'Bfrtip',
                        "paging": false,
                        buttons: [
                            { extend: 'copyHtml5', footer: true },
                            { extend: 'excelHtml5', footer: true },
                            { extend: 'csvHtml5', footer: true },
                            { extend: 'pdfHtml5', footer: true },
                            {
                                extend: 'print',
                                customize: function (win) {
                                    $(win.document.body)
                                        .css('font-size', '10pt')
                                        .append(
                                            head
                                        );

                                    $(win.document.body).find('table')
                                        .addClass('compact')
                                        .css('font-size', 'inherit');
                                }
                            }
                        ],
                        data: arrM,
                        columns: [
                            { title: "#Proveedor" },
                            { title: "Nombre prov" },
                            { title: "Fecha" },
                            { title: "Ventas" },
                            { title: "Pagos" },
                            { title: "Descuentos" },
                            { title: "Revisar" }

                        ],
                        "footerCallback": function (row, data, start, end, display) {
                            var api = this.api(), data;

                            // Remove the formatting to get integer data for summation
                            var intVal = function (i) {
                                return typeof i === 'string' ?
                                    i.replace(/[\$,]/g, '') * 1 :
                                    typeof i === 'number' ?
                                        i : 0;
                            };

                            // Total over all pages
                            total = api
                                .column(3, { "filter": "applied" })
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);

                            // Total over this page
                            pageTotal = api
                                .column(3, { page: 'current' })
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);

                            var formatted = $.fn.dataTable.render.number(",", ".", 0, "$").display(total);
                            $(api.column(3).footer()).html(
                                formatted
                            );
                            // Total over all pages
                            total = api
                                .column(4, { "filter": "applied" })
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);

                            // Total over this page
                            pageTotal = api
                                .column(4, { page: 'current' })
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);

                            var formatted = $.fn.dataTable.render.number(",", ".", 0, "$").display(total);
                            $(api.column(4).footer()).html(
                                formatted
                            );
                            // Total over all pages
                            total = api
                                .column(5, { "filter": "applied" })
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);

                            // Total over this page
                            pageTotal = api
                                .column(5, { page: 'current' })
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);

                            var formatted = $.fn.dataTable.render.number(",", ".", 0, "$").display(total);
                            $(api.column(5).footer()).html(
                                formatted
                            );
                        }

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
        });//first ajax


    } else if (reptip == 7) {
        var provid = $("#proveedoresProductos").val();
        if (provid == null) {
            swal("Alerta", "Escoja un proveedor primero", "warning");
        } else {

            $("#marcaelegida").text($("#proveedoresProductos option:selected").text());
            $.ajax({
                url: "../../db/consultas/getProdsxMarca.php",
                dataType: "json",
                type: "post",
                data: { provid: provid },
                async: true,
                beforeSend: function () {
                },
                complete: function (resp) {
                    //console.log(resp); 
                },
                error: function (resp) {
                    console.log(resp);

                },
                success: function (resp) {
                    var arrM = [];
                    if (resp.resp[0].message == 'nothing found') {
                        console.log(resp.resp[0].consulta);
                        swal("Alerta", "No hay productos", "warning");
                    } else {
                        var tr = document.getElementById("poliza");


                        for (i = 0; i < resp.resp.length; i++) {
                            var arrL = [];
                            var pru = resp.resp;

                            var ident = resp.resp[i]["ident"];
                            var nombre = resp.resp[i]["nombre"];
                            var descripcion = resp.resp[i]["descripcion"];
                            var precioUni = resp.resp[i]["precio"];
                            var cantidad = resp.resp[i]["existencia"];
                            var montoInv = resp.resp[i]["importe"];
                            var button = '<input type = "button" class = "btn btn-danger" id = "eliminarProd" value = "Eliminar">';

                            arrL.push(ident);
                            arrL.push(nombre);
                            arrL.push(descripcion);
                            arrL.push(precioUni);
                            arrL.push(cantidad);
                            arrL.push(montoInv);
                            arrL.push(button);
                            arrM.push(arrL);




                        }

                        if ($.fn.DataTable.isDataTable('#prodsxmarca')) {
                            $('#prodsxmarca').DataTable().destroy();
                        }

                        $('#prodsxmarca tbody').empty();
                        $('#prodsxmarca tfoot th').each(function () {
                            var title = $(this).text();
                            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                        });

                        var table = $('#prodsxmarca').DataTable({
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
                                { title: "identificador" },
                                { title: "nombre" },
                                { title: "descripción" },
                                { title: "unitario" },
                                { title: "cantidad" },
                                { title: "inventario" },
                                { title: "eliminar" }

                            ],
                            "footerCallback": function (row, data, start, end, display) {
                                var api = this.api(), data;

                                // Remove the formatting to get integer data for summation
                                var intVal = function (i) {
                                    return typeof i === 'string' ?
                                        i.replace(/[\$,]/g, '') * 1 :
                                        typeof i === 'number' ?
                                            i : 0;
                                };

                                // Total over all pages
                                total = api
                                    .column(5, { "filter": "applied" })
                                    .data()
                                    .reduce(function (a, b) {
                                        return intVal(a) + intVal(b);
                                    }, 0);

                                // Total over this page
                                pageTotal = api
                                    .column(5, { page: 'current' })
                                    .data()
                                    .reduce(function (a, b) {
                                        return intVal(a) + intVal(b);
                                    }, 0);

                                var formatted = $.fn.dataTable.render.number(",", ".", 0, "$").display(total);
                                $(api.column(5).footer()).html(
                                    formatted
                                );

                            }

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
            });//segundo ajax
        }

    } else if (reptip == 6) {
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
                        var pagado = resp.resp[i]["pagado"];
                        var button = '<button class="btnico" id = "selectLine"><i class="fa fa-trash"></i></button>' + '<button class="btnico" id = "notificacionemail"><i class="fa fa-envelope"></i></button>';
                        if (pagado == 3) {
                            pagado = "Pagado";
                        } else if (pagado == 2) {
                            pagado = "Faltante";
                        } else if (pagado == 1) {
                            pagado = "Excedido";
                        } else {
                            pagado = "Sin pagar"
                        }




                        arrL.push(id);
                        arrL.push(marca);
                        arrL.push(nombre_marca);
                        arrL.push(mes_cobro);
                        arrL.push(fecha);
                        arrL.push(importe);
                        arrL.push(pagado);
                        arrL.push(button);
                        arrM.push(arrL);




                    }

                    if ($.fn.DataTable.isDataTable('#cobrosmimarcatable2')) {
                        $('#cobrosmimarcatable2').DataTable().destroy();
                    }

                    $('#cobrosmimarcatable2 tbody').empty();

                    $('#cobrosmimarcatable2 tfoot th').each(function () {
                        var title = $(this).text();
                        $(this).html('<input type="text" placeholder="Buscar ' + title + '" />');
                    });
                    var table = $('#cobrosmimarcatable2').DataTable({
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
                            { title: "Pago" },
                            { title: "acción" }

                        ],
                        "footerCallback": function (row, data, start, end, display) {
                            var api = this.api(), data;

                            // Remove the formatting to get integer data for summation
                            var intVal = function (i) {
                                return typeof i === 'string' ?
                                    i.replace(/[\$,]/g, '') * 1 :
                                    typeof i === 'number' ?
                                        i : 0;
                            };

                            // Total over all pages
                            total = api
                                .column(5, { "filter": "applied" })
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);

                            // Total over this page
                            pageTotal = api
                                .column(5, { page: 'current' })
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);

                            var formatted = $.fn.dataTable.render.number(",", ".", 0, "$").display(total);
                            $(api.column(5).footer()).html(
                                formatted
                            );

                        }

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



})

$(document).on("click", "#eliminarProd", function () {
    var $row = $(this).closest("tr");        // Finds the closest row <tr> 
    var ident = $row.find("td:nth-child(1)").text();

    if (confirm('Por favor confirme borrado de producto ' + ident)) {
        $.ajax({
            url: "../../db/consultas/borrarProd.php",
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
                swal("Alerta", resp, "warning");
                document.getElementById("cons").click();
                document.getElementById("producto").click();
            }
        })


    }


});

$(document).on("click", "#notificacionemail", function () {
    var $row = $(this).closest("tr"),        // Finds the closest row <tr> 
        $ident = $row.find("td:nth-child(1)").text(); // Finds the 2nd <td> element
    var id = $ident;
    var provid = $row.find("td:nth-child(2)").text();
    var provname = $row.find("td:nth-child(3)").text();
    var mescobro = $row.find("td:nth-child(4)").text();
    var fecha = $row.find("td:nth-child(5)").text();
    var importe = $row.find("td:nth-child(6)").text();
    var email = "";
    var subject = "Cobro de renta";
    $.ajax({
        type: "POST",
        url: "../../db/email/src/notificacioncobro.php",
        data: { id: id, provid: provid, provname: provname, mescobro: mescobro, fecha: fecha, importe: importe },
        error: function (resp) {
            console.log(resp);
            //swal("Alerta1",resp,"warning");
        },
        success: function (data) {
            //swal("Alerta2",data,"warning");
            $.ajax({
                type: "POST",
                url: "../../db/email/src/mailer.php",
                data: { provid: provid, email: email, nombre: provname, data: data, subject: subject },
                error: function (resp) {
                    console.log(resp);
                    //swal("Alerta3",resp,"warning");
                },
                success: function (resp) {
                    swal("Alerta", resp, "success");
                }

            });
        }

    });


});

$(document).on("click", "#myBtnVentas", function () {
    $("#desglosepormarca").modal();
    var $row = $(this).closest("tr");        // Finds the closest row <tr> 
    var id = $row.find("td:nth-child(1)").text(); // Finds the 2nd <td> element
    var fecha = $("#fechaEsp").val();
    var user = $("#puesto").html();
    var fecha1 = $("#fechaini").val();
    var fecha2 = $("#fechafin").val();
    $.ajax({
        url: "../../db/consultas/cajacondensadodesgloseventas.php",
        dataType: "json",
        type: "post",
        data: { fecha: fecha, id: id, user: user, fecha1: fecha1, fecha2: fecha2 },
        async: true,
        beforeSend: function () {
        },
        complete: function (resp) {
        },
        error: function (resp) {
            console.log(resp);
            swal("Alerta", resp.responseText, "warning");

        },
        success: function (resp) {
            var descs = 0;
            var arrM = [];
            if (resp.resp[0].error == true) {
                if ($.fn.DataTable.isDataTable('#tabladesglose')) {
                    $('#tabladesglose').DataTable().destroy();
                }

                $('#tabladesglose tbody').empty();
                $("#vnt").html("");
                $("#pags").html("");
                $("#descs").html("");
                swal("Alerta", resp.resp[0].message, "warning");
            } else {
                var lt1 = resp.resp.length;


                for (i = 0; i < lt1; i++) {
                    var arrL = [];
                    var pru = resp.resp;

                    var id = (resp.resp[i]["id"] != undefined) ? resp.resp[i]["id"] : ".";
                    var idProd = (resp.resp[i]["idProd"] != undefined) ? resp.resp[i]["idProd"] : ".";
                    var nombre = (resp.resp[i]["nombre"] != undefined) ? resp.resp[i]["nombre"] : ".";
                    var fecha = (resp.resp[i]["fecha"] != undefined) ? resp.resp[i]["fecha"] : ".";
                    var totalventa = (resp.resp[i]["totalventa"] != undefined) ? resp.resp[i]["totalventa"] : ".";
                    var totalprod = (resp.resp[i]["totalprod"] != undefined) ? resp.resp[i]["totalprod"] : ".";
                    var totaldesc = (resp.resp[i]["totaldesc"] != undefined) ? resp.resp[i]["totaldesc"] : ".";
                    totaldesc = parseFloat(totaldesc);
                    totaldesc = totaldesc.toFixed(2);
                    if (idProd == 0) {
                        idProd = "Pago";
                    }
                    arrL.push(id);
                    arrL.push(idProd);
                    arrL.push(fecha);
                    arrL.push(nombre);
                    arrL.push(totalventa);
                    arrL.push(totalprod);
                    arrL.push(totaldesc);

                    arrM.push(arrL);


                }

                if ($.fn.DataTable.isDataTable('#tabladesglose')) {
                    $('#tabladesglose').DataTable().destroy();
                }

                $('#tabladesglose tbody').empty();
                $('#tabladesglose tfoot th').each(function () {
                    var title = $(this).text();
                    $(this).html('<input type="text" placeholder="Buscar ' + title + '" />');
                });
                var head = $("#resCaja").html();
                var table = $('#tabladesglose').DataTable({
                    "autoWidth": false,
                    dom: 'Bfrtip',
                    "paging": false,
                    buttons: [
                        { extend: 'copyHtml5', footer: true },
                        { extend: 'excelHtml5', footer: true },
                        { extend: 'csvHtml5', footer: true },
                        { extend: 'pdfHtml5', footer: true },
                        {
                            extend: 'print',
                            customize: function (win) {
                                $(win.document.body)
                                    .css('font-size', '10pt')
                                    .append(
                                        head
                                    );

                                $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                            }
                        }
                    ],
                    data: arrM,
                    columns: [
                        { title: "#id" },
                        { title: "#idProd" },
                        { title: "Fecha" },
                        { title: "Nombre" },
                        { title: "Pago" },
                        { title: "Cantidad" },
                        { title: "Descuento" }

                    ],
                    "footerCallback": function (row, data, start, end, display) {
                        var api = this.api(), data;

                        // Remove the formatting to get integer data for summation
                        var intVal = function (i) {
                            return typeof i === 'string' ?
                                i.replace(/[\$,]/g, '') * 1 :
                                typeof i === 'number' ?
                                    i : 0;
                        };

                        // Total over all pages
                        total = api
                            .column(4, { "filter": "applied" })
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        pageTotal = api
                            .column(4, { page: 'current' })
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        var formatted = $.fn.dataTable.render.number(",", ".", 0, "$").display(total);
                        $(api.column(4).footer()).html(
                            formatted
                        );
                        // Total over all pages
                        total = api
                            .column(5, { "filter": "applied" })
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        pageTotal = api
                            .column(5, { page: 'current' })
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        var formatted = $.fn.dataTable.render.number(",", ".", 0, "$").display(total);
                        $(api.column(5).footer()).html(
                            total
                        );
                        // Total over all pages
                        total = api
                            .column(6, { "filter": "applied" })
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        pageTotal = api
                            .column(6, { page: 'current' })
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        var formatted = $.fn.dataTable.render.number(",", ".", 0, "$").display(total);
                        $(api.column(6).footer()).html(
                            formatted
                        );
                    }

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


        }//success

    });//ajax


});

$(document).on("click", "#myBtn", function () {
    $("#desglosepormarca").modal();
    var $row = $(this).closest("tr");        // Finds the closest row <tr> 
    var id = $row.find("td:nth-child(1)").text(); // Finds the 2nd <td> element
    var fecha = $("#fechaEsp").val();
    var user = $("#puesto").html();
    var fecha1 = $("#fechaini").val();
    var fecha2 = $("#fechafin").val();
    $.ajax({
        url: "../../db/consultas/cajacondensadodesglose.php",
        dataType: "json",
        type: "post",
        data: { fecha: fecha, id: id, user: user, fecha1: fecha1, fecha2: fecha2 },
        async: true,
        beforeSend: function () {
        },
        complete: function (resp) {
        },
        error: function (resp) {
            console.log(resp);
            swal("Alerta", resp.responseText, "warning");
        },
        success: function (resp) {
            var descs = 0;
            var arrM = [];
            if (resp.resp[0].error == true) {
                if ($.fn.DataTable.isDataTable('#tabladesglose')) {
                    $('#tabladesglose').DataTable().destroy();
                }

                $('#tabladesglose tbody').empty();
                $("#vnt").html("");
                $("#pags").html("");
                $("#descs").html("");
                swal("Alerta", resp.resp[0].message, "warning");
            } else {
                var lt1 = resp.resp.length;


                for (i = 0; i < lt1; i++) {
                    var arrL = [];
                    var pru = resp.resp;

                    var id = (resp.resp[i]["id"] != undefined) ? resp.resp[i]["id"] : ".";
                    var idProd = (resp.resp[i]["idProd"] != undefined) ? resp.resp[i]["idProd"] : ".";
                    var nombre = (resp.resp[i]["nombre"] != undefined) ? resp.resp[i]["nombre"] : ".";
                    var fecha = (resp.resp[i]["fecha"] != undefined) ? resp.resp[i]["fecha"] : ".";
                    var totalventa = (resp.resp[i]["totalventa"] != undefined) ? resp.resp[i]["totalventa"] : ".";
                    var totalprod = (resp.resp[i]["totalprod"] != undefined) ? resp.resp[i]["totalprod"] : ".";
                    var totaldesc = (resp.resp[i]["totaldesc"] != undefined) ? resp.resp[i]["totaldesc"] : ".";
                    totaldesc = parseFloat(totaldesc);
                    totaldesc = totaldesc.toFixed(2);
                    arrL.push(id);
                    arrL.push(idProd);
                    arrL.push(fecha);
                    arrL.push(nombre);
                    arrL.push(totalventa);
                    arrL.push(totalprod);
                    arrL.push(totaldesc);

                    arrM.push(arrL);


                }

                if ($.fn.DataTable.isDataTable('#tabladesglose')) {
                    $('#tabladesglose').DataTable().destroy();
                }

                $('#tabladesglose tbody').empty();
                $('#tabladesglose tfoot th').each(function () {
                    var title = $(this).text();
                    $(this).html('<input type="text" placeholder="Buscar ' + title + '" />');
                });
                var head = $("#resCaja").html();
                var table = $('#tabladesglose').DataTable({
                    "autoWidth": false,
                    dom: 'Bfrtip',
                    "paging": false,
                    buttons: [
                        { extend: 'copyHtml5', footer: true },
                        { extend: 'excelHtml5', footer: true },
                        { extend: 'csvHtml5', footer: true },
                        { extend: 'pdfHtml5', footer: true },
                        {
                            extend: 'print',
                            customize: function (win) {
                                $(win.document.body)
                                    .css('font-size', '10pt')
                                    .append(
                                        head
                                    );

                                $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                            }
                        }
                    ],
                    data: arrM,
                    columns: [
                        { title: "#id" },
                        { title: "#idProd" },
                        { title: "Fecha" },
                        { title: "Nombre" },
                        { title: "Monto venta" },
                        { title: "Cantidad" },
                        { title: "Descuento" }

                    ],
                    "footerCallback": function (row, data, start, end, display) {
                        var api = this.api(), data;

                        // Remove the formatting to get integer data for summation
                        var intVal = function (i) {
                            return typeof i === 'string' ?
                                i.replace(/[\$,]/g, '') * 1 :
                                typeof i === 'number' ?
                                    i : 0;
                        };

                        // Total over all pages
                        total = api
                            .column(4, { "filter": "applied" })
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        pageTotal = api
                            .column(4, { page: 'current' })
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        var formatted = $.fn.dataTable.render.number(",", ".", 0, "$").display(total);
                        $(api.column(4).footer()).html(
                            formatted
                        );
                        // Total over all pages
                        total = api
                            .column(5, { "filter": "applied" })
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        pageTotal = api
                            .column(5, { page: 'current' })
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        var formatted = $.fn.dataTable.render.number(",", ".", 0, "$").display(total);
                        $(api.column(5).footer()).html(
                            total
                        );
                        // Total over all pages
                        total = api
                            .column(6, { "filter": "applied" })
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        pageTotal = api
                            .column(6, { page: 'current' })
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        var formatted = $.fn.dataTable.render.number(",", ".", 0, "$").display(total);
                        $(api.column(6).footer()).html(
                            formatted
                        );
                    }

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


        }//success

    });//ajax


});

$(document).on("click", "#selectLine", function () {
    var $row = $(this).closest("tr"),        // Finds the closest row <tr> 
        $ident = $row.find("td:nth-child(1)"); // Finds the 2nd <td> element



    $("#nomProd").val($row.find("td:nth-child(1)").text());
    $("#nCant").val($row.find("td:nth-child(2)").text());
    var cant = $row.find("td:nth-child(2)").text();
    var total = $row.find("td:nth-child(3)").text();
    precio = $row.find("td:nth-child(7)").text();



});

$(document).on("click", "#eliminarVenta", function () {
    var $row = $(this).closest("tr");        // Finds the closest row <tr> 
    var ident = $row.find("td:nth-child(1)").text(); // Finds the 2nd <td> element
    var ventaid = $row.find("td:nth-child(2)").text();
    var ventaidprod = $row.find("td:nth-child(4)").text();
    $.ajax({
        url: "../../db/consultas/borrarVenta.php",
        dataType: "text",
        type: "post",
        data: { ident: ident, ventaid: ventaid, ventaidprod: ventaidprod },
        async: true,
        beforeSend: function () {
        },
        complete: function (resp) {
        },
        error: function (resp) {
            console.log(resp);

        },
        success: function (resp) {
            swal("Alerta", resp, "success");
            if ($.fn.DataTable.isDataTable('#reportesTable1')) {
                $('#reportesTable1').DataTable().destroy();
            }

            $('#reportesTable1 tbody').empty();
        }


    });





});

$(document).on("click", "#actProd", function () {

    var prodid = $("#nomProd").val();
    var cant = $("#nCant").val();
    var monto = cant * precio;

    $.ajax({
        url: "../../db/consultas/updtIngreso.php",
        dataType: "text",
        type: "post",
        data: { prodid: prodid, cant: cant, monto: monto },
        async: true,
        beforeSend: function () {
        },
        complete: function (resp) {
        },
        error: function (resp) {
            console.log(resp);

        },
        success: function (resp) {
            swal("Alerta", resp, "success");
            document.getElementById("generarRep1").click();
        }


    });

}); 