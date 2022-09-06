$(document).on('click', '#buscarCobros', function () {
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

				cad = cad + '<option value ="' + uniq[0] + '" attr = "' + uniq[1] + '">' + uniq[1] + '|' + uniq[0] + '</option>';


			}
			$("#marcascobros").html(cad);
		}
	})


})

$(document).on('change', '#marcascobros', function () {
	var idMarca = $("#marcascobros").val();
	loadTable(idMarca);
})

$(document).on("click", "#selectLine1", function () {
	var $row = $(this).closest("tr");      // Finds the closest row <tr> 
	var cobro = $row.find("td:nth-child(6)").text();
	var pago = $row.find("td:nth-child(9)").text();
	$("#mesCobrado").val($row.find("td:nth-child(4)").text());
	$("#cobrado").val(cobro);
	$("#aPagar").val($row.find("td:nth-child(9)").text());
});

$(document).on("click", "#notificacionemail1", function () {
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
		},
		success: function (data) {
			$.ajax({
				type: "POST",
				url: "../../db/email/src/mailer.php",
				data: { provid: provid, email: email, nombre: provname, data: data, subject: subject },
				error: function (resp) {
					console.log(resp);
				},
				success: function (resp) {
					swal("Alerta", resp, "success");
					loadTable(provid);
				}

			});
		}

	});


});

$(document).on("click", "#enviarRecibo", function () {
	var monto = $("#cobrado").val();
	var prov = $("#marcascobros").val();
	var mes = $("#mesCobrado").val();
	var cantidad = $("#aPagar").val();
	var provid = $("#marcascobros").val();
	var email = "";
	var subject = "Pago de renta";
	if (cantidad == "") {
		swal("Alerta", "Importe a pagar no puede estar vacio", "warning");
	} else {
		$.ajax({
			type: "POST",
			url: "../../db/email/src/recibomarca.php",
			data: { monto: monto, prov: prov, mes: mes, cantidad: cantidad, provid: provid },
			error: function (resp) {
				console.log(resp);
			},
			success: function (data) {
				$.ajax({
					type: "POST",
					url: "../../db/email/src/mailer.php",
					data: { provid: provid, email: email, nombre: provid, data: data, subject: subject },
					error: function (resp) {
						console.log(resp);
					},
					success: function (resp) {
						swal("Alerta", resp, "success");
					}

				});
			}

		});
	}

});

$(document).one("click", "#guardarCobro", function () {
	var monto = $("#cobrado").val();
	var prov = $("#marcascobros").val();
	var mes = $("#mesCobrado").val();
	var cantidad = $("#aPagar").val();
	var idMarca = $("#marcascobros").val();
	if (monto == "" || prov == "" || mes == "" || cantidad == "") {
		swal("Alerta", "Formulario no puede estar vacio", "warning");
	} else {
		$.ajax({
			type: "POST",
			url: "../../db/consultas/pagoMensualidad.php",
			data: { monto: monto, prov: prov, mes: mes, cantidad: cantidad },
			error: function (resp) {
				console.log(resp);
			},
			success: function (data) {
				swal("Alerta", data, "success");
				loadTable(idMarca);
			}

		});
	}
});

function loadTable(idMarca) {
	$.ajax({
		url: "../../db/consultas/consultaCobrosPorMarca.php",
		dataType: "json",
		type: "post",
		data: { idMarca: idMarca },
		async: false,
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
				swal("Alerta", "No hay movimientos", "warning");
			} else {
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
					var cantidad = resp.resp[i]["cantidad"];

					var acciones = "";
					if (email == 1) {
						email = "Notificación enviada";
						acciones = '<button class="btnico" id = "selectLine1"><i class="fa fa-money" aria-hidden="true"></i></button>' +
							'<button class="btnico" id = "notificacionemail1"><i class="fa fa-envelope"></i></button>';
					} else {
						email = "Sin notificar";
						acciones = '<button class="btnico" id = "selectLine1"><i class="fa fa-money" aria-hidden="true"></i></button>' +
							'<button class="btnico" id = "notificacionemail1"><i class="fa fa-envelope"></i></button>';
					}
					if (pagado == 0) {
						pagado = "Sin pagos";
					} else if (pagado == 1) {
						pagado = "Faltante"
					} else if (pagado == 2) {
						pagado = "Sobrante";
					} else {
						pagado = "Pagado";
					}

					arrL.push(id);
					arrL.push(marca);
					arrL.push(nombre_marca);
					arrL.push(mes_cobro);
					arrL.push(fecha);
					arrL.push(importe);
					arrL.push(email);
					arrL.push(pagado);
					arrL.push(cantidad);
					arrL.push(acciones);
					arrM.push(arrL);




				}
				if ($.fn.DataTable.isDataTable('#cobrospmarca')) {
					$('#cobrospmarca').DataTable().destroy();
				}

				$('#cobrospmarca tbody').empty();
				$('#cobrospmarca tfoot th').each(function () {
					var title = $(this).text();
					$(this).html('<input type="text" placeholder="Search ' + title + '" />');
				});
				var head = $("#resCaja").html();
				var table = $('#cobrospmarca').DataTable({
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
						{ title: "id" },
						{ title: "marca" },
						{ title: "nombre_marca" },
						{ title: "mes_cobro" },
						{ title: "fecha" },
						{ title: "cobrado" },
						{ title: "email" },
						{ title: "estado" },
						{ title: "pagado" },
						{ title: "acciones" }

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
	})
}

