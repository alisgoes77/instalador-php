$(document).ready(function () {
	var puesto = $("#puesto").html();
	
	var count = 0;
	if (puesto == "Proveedor") {
		console.log(puesto);
		$("#proveedores").hide();
		$("#cajarosa").hide();
		$("#inven").hide();
		$("#modal1").hide();
		$("#salidasModalbtn").hide();
		$("#administrator").hide();
		$("#marcacobros").show();
		$("#cajarosa").hide();
		$("#producto").hide();
		$("#ingproducto").hide();
		$("#proveedores").hide();
		$("#cobrosmarca").hide();
		$("#historialrecibos").hide();
		$("#clientes").hide();
		$("#respaldarData").hide();
		$("#reportes").show();

	} else if (puesto == "2") {
		$("#proveedores").hide();
		$("#inven").hide();
		$("#administrator").hide();
		$("#marcacobros").hide();

	} else {
		$("#proveedores").show();
		$("#cajarosa").show();
		$("#inven").show();
		$("#administrator").show();
		$("#marcacobros").hide();
	}



})



function printElem(divId) {

	var content = document.getElementById(divId).innerHTML;

	var mywindow = window.open('', 'Print', 'height=600,width=800');

	mywindow.document.write('<html><head><title>Print</title>');
	mywindow.document.write('</head><body >');
	mywindow.document.write(content);
	mywindow.document.write('</body></html>');

	mywindow.document.close();
	mywindow.focus()
	mywindow.print();
	mywindow.close();

	return true;
}

$("#openmodal").on("click", function () {
	if (window.matchMedia("(max-width: 767px)").matches) {
		$("#pushmenu").css("transform", "translate3d(0px, 0, 0)");
	} else {
		$("#pushmenu").css("transform", "translate3d(-260px, 0, 0)");
	}


})

$("#impNota").click(function () {

	printElem('notaaper');

});

$('#key').on('keyup', function () {
	var key = $(this).val();
	var validator = "ingreso";
	if (key == "") {
		$('#suggestions').fadeOut(1000);
	} else {
		$.ajax({
			type: "POST",
			url: "../../db/consultas/getProveedorescaja.php",
			data: { key: key, validator: validator },
			success: function (data) {
				//Escribimos las sugerencias que nos manda la consulta
				$('#suggestions').fadeIn(1000).html(data);
				//Al hacer click en alguna de las sugerencias
				$('.suggest-element').on('click', function () {
					//Obtenemos la id unica de la sugerencia pulsada
					var id = $(this).attr('id');
					//Editamos el valor del input con data de la sugerencia pulsada
					$('#key').val($('#' + id).attr('data') + "|" + id);
					//Hacemos desaparecer el resto de sugerencias
					$('#suggestions').fadeOut(1000);
					// alert('Has seleccionado el '+id+' '+$('#'+id).attr('data'));

					return false;
				});
			}
		});
	}
});

$(document).on('click', '#cajaguardar', function () {

	var fecha = $("#fechaCaja").val();
	var accion = $("#accioncaja").val();
	var saldo = $("#saldocaja").val();
	var nombre = $("#nombre").html();

	$.ajax({
		url: "../../db/consultas/abrircaja.php",
		type: "post",
		data: { fecha: fecha, accion: accion, saldo: saldo, nombre: nombre },
		async: true,
		beforeSend: function () {
		},
		complete: function () {
		},
		success: function (resp) {
			swal("Alerta", resp, "success");
			location.reload();

		}

	})
})
$(document).on('click', '#cajaconsulta', function () {

	var fecha = $("#consultacaja").val();


	$.ajax({
		url: "../../db/consultas/consultacaja.php",
		type: "post",
		dataType: "json",
		data: { fecha: fecha },
		async: true,
		beforeSend: function () {
		},
		complete: function () {
		},
		success: function (resp) {

			var arrM = [];
			if (resp.resp[0].message == 'nothing found') {
				alert("No hay movimientos");
			} else {

				for (i = 0; i < resp.resp.length; i++) {
					var arrL = [];
					var pru = resp.resp;

					var fecha = resp.resp[i]["fecha"];
					var estado = resp.resp[i]["estado"];
					var saldo = resp.resp[i]["saldo"];
					var saldosistema = resp.resp[i]["saldosistema"];
					var usuario = resp.resp[i]["usuario"];

					if (estado == 1) {
						estado = "C abierta";
					} else {
						estado = "C cerrada";
					}

					$("#fecha" + i).html(fecha);
					$("#estado" + i).html(estado);
					$("#saldo" + i).html(saldo);
					$("#saldosistema" + i).html(saldosistema);
					$("#usuario" + i).html(usuario);


					arrL.push(fecha);
					arrL.push(estado);
					arrL.push(saldo);
					arrL.push(saldosistema);
					arrL.push(usuario)

					arrM.push(arrL);




				}

				if ($.fn.DataTable.isDataTable('#cortecaja')) {
					$('#cortecaja').DataTable().destroy();
				}

				$('#cortecaja tbody').empty();

				$('#cortecaja').DataTable({
					"autoWidth": false,
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
						{ title: "Fecha" },
						{ title: "Estado" },
						{ title: "Saldo" },
						{ title: "Saldo sistema" },
						{ title: "Usuario" }

					]

				});


			}
		}
	});//first ajax
})
$(document).on('click', '#salidasModalbtn', function () {

	$("#salidasModal").modal('toggle');
	var random = Math.floor(100000 + Math.random() * 900000);
	$("#idEgreso").html(random);

})

$(document).on('click', '#cerrarEgreso', function () {
	$("#idEgreso").html(" ");
	$("#saldoEgreso").val("");
	$("#concEgreso").val(" ");
	$("#salidasModal").modal('toggle');



})

$(document).on('click', '#egresosguardar', function () {
	count = 1;
	var ventaid = $("#idEgreso").html();
	var totalPago = $("#saldoEgreso").val();
	var metodoPago = "3|Efectivo";
	var recepcion = $("#saldoEgreso").val();
	var cambio = 0.00;
	var vendedor = $("#nombre").html();
	var tipoing = 2;
	var concepto = $("#concEgreso").val();
	var provee = $("#key").val();
	if (provee == "") {
		provee = "-|0";
	}
	var provid = provee.split("|");
	var prov = provid[1];
	if (count == 1) {

		$.ajax({
			type: "POST",
			url: "../../db/consultas/crearVenta.php",
			data: { ventaid: ventaid, totalPago: totalPago, metodoPago: metodoPago, recepcion: recepcion, cambio: cambio, vendedor: vendedor, tipoing: tipoing, concepto: concepto, prov: prov },
			error: function (resp) {
				console.log(resp);

			},
			success: function (data) {
				var idProd = "000000";
				var nombre = concepto;
				var pUni = "000000";
				var cant = 0.00;
				var total = totalPago
				$.ajax({
					type: "POST",
					url: "../../db/consultas/ventaDesglose.php",
					data: { ventaid: ventaid, idProd: idProd, nombre: nombre, prov: prov, pUni: pUni, cant: cant, total: total, vendedor: vendedor, porcen: 0 },
					error: function (resp) {
						console.log(resp);

					},
					success: function (data) {
						if (data == "Venta registrada") {
							swal("Alerta", "Egreso registrado", "success");
						} else {
							swal("Alerta", "Error", "warning");
						}

					}
				})
			}
		})
		count = 0;;
	} else {
		count = 0;
	}
})
