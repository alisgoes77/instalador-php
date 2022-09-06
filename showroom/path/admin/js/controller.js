

	var menuOptions = ['producto','ingproducto','proveedores','cajarosa','reportes','cobrosmarca','pagosMes','marcacobros','historialrecibos','historialrecibos','respaldarData','clientes','promociones'];
	function save(filename, data) {

		const blob = new Blob([data], { type: 'text/txt' });
		if (window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveBlob(blob, filename);
		}
		else {
			const elem = window.document.createElement('a');
			elem.href = window.URL.createObjectURL(blob);
			elem.download = filename;
			document.body.appendChild(elem);
			elem.click();
			document.body.removeChild(elem);
		}
	}
	function setActive(idMenu){
		for(var i = 0; i<= menuOptions.length-1;i++){
			if(menuOptions[i] == idMenu){
				$("#"+menuOptions[i]).parent('li').addClass('active');
			}else{
				$("#"+menuOptions[i]).parent('li').removeClass('active');	
			}
		}
		if (window.matchMedia("(max-width: 767px)").matches) {
			$("#pushmenu").css("transform", "translate3d(-260px, 0, 0)");
		}
	}
	$(document).on('click', '#producto', function () {
		setActive('producto');
		$('#maincontroller').load("../secciones/crearproducto.php");
		$("#nombreseccion").text("Crear productos");
		var cad = "";

		if (window.matchMedia("(max-width: 767px)").matches) {
			$("#pushmenu").css("transform", "translate3d(-260px, 0, 0)");
		}

		$.ajax({
			url: "../../db/consultas/getProveedores.php",
			dataType: "text",
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

				var provs = resp.split("||");

				var cleanArray = provs.filter(function (el) {
					return el != "";
				});

				for (var i = 0; i <= cleanArray.length - 1; i++) {
					var uniq = provs[i].split("|");

					cad = cad + '<option value ="' + uniq[0] + '" attr = "' + uniq[1] + '">' + uniq[1] + '|' + uniq[0] + '</option>';


				}
				$("#pProv").html(cad);
			}
		})
		


	})

	$(document).on('click', '#ingproducto', function () {
		setActive('ingproducto');
		$('#maincontroller').load("../secciones/ingProd.php");
		$("#nombreseccion").text("Ingresar productos");
	})

	$(document).on('click', '#proveedores', function () {
		setActive('proveedores');
		$('#maincontroller').load("../secciones/proveedores.php");
		$("#nombreseccion").text("Proveedores");
	})

	$(document).on('click', '#cajarosa', function () {
		setActive('cajarosa');
		$('#maincontroller').load("../secciones/cajarosa.php");
		$("#nombreseccion").text("Caja");
	})

	$(document).on('click', '#reportes', function () {
		setActive('reportes');
		$('#maincontroller').load("../secciones/reportes.php");
		$("#nombreseccion").text("Reportes");
	})

	$(document).on('click', '#cobrosmarca', function () {
		setActive('cobrosmarca');
		$('#maincontroller').load("../secciones/cobrosmarca.php");
		$("#nombreseccion").text("Cobrar a marcas");
		var cad = "";
		$.ajax({
			url: "../../db/consultas/getProveedores.php",
			dataType: "text",
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

	})

	$(document).on('click', '#pagosMes', function () {
		setActive('pagosMes');
		$('#maincontroller').load("../secciones/historialmarca.php");
		$("#nombreseccion").text("Pagos de marcas");
	})

	$(document).on('click', '#marcacobros', function () {
		setActive('marcacobros');
		$('#maincontroller').load("../secciones/marcacobros.php");
		$("#nombreseccion").text("Mensualidades de mi marca");
	})

	$(document).on('click', '#historialrecibos', function () {
		setActive('historialrecibos');
		$('#maincontroller').load("../secciones/historialrecibos.php");
		$("#nombreseccion").text("Emails enviados");
	})

	$(document).on('click', '#respaldarData', function () {
		setActive('respaldarData');
		$.ajax({
			url: "../../db/consultas/backup.php",
			dataType: "text",
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
				var today = new Date();
				save("backupRM" + today + ".sql", resp);
			}

		})
	})

	$(document).on('click', '#clientes', function () {
		setActive('clientes');
		$('#maincontroller').load("../secciones/clientes.php");
		$("#nombreseccion").text("Control de clientes");
	})

	$(document).on('click', '#promociones', function () {
		setActive('promociones');
		$('#maincontroller').load("../secciones/promociones.php");
		$("#nombreseccion").text("Control de promociones");
	})


