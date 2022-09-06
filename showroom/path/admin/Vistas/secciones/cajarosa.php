<div id="modalimpresiones" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Recibos</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-8">
            <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Enviar recibo por email
            </button>
          </div>

        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                <label for="nomcliente">Buscar o agregar cliente</label>
                <input class="form-control" type="text" name="nomcliente" id="nomcliente" list="clientesName">
                <datalist id="clientesName"></datalist><br>
                <input type="email" name="ecliente" id="emailcliente" class="form-control" placeholder="Email del cliente">
                <button id="guardarcliente" class="btn btn-default">Guardar/Actualizar cliente</button>
                <button id="enviaremail" class="btn btn-success">Enviar email</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" id="cerrarModal2">Continuar</button>

      </div>
    </div>

  </div>
</div>



<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Aceptar pago</h4>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="modal-body" id="prodCred">
            <label>Id venta</label><br>
            <span id="ventaid"></span><br>
            <label>Total a pagar</label><br>
            <span id="totalPago"></span><br>
            <label>Metodo de pago</label><br>
            <span id="metodoPago"></span><br>
            <label>Recibo</label><br>
            <span id="recepcion"></span><br>
            <label>Cambio</label><br>
            <span id="cambio"></span><br>
          </div>
        </div>
        <div class="col-lg-4">
          <select class="form-control" id="formaPago">
            <option value="0" selected>Seleccióna un metodo de pago</option>
            <option value="1">Tarjeta crédito</option>
            <option value="2">Tarjeta débito</option>
            <option value="3">Efectivo</option>
          </select><br>
          <input type="number" id="reciboDinero" class="form-control" placeholder="Recibo" maxlength="4">
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" id="cerrarModal">Continuar</button>

      </div>
    </div>

  </div>
</div>

<div class="container-fluid">
  <h4>Caja</h4>
  <div class="row">
    <div class="col-lg-3">
      <div class="form-group">
        <div class="" id="loading"></div>
        <input list="browsers" name="browser" id="productoslist" class="form-control">
        <datalist id="browsers"></datalist>

      </div>


    </div>
    <div class="col-lg-3">
      <label>ID Venta</label>
      <p id="idVenta"></p>
      <label>ID Producto</label>
      <p id="idProd"></p>
      <label>Nombre</label>
      <p id="nombreProd"></p>
      <label>Proveedor</label>
      <p id="provName"></p>



    </div>
    <div class="col-lg-3">
      <label>En stock</label>
      <p id="stocProd"></p>
      <label>Precio unitario</label>
      <p id="precioUni"></p>
      <label>Descripción</label>
      <p id="descProd"></p>
      <label>Nombre de proveedor</label>
      <p id="provNombre"></p>

    </div>
    <div class="col-lg-3">

      <h5>Nota de venta</h5>
      <label>Cantidad</label>
      <input type="number" class="form-control" id="canti" step=".01"><br>
      <input type="number" id="porcentajeDesc" class="form-control" placeholder="Porcentaje descuento" maxlength="4"><br>
      <button class="add-row btn btn-default">Añadir</button>
      <button class="btn btn-primary" id="generarVenta">Pago</button>
      <button class="btn btn-default" id="imprimirRecibo">Imprimir</button><br><br>
      <button type="button" class="btn btn-success" id="cerrarVenta">Cerrar venta</button>
      <button class="btn btn-primary" id="imprecibo">Recibo por email</button>


    </div>
  </div>

  <div class="row">

    <div id="tablaCuentas" class="table-responsive">
      <div class="text-center" id="encabezado" style="display: none">
        <img src="../Principal/mainlogo.png" alt="Logo" width="80" height="100">
        <h3>Rosa Mexicano</h3>
        <h5>Nota de venta</h5>
        <p>Venta :
        <p id="numeroventa"></p>
        </p>
      </div>
      <table class="table table-bordered" style="width: 100%;" id="tablaRecibo">
        <thead>
          <tr>
            <th></th>
            <th>ID Producto</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Proveedor</th>
            <th>P/U</th>
            <th>Cant</th>
            <th>Descuento</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody id="recibobody">

        </tbody>
      </table>
      <div style="display:none" id="footer">
        <p>Total venta :
        <p id="totalventapdf"></p>
        </p>
      </div>
    </div>
    <button type="button btn btn-danger" class="delete-row">Borrar</button>
  </div> <!-- /.row -->
  <div style="display: flex; justify-content: flex-end" id="totalVentaRec">
    <div class="col-lg-3">
      <label>Total de venta</label>
      <p id="totalVenta"></p>
      <p id="vendedor"></p>
    </div> <!-- /.row -->
  </div> <!-- /.row -->

  <script src="../../js/cajarosa.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.1/jspdf.debug.js" integrity="sha384-THVO/sM0mFD9h7dfSndI6TS0PgAGavwKvB5hAxRRvc0o9cPLohB0wb/PTA7LdUHs" crossorigin="anonymous"></script>
  <script src="../../js/html2pdf/dist/html2pdf.bundle.min.js"></script>