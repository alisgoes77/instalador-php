<div class="container-fluid">
  <div class = "row">
     <div class="col-lg-3">
         <label for = "subject">Tipo de email</label>
         <select id = "subject" class = "form-control">
                    <option value = "Cobro de renta">Cobro de renta</option>
                    <option value = "Pago de renta">Pago de renta</option>
                    <option value = "Nota de venta">Nota de venta</option>
                </select>
        <input type = "button" class ="btn btn-default" value = "Buscar" id = "buscarCobros">
     </div>
  </div>
   <div class = "row">
        <div id = "cobrosmimarca" class="table-responsive">
                       <table class="table tblpol" id = "cobrosmimarcatable">
                       
                       <tfoot>
                                   <tr>
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
   </div><!-- /row -->
   </div><!-- /.container-fluid -->
<script src="../../js/cargaremails.js"></script>
