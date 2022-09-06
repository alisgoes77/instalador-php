
<div class="container-fluid">
	<div class="row">
   		   <div class="col-lg-3">
   		   	 <div class="form-group">
   		   		<label for="marcaselect">Marca</label>
   		   		<select id="marcaselect" class="form-control">
   		   		</select>
   		   		
   		   	 </div>
   		   	 <div class="form-group">
   		   	 	<label for="mescobro">Mes a cobrar</label>
                  <input type="month" id="start" name="start" class="form-control">
   		   	 
   		   	 </div>
            </div>
   		   <div class="col-lg-3">
                <div class="form-group">
                  <label for="fechaselect">Fecha de cobro</label>
                  <input type="date" id="fechaselect" class="form-control" placeholder="Fecha de cobro">
                </div>
                <div class="form-group">
                  <label for="montocobro">Monto de cobro</label>
                  <input type="number" id="montocobro" class="form-control" placeholder="Monto de cobro">
                </div>
   		   </div>
             <div class="col-lg-3">
                <div class="form-group">
                  <label></label><br>
                  <button class="btn btn-primary" id="crearcobro">Crear cobro</button>
                </div>
                <div class="form-group">
                  <label></label><br>
                   <button class="btn btn-default" id="cargarmarcas">Cargar marcas</button>
                    <label></label><br>
                   <button class="btn btn-success" id="consultacobros">Consultar</button>
                </div>
               
            </div>    
   </div><!-- /.row -->
   <div class="row">
      <div id = "tablaCobrosMarca" class="table-responsive">
                       <table class="table tblpol" id = "cobrosamarcas">
                       
                       <tfoot>
                                   <tr>
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
  <script src="../../js/cobrosmarca.js"></script>

