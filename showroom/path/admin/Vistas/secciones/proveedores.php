
<div class="container-fluid">
	<h4 >Dar de alta proveedores</h4>
   <div class="row">
   		
   		
   		     <div class="col-lg-3">
   		         <div class="form-group">
   		     	   <label for="ident">#Identificador:</label>
   		     	   <input class = "form-control" type = "text" placeholder = "Identificador" maxlength="15" id = "ident"  style="text-transform:uppercase">
   		        </div>
   		        <div class="form-group">
   		            <label for="nomProv">Nombre:</label>
   		            <input type="text" id="nomProv" class="form-control" placeholder="Nombre del proveedor">
				</div>
   		   </div>
   		   <div class="col-lg-3">
   		   		<div class="form-group">
   		   			<label for="telefono">Tel contacto:</label>
   		   			<input type="tel" id="telefono" class="form-control" maxlength="10">
   		   		</div>
   		   		<div class="form-group">
   		        	<label for="email">Email proveedor:</label>
   		         <input type="email" id="email" class="form-control" placeholder="email@proveedor.com">
   		     	</div>
   		     </div>    
   		     <div class="col-lg-3">
   		        <div class="form-group" id = "GradoMostrar">
   		            <label for="fechaCrear">Fecha de alta:</label>
   		            <input type="date" id="fechaCrear" class="form-control">
   		        </div>
   		       <div class="form-group">
                  <label for="mensualidad">Cobro mensual</label>
                  <input class = "form-control" type = "number" placeholder = "Mensualidad" id = "mensualidad"  style="text-transform:uppercase">
              </div>
          </div>
          <div class = "col-lg-3">
              <div class="form-group">
               <label for="ciudad">Ciudad/Municipio:</label>
               <input class = "form-control" type = "text" placeholder = "ciudad" id = "ciudad">
         </div>
         <div class="form-group">
               <label for="bancaria">Cuenta bancaria</label>
               <input class = "form-control" type = "text" placeholder = "# Cuenta" id = "bancaria">
         </div>
           <div class="form-group">
               <label for="sucursal">Banco</label>
               <input class = "form-control" type = "text" placeholder = "Banco" id = "sucursal">
         </div>   
          </div>
   		    
   </div>
   
   <div class="row">
         <button type="button" id = "altaProveedor" class="btn btn-success">Alta de proveedor</button>
         <button type="button" id = "consultaProveedor" class="btn btn-default">Consulta proveedores</button>
         <button type="button" id = "updtProveedor" class="btn btn-primary">Actualizar proveedor</button>
         <button type="button" id = "delProveedor" class="btn btn-danger">Eliminar proveedor</button>
      
   </div>
   		 <div class="row">
   		      <div id = "tablaCuentas" class="table-responsive">
   		              <table class="table tblpol" id = "provTable">
   		              
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
   		</div>  <!-- /.row -->
   </div><!-- /.container-fluid -->
 <script src="../../js/altaProveedor.js"></script>
