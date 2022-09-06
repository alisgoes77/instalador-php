<div class="container-fluid">
   <div class="row">
            <div class="col-lg-3">
            	<label for="marcascobros">Marcas con cobro</label>
            	<select class="form-control" id="marcascobros">
            	</select>
            	<label for="cobrado">Monto cobrado</label>
            	<input type="number" id="cobrado" class="form-control" disabled>
            	<label for="mesCobrado">Mes cobrado</label>
            	<input type="text" id="mesCobrado" class="form-control" disabled>
            </div>
            <div class="col-lg-3">
            	<label for="aPagar">Monto a pagar</label>
            	<input type="number" id="aPagar" class="form-control">
            	<label for="acciones">Acciones</label><br>
            	<input type="button" id="buscarCobros" class="btn btn-default" value="Buscar cobros">
            	<input type="button" id="guardarCobro" class="btn btn-success" value="Cobrar"><br><br>
            	<input type="button" id="enviarRecibo" class="btn btn-primary" value="Recibo por email">
            </div>    
            
             
   </div><!-- /.row main-->
   <div class="row">
   				      <div id = "tablaCuentas" class="table-responsive">
   				              <table class="table tblpol" id = "cobrospmarca">
   				              
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
   		                                    <th></th>
   		                                    <th></th>
   		                                  </tr>
   				                      </tfoot>
   				          </table>
   				      </div>

   </div>
   </div><!-- /.container-fluid -->
  <script src="../../js/historialmarca.js"></script>

