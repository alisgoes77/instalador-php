<div class="container-fluid">
  <h5>Control de clientes</h5>
  <label> Agregar cliente</label>
  <div class="row">
    <div class="col-sm-4">
      <label for="nomcliente">Nombre cliente</label>
      <input class="form-control" type="text" name="nomcliente" id="nomcliente" list="clientesName">
    </div>
    <div class="col-sm-4">
      <label for="email">Email del cliente</label>
      <input type="email" name="ecliente" id="emailcliente" class="form-control" placeholder="Email del cliente">
      <button id="guardarcliente" class="btn btn-danger">Guardar/Actualizar cliente</button>
    </div>
  </div>
<hr>
  <div class="table-responsive">
    <table id="clientes-table" class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</div><!-- /.container-fluid -->
<script src="../../js/clientes.js"></script>