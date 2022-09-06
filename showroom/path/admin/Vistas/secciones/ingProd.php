<div class="container-fluid">
  <h4 >Ingresar producto</h4>
   <div class="row">
   	 <div class="col-lg-3">
   		   <div class="form-group">
             <input class="form-control" type="text" name="key2" id="key2" placeholder="Buscar...">
                     <span class="input-group-btn">
                     </span>
                     <div id="suggestions2"></div>
        </div>

   	
         <div class="form-group">
          <label for = "cantPres">Cantidad unitario ingreso real</label>
          <input type="number" id="cantPres" class="form-control" placeholder="Cantidad de ingreso">
         </div>
       
   		   <div class="form-group">
               <label for = "dateIng">Fecha de ingreso</label>
               <input type="date" id="dateIng" class="form-control">
            </div>
         
   	</div> 
   	<div class="col-lg-3" id = "ingresoInv">
   		<h5>Revisar</h5>
       <label>ID:</label>
      <p id = "idmovi"></p>
   	  <label>Proveedor:</label>
      <p id = "provee"></p>
      <label>Producto ID:</label>
      <p id= "prodID"></p>
      <label>Producto :</label>
      <p id= "prod"></p>
     
      <label>Cantidad total ingreso real:</label>
      <p id = "cant"></p>
      <label>Fecha de ingreso:</label>
      <p id = "fecha"></p>
      <label>Acción</label>
      <p id = "act"></p>
   	</div>
  <div class="col-lg-3">
    <h5>Acciones</h5>
   <button type="button" class="btn btn-primary" id = "impIng" onclick="printDiv('ingresoInv')">Imprimir</button>
   <input type="button" id="ingresarProducto" class="btn btn-success" value = "Crear ingreso">
   
   
    
   
         <div class="form-group">
               <label for = "fechainicial">Fecha inicio</label>
               <input type="date" id="fechainicial" class="form-control">
          </div>
          <div class="form-group">
                <label for = "fecha2">Fecha fin</label>
                <input type="date" id="fecha2" class="form-control">
           </div>
   <button type="button" class="btn btn-default" id = "consultaIngresos">Consultar</button>
   	</div>
  </div>
 <div class="row">
            <div id = "tablaCuentas" class="table-responsive">
                    <table class="table tblpol" id = "ingresostable">
                    
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
                                    
                                     
                                </tr>
                            </tfoot>
                </table>
            </div>
      </div>  <!-- /.row -->
 
</div>

<script src="../../js/ingProd.js"></script>
