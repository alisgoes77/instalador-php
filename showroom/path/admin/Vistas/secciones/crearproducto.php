<style>
	table#prodsTable {
		table-layout: fixed;
	}

	table.dataTable th:nth-child(1) {
		width: 75px;
		max-width: 75px;
		word-break: break-all;
		white-space: pre-line;
	}
	table.dataTable th:nth-child(2) {
		width: 100px;
		max-width: 100px;
		word-break: break-all;
		white-space: pre-line;
	}
	table.dataTable th:nth-child(3) {
		width: 120px;
		max-width: 120px;
		word-break: break-all;
		white-space: pre-line;
	}
	table.dataTable th:nth-child(4) {
		width: 120px;
		max-width: 120px;
		word-break: break-all;
		white-space: pre-line;
	}
	table.dataTable th:nth-child(5) {
		width: 120px;
		max-width: 120px;
		word-break: break-all;
		white-space: pre-line;
	}
	table.dataTable th:nth-child(6) {
		width: 100px;
		max-width: 100px;
		word-break: break-all;
		white-space: pre-line;
	}
	table.dataTable th:nth-child(7) {
		width: 100px;
		max-width: 100px;
		word-break: break-all;
		white-space: pre-line;
	}
	table.dataTable th:nth-child(8) {
		width: 100px;
		max-width: 100px;
		word-break: break-all;
		white-space: pre-line;
	}
	
</style>
<div id="myModal" class="modal fade" role="dialog">
	<div class="modal-dialog modal-xl">

		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">Revisar ingreso</h4>
			</div>
			<div class="modal-body" id="prodCred">
				<label>Identificador asignado</label><br>
				<span id="ida"></span><br>
				<label>Nombre de producto</label><br>
				<span id="nom"></span><br>
				<label>Descripción</label><br>
				<span id="desc"></span><br>
				<label>Fecha de creación</label><br>
				<span id="fec"></span><br>
				<label>Proveedor</label><br>
				<span id="pro"></span><br>
				<label>Presentación de venta</label><br>
				<span id="presv"></span><br>
				<label>Presentación de ingreso</label><br>
				<span id="presi"></span><br>
				<label>Cantidad por presentación venta</label><br>
				<span id="cpresv"></span><br>
				<label>Cantidad por presentación ingreso</label><br>
				<span id="cpresi"></span><br>
				<label>Precio de venta</label><br>
				<span id="preciov"></span><br>
			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-primary" id="btnPrint">Imprimir</button>
				<button type="button" class="btn btn-default" id="closeMododal">Cerrar</button>

			</div>
		</div>

	</div>
</div>
<div class="container-fluid">
	<h4>Crear producto</h4>
	<div class="row">
		<div class="col-lg-3">
			<div class="form-group">
				<label for="iident">Identificador interno</label>
				<input type="number" id="iident" placeholder="Identificador interno" class="form-control">
			</div>
			<div class="form-group">
				<label for="pName">Nombre de producto</label>
				<input type="text" id="pName" class="form-control" placeholder="Nombre del producto">
			</div>
			<div class="form-group">
				<label for="pDesc">Descripción</label>
				<input type="text" id="pDesc" class="form-control" placeholder="Descripción del producto">
			</div>

		</div>
		<div class="col-lg-3">
			<div class="form-group">
				<label for="pProv">Proveedor</label>
				<select id="pProv" class="form-control">
				</select>
				<button class="btn btn-default" id="loadProvs">Cargar</button>
			</div>
			<div class="form-group">
				<label for="pFec">Fecha de creación</label>
				<input type="date" id="pfex" class="form-control">
			</div>


		</div>

		<div class="col-lg-3">
			<div class="form-group">
				<label for="precioUni">Precio de venta</label>
				<input type="number" id="precioUni" placeholder="Precio unitario" class="form-control">
			</div>
			<div class="form-group">
				<label for="precioUni">Cantidad inicial</label>
				<input type="number" id="cantInicial" placeholder="Cantidad inicial" class="form-control">
			</div>
			<svg id="codebarproduct"></svg>
		</div>
		<div class="col-lg-3">
		<hr>
			<button type="button" id="updtProd" class="btn btn-default">Actualizar Producto</button>
			<button type="button" id="cons" class="btn btn-default">Consulta</button><br><br>
			<button type="button" id="ingresar" class="btn btn-primary">Crear producto</button>
			<button type="button" id="delProd" class="btn btn-danger">Eliminar Producto</button><br><br>
			<label>Tamaño de código de barras</label>
			<select name="sizeCode" id="sizeCode" class="form-control">
				<option value="12">Chico</option>
				<option value="10">Medio</option>
				<option value="8">Grande</option>
			</select>
			<button type="button" id="generatePdf" class="btn btn-success">Generar PDF</button>

		</div>

	</div>
	<div class="row">
		<div id="tablaCuentas" class="table-responsive">
			<table class="table tblpol" id="prodsTable">
				<tfoot>
					<tr>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
				</tfoot>
			</table>
		</div>
	</div> <!-- /.row -->
	<div class="row">
		<div class="col-md-4">
			<label>Subir archivo de productos</label>
			<input type="file" name="employee_file" id="employee_file" style="margin-top:15px;" />
			<input type="button" name="upload" id="upload" value="Subir archivo" style="margin-top:10px;" class="btn btn-info" />
		</div>
	</div> <!-- /.row -->
</div>
<script src="../../js/crearProducto.js"></script>